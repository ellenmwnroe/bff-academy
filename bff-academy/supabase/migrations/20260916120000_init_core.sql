-- =============================================================================
-- BFF Academy — schema inicial (PostgreSQL / Supabase)
-- Tabelas core, FKs, constraints e Row Level Security.
-- =============================================================================

-- Extensões usadas para UUID.
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. profiles — perfil da plataforma, 1:1 com auth.users
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'student'
    check (role in ('student', 'teacher', 'manager')),
  full_name text,
  avatar_url text,
  is_premium boolean not null default false,
  energy integer not null default 5 check (energy >= 0),
  xp_total integer not null default 0 check (xp_total >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

comment on table public.profiles is
  'Perfil de aplicação estendido de auth.users. role direciona a visão (aluno, professor, manager).';
comment on column public.profiles.energy is
  'Energia do plano gratuito (0–5). Premium não consome este saldo na UI.';
comment on column public.profiles.is_premium is
  'Assinante: energia infinita na UI. Persistido aqui para o cliente.';

-- -----------------------------------------------------------------------------
-- 2. levels — módulos da trilha (ex.: Flex 1, Flex 2)
-- -----------------------------------------------------------------------------
create table if not exists public.levels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  order_index integer not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

comment on table public.levels is
  'Níveis/módulos da trilha. order_index define a ordem de exibição.';

-- -----------------------------------------------------------------------------
-- 3. lessons — lições e o Desafio Flex (boss fight)
-- -----------------------------------------------------------------------------
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels (id) on delete restrict,
  title text not null,
  xp_reward integer not null default 20 check (xp_reward >= 0),
  skill_summary text not null,
  is_boss_fight boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

comment on table public.lessons is
  'Atividades da trilha. is_boss_fight = true marca o Desafio Flex do nível.';
comment on column public.lessons.skill_summary is
  'Resumo pedagógico do que o aluno passa a saber (ex.: "Sabe pedir café").';

create index if not exists lessons_level_id_idx on public.lessons (level_id);
create index if not exists lessons_level_boss_idx
  on public.lessons (level_id, is_boss_fight);

-- -----------------------------------------------------------------------------
-- 4. user_progress — progresso por aluno e lição
-- -----------------------------------------------------------------------------
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  status text not null default 'locked'
    check (status in ('locked', 'in_progress', 'completed')),
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

comment on table public.user_progress is
  'Uma linha por par aluno–lição. completed_at só deve ser preenchido quando status = completed.';

create index if not exists user_progress_user_id_idx on public.user_progress (user_id);
create index if not exists user_progress_lesson_id_idx on public.user_progress (lesson_id);

-- Garante consistência do timestamp de conclusão.
create or replace function public.user_progress_sync_completed_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'completed' and new.completed_at is null then
    new.completed_at := timezone('utc', now());
  end if;

  if new.status <> 'completed' then
    new.completed_at := null;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_user_progress_sync_completed_at on public.user_progress;
create trigger trg_user_progress_sync_completed_at
  before insert or update of status, completed_at
  on public.user_progress
  for each row
  execute function public.user_progress_sync_completed_at();

-- -----------------------------------------------------------------------------
-- Bootstrap: cria o profile automaticamente no cadastro (auth.users → profiles)
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    'student'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================================================
-- Grants (RLS ainda restringe as linhas)
-- Estudante autenticado: leitura/edição do próprio perfil e progresso;
-- catálogo (levels/lessons) somente leitura. Sem INSERT/DELETE pelo client.
-- =============================================================================
grant usage on schema public to authenticated;

grant select, update on table public.profiles to authenticated;
grant select, update on table public.user_progress to authenticated;
grant select on table public.levels to authenticated;
grant select on table public.lessons to authenticated;

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;

alter table public.profiles force row level security;
alter table public.levels force row level security;
alter table public.lessons force row level security;
alter table public.user_progress force row level security;

-- profiles: aluno vê e atualiza só a própria linha (id = auth.uid())
drop policy if exists "students_select_own_profile" on public.profiles;
create policy "students_select_own_profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "students_update_own_profile" on public.profiles;
create policy "students_update_own_profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- user_progress: a "própria linha" é a do user_id, não o PK da tabela
drop policy if exists "students_select_own_progress" on public.user_progress;
create policy "students_select_own_progress"
  on public.user_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "students_update_own_progress" on public.user_progress;
create policy "students_update_own_progress"
  on public.user_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- levels / lessons: aluno autenticado somente SELECT
-- (a checagem de role evita que um JWT autenticado sem perfil de aluno leia o catálogo)
drop policy if exists "students_read_levels" on public.levels;
create policy "students_read_levels"
  on public.levels
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles as p
      where p.id = auth.uid()
        and p.role = 'student'
    )
  );

drop policy if exists "students_read_lessons" on public.lessons;
create policy "students_read_lessons"
  on public.lessons
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles as p
      where p.id = auth.uid()
        and p.role = 'student'
    )
  );
