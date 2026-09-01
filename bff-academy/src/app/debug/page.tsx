"use client"

import Link from "next/link"
import {
  Home,
  BookOpen,
  Play,
  Sparkles,
  PenTool,
  Type,
  Mic2,
  Trophy,
  Award,
  LogIn,
  Rocket,
  Dumbbell,
  MessageSquare,
  CalendarDays,
  type LucideIcon,
} from "lucide-react"

type DebugLink = {
  readonly href: string
  readonly label: string
  readonly description: string
  readonly icon: LucideIcon
  readonly variant: "card" | "varden" | "marble" | "crimson"
}

type DebugSection = {
  readonly id: string
  readonly title: string
  readonly links: ReadonlyArray<DebugLink>
}

const sections: ReadonlyArray<DebugSection> = [
  {
    id: "entry",
    title: "Entrada",
    links: [
      {
        href: "/",
        label: "Splash + Login",
        description: "Tela inicial do app",
        icon: LogIn,
        variant: "card",
      },
    ],
  },
  {
    id: "main",
    title: "Telas principais (com menu inferior)",
    links: [
      {
        href: "/home",
        label: "Home",
        description: "Dashboard, missões e aulas",
        icon: Home,
        variant: "crimson",
      },
      {
        href: "/feed",
        label: "Comunidade",
        description: "Feed social dos alunos",
        icon: MessageSquare,
        variant: "marble",
      },
      {
        href: "/calendar",
        label: "Minha Agenda",
        description: "Calendário de aulas",
        icon: CalendarDays,
        variant: "card",
      },
      {
        href: "/leaderboard",
        label: "Ranking Semanal",
        description: "Leaderboard dos alunos",
        icon: Trophy,
        variant: "varden",
      },
      {
        href: "/profile",
        label: "Perfil",
        description: "Estatísticas, conquistas e conta",
        icon: Award,
        variant: "card",
      },
    ],
  },
  {
    id: "lesson-flow",
    title: "Fluxo completo da lição",
    links: [
      {
        href: "/lesson-overview",
        label: "1. Visão Geral da Lição",
        description: "Começa o fluxo encadeado",
        icon: BookOpen,
        variant: "marble",
      },
      {
        href: "/exercise",
        label: "2. Múltipla Escolha",
        description: "Exercício de alternativas",
        icon: PenTool,
        variant: "varden",
      },
      {
        href: "/fill-blank",
        label: "3. Preencher Lacunas",
        description: "Exercício de digitação",
        icon: Type,
        variant: "card",
      },
      {
        href: "/speaking",
        label: "4. Speaking / Listening",
        description: "Pronúncia validada por IA",
        icon: Mic2,
        variant: "crimson",
      },
      {
        href: "/lesson-completed",
        label: "5. Aula Concluída",
        description: "Vitória e recompensas",
        icon: Trophy,
        variant: "marble",
      },
    ],
  },
  {
    id: "extras",
    title: "Outros",
    links: [
      {
        href: "/dev",
        label: "Home sem menu",
        description: "HomeView isolada",
        icon: Dumbbell,
        variant: "card",
      },
    ],
  },
]

const variantStyles: Record<DebugLink["variant"], string> = {
  card: "border-cosmos bg-card text-cosmos shadow-[4px_4px_0_0_var(--color-cosmos)]",
  varden: "border-cosmos bg-varden text-cosmos shadow-[4px_4px_0_0_var(--color-cosmos)]",
  marble: "border-cosmos bg-marble text-varden shadow-[4px_4px_0_0_var(--color-cosmos)]",
  crimson: "border-gochujang bg-crimson text-varden shadow-[4px_4px_0_0_var(--color-gochujang)]",
}

export default function DebugMenu() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-varden p-8">
      <header className="text-center">
        <div className="mb-4 inline-flex size-20 items-center justify-center rounded-2xl border-[3px] border-cosmos bg-marble shadow-[4px_4px_0_0_var(--color-cosmos)]">
          <Sparkles className="size-10 fill-varden text-varden" aria-hidden="true" />
        </div>
        <h1 className="font-serif text-4xl text-cosmos">Menu de Testes</h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-cosmos/70">
          Navegue entre as telas do app
        </p>
      </header>

      {/* Atalho para o fluxo inteiro */}
      <Link
        href="/lesson-overview"
        className="flex w-full max-w-md items-center gap-3 rounded-2xl border-[3px] border-gochujang bg-crimson px-6 py-5 font-bold text-varden shadow-[6px_6px_0_0_var(--color-gochujang)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-gochujang)]"
      >
        <Rocket className="size-7" aria-hidden="true" />
        <div className="flex-1 text-left">
          <div className="text-lg">Rodar a lição inteira</div>
          <div className="text-xs font-normal text-varden/90">
            Overview → Múltipla escolha → Lacunas → Speaking → Conclusão
          </div>
        </div>
      </Link>

      {sections.map((section) => (
        <section key={section.id} className="flex w-full max-w-md flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cosmos/60">
            {section.title}
          </h2>

          {section.links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-2xl border-[3px] px-6 py-4 font-bold transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:brightness-95 ${variantStyles[link.variant]}`}
              >
                <Icon className="size-6" aria-hidden="true" />
                <div className="flex-1 text-left">
                  <div>{link.label}</div>
                  <div className="text-xs font-normal opacity-75">{link.description}</div>
                </div>
              </Link>
            )
          })}
        </section>
      ))}

      <div className="rounded-2xl border-[3px] border-cosmos bg-varden p-4 text-center">
        <p className="text-xs font-bold text-cosmos">
          💡 Este menu é apenas para desenvolvimento
        </p>
      </div>

      <Link
        href="/home"
        className="flex items-center gap-2 text-sm font-bold text-cosmos/70 transition-all hover:text-cosmos"
      >
        <Play className="size-4" aria-hidden="true" />
        Ir para a Home
      </Link>
    </div>
  )
}
