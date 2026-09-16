-- =============================================================================
-- BFF Academy — módulo financeiro (despesas do painel admin)
-- Apenas managers autenticados acessam esta tabela.
-- =============================================================================

-- uuid_generate_v4() exige uuid-ossp (a migration core já habilita pgcrypto).
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- Lookup seguro da role
-- SECURITY DEFINER lê public.profiles ignorando o RLS da própria tabela,
-- evitando recursão e dependência das policies de SELECT em profiles.
-- search_path fixo impede hijack de objetos em outros schemas.
-- -----------------------------------------------------------------------------
create or replace function public.is_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles as p
    where p.id = auth.uid()
      and p.role = 'manager'
  );
$$;

comment on function public.is_manager() is
  'True somente se auth.uid() tem profiles.role = manager. Usada nas policies financeiras.';

revoke all on function public.is_manager() from public;
grant execute on function public.is_manager() to authenticated;

-- -----------------------------------------------------------------------------
-- Tabela expenses
-- -----------------------------------------------------------------------------
create table if not exists public.expenses (
  id uuid primary key default uuid_generate_v4(),
  amount numeric(12, 2) not null check (amount > 0),
  description text not null,
  category text
    check (
      category is null
      or category in ('software', 'payroll', 'marketing', 'infrastructure', 'other')
    ),
  date date not null,
  manager_id uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default timezone('utc', now())
);

comment on table public.expenses is
  'Despesas operacionais do painel admin (IA, folha, marketing, infra). Somente managers.';
comment on column public.expenses.amount is
  'Valor da despesa em reais. Sempre maior que zero.';
comment on column public.expenses.manager_id is
  'Quem lançou a despesa. Deve ser um profile com role manager.';

create index if not exists expenses_date_idx on public.expenses (date desc);
create index if not exists expenses_category_idx on public.expenses (category);
create index if not exists expenses_manager_id_idx on public.expenses (manager_id);

-- Garante que o lançador é de fato manager (além do RLS).
create or replace function public.expenses_require_manager_profile()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1
    from public.profiles as p
    where p.id = new.manager_id
      and p.role = 'manager'
  ) then
    raise exception 'manager_id must reference a profile with role = manager';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_expenses_require_manager_profile on public.expenses;
create trigger trg_expenses_require_manager_profile
  before insert or update of manager_id
  on public.expenses
  for each row
  execute function public.expenses_require_manager_profile();

-- -----------------------------------------------------------------------------
-- Grants: autenticados recebem privilégios de tabela; o RLS filtra por role.
-- anon e student/teacher autenticados não passam nas policies.
-- -----------------------------------------------------------------------------
grant select, insert, update, delete on table public.expenses to authenticated;

-- =============================================================================
-- Row Level Security — CRUD exclusivo de manager
-- =============================================================================
alter table public.expenses enable row level security;
alter table public.expenses force row level security;

drop policy if exists "managers_select_expenses" on public.expenses;
create policy "managers_select_expenses"
  on public.expenses
  for select
  to authenticated
  using (public.is_manager());

drop policy if exists "managers_insert_expenses" on public.expenses;
create policy "managers_insert_expenses"
  on public.expenses
  for insert
  to authenticated
  with check (
    public.is_manager()
    and manager_id = auth.uid()
  );

drop policy if exists "managers_update_expenses" on public.expenses;
create policy "managers_update_expenses"
  on public.expenses
  for update
  to authenticated
  using (public.is_manager())
  with check (
    public.is_manager()
    and manager_id = auth.uid()
  );

drop policy if exists "managers_delete_expenses" on public.expenses;
create policy "managers_delete_expenses"
  on public.expenses
  for delete
  to authenticated
  using (public.is_manager());
