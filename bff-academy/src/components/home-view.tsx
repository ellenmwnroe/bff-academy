"use client"

import Image from "next/image"
import { Flame, ArrowRight, Sparkles, Zap, Star, MessageCircle, Mic, BookOpen, Trophy } from "lucide-react"

type PaletteVariant = "crimson" | "marble" | "varden"

const paletteStyles: Record<
  PaletteVariant,
  {
    icon: string
    iconText: string
    progress: string
    button: string
    buttonText: string
  }
> = {
  crimson: {
    icon: "bg-crimson border-gochujang",
    iconText: "text-varden",
    progress: "[&::-webkit-progress-value]:bg-crimson [&::-moz-progress-bar]:bg-crimson",
    button: "bg-crimson border-gochujang",
    buttonText: "text-varden",
  },
  marble: {
    icon: "bg-marble border-cosmos",
    iconText: "text-varden",
    progress: "[&::-webkit-progress-value]:bg-marble [&::-moz-progress-bar]:bg-marble",
    button: "bg-marble border-cosmos",
    buttonText: "text-varden",
  },
  varden: {
    icon: "bg-varden border-cosmos",
    iconText: "text-cosmos",
    progress: "[&::-webkit-progress-value]:bg-varden [&::-moz-progress-bar]:bg-varden",
    button: "bg-varden border-cosmos",
    buttonText: "text-cosmos",
  },
}

const quests: ReadonlyArray<{
  title: string
  progress: number
  total: number
  icon: typeof Mic
  variant: PaletteVariant
}> = [
  {
    title: "Praticar Speaking",
    progress: 1,
    total: 3,
    icon: Mic,
    variant: "crimson",
  },
  {
    title: "Revisar 10 palavras",
    progress: 7,
    total: 10,
    icon: BookOpen,
    variant: "marble",
  },
  {
    title: "Manter a sequência",
    progress: 1,
    total: 1,
    icon: Trophy,
    variant: "varden",
  },
]

const upcomingClasses: ReadonlyArray<{
  time: string
  title: string
  professor: string
  variant: PaletteVariant
}> = [
  { time: "18:00", title: "Speaking Club", professor: "Prof. Marina", variant: "marble" },
  { time: "20:30", title: "Grammar Fix", professor: "Prof. Lucas", variant: "crimson" },
  { time: "Amanhã · 09:00", title: "Pronúncia", professor: "Prof. Kate", variant: "varden" },
]

export function HomeView({ onStartPractice }: { readonly onStartPractice: () => void }) {
  return (
    <div className="flex flex-col gap-6 px-5 pb-6 pt-5">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Image
            src="/bff-logo.png"
            alt="Logo da BFF Academy"
            width={40}
            height={40}
            className="size-10 rounded-xl border-2 border-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]"
          />
          <div className="relative">
            <Image
              src="/mascot.png"
              alt="Avatar da Ellen"
              width={48}
              height={48}
              className="size-12 rounded-full border-[3px] border-cosmos bg-card object-cover shadow-[2px_2px_0_0_var(--color-cosmos)]"
            />
            <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-varden bg-crimson text-[10px] font-bold text-varden">
              5
            </span>
          </div>
        </div>

        {/* Glowing streak badge */}
        <div className="flex items-center gap-1.5 rounded-2xl border-2 border-gochujang bg-crimson px-3.5 py-2 shadow-[3px_3px_0_0_var(--color-gochujang)]">
          <Flame className="size-5 fill-varden text-varden" aria-hidden="true" />
          <span className="font-serif text-xl leading-none text-varden">12</span>
          <span className="sr-only">dias de sequência</span>
        </div>
      </header>

      {/* Greeting */}
      <h1 className="-mt-1 font-serif text-3xl leading-tight text-cosmos text-balance">
        Olá, Ellen! Bora aprender?
      </h1>

      {/* Hero lesson card */}
      <section
        aria-labelledby="lesson-heading"
        className="relative rounded-[28px] border-[3px] border-cosmos bg-marble p-6 shadow-[6px_6px_0_0_var(--color-cosmos)]"
      >
        {/* floating decorations */}
        <Star
          className="animate-bob absolute -left-2 -top-3 size-8 fill-varden text-cosmos"
          style={{ ["--bob-rot" as string]: "-12deg" }}
          aria-hidden="true"
        />
        <Zap
          className="animate-bob absolute right-4 -top-4 size-7 fill-varden text-cosmos"
          style={{ ["--bob-rot" as string]: "10deg", animationDelay: "0.6s" }}
          aria-hidden="true"
        />
        <MessageCircle
          className="animate-bob absolute -right-2 bottom-8 size-7 fill-varden text-cosmos"
          style={{ animationDelay: "1.1s" }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-1">
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-varden/25 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-varden">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Jornada de hoje
          </span>
          <h2 id="lesson-heading" className="mt-2 font-serif text-2xl text-varden text-balance">
            Lição 1: Daily Routine
          </h2>
          <p className="mb-5 mt-1 text-sm font-medium leading-relaxed text-varden/90">
            Continue de onde parou e mantenha sua sequência viva!
          </p>

          <button
            type="button"
            onClick={onStartPractice}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gochujang border-b-[6px] bg-crimson px-6 py-4 text-base font-extrabold text-varden transition-all active:translate-y-1 active:border-b-2"
          >
            Continuar Jornada
            <ArrowRight className="size-5" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Daily quests */}
      <section aria-labelledby="quests-heading" className="flex flex-col gap-3">
        <h2 id="quests-heading" className="flex items-center gap-2 font-serif text-lg text-cosmos">
          <Trophy className="size-5 fill-varden text-cosmos" aria-hidden="true" />
          Missões Diárias
        </h2>

        <ul className="flex flex-col gap-3">
          {quests.map((q) => {
            const Icon = q.icon
            const styles = paletteStyles[q.variant]
            const pct = Math.round((q.progress / q.total) * 100)
            const done = q.progress >= q.total
            return (
              <li
                key={q.title}
                className="flex items-center gap-3 rounded-3xl border-[3px] border-cosmos bg-card p-3 shadow-[4px_4px_0_0_var(--color-cosmos)]"
              >
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl border-2 ${styles.icon}`}>
                  <Icon className={`size-6 ${styles.iconText}`} strokeWidth={2.5} aria-hidden="true" />
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-bold text-cosmos">{q.title}</span>
                    <span className="shrink-0 text-xs font-bold text-muted-foreground">
                      {q.progress}/{q.total}
                    </span>
                  </div>
                  <progress
                    value={pct}
                    max={100}
                    aria-label={`${q.title}: ${pct}%`}
                    className={`h-3 w-full overflow-hidden rounded-full border-2 border-muted bg-muted [&::-webkit-progress-bar]:bg-muted ${styles.progress}`}
                  />
                </div>

                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border-2 ${
                    done ? "border-gochujang bg-crimson" : "border-muted bg-muted"
                  }`}
                  aria-label={done ? "Recompensa disponível" : "Recompensa bloqueada"}
                >
                  <Star
                    className={`size-4 ${done ? "fill-varden text-varden" : "fill-muted-foreground text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Upcoming classes */}
      <section aria-labelledby="classes-heading" className="flex flex-col gap-3">
        <h2 id="classes-heading" className="font-serif text-lg text-cosmos">
          Próximas Aulas
        </h2>

        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
          {upcomingClasses.map((c) => {
            const styles = paletteStyles[c.variant]
            return (
              <article
                key={c.title}
                className="flex w-56 shrink-0 snap-start flex-col gap-3 rounded-3xl border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-crimson">{c.time}</span>
                  <h3 className="font-serif text-lg text-cosmos">{c.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{c.professor}</p>
                </div>
                <button
                  type="button"
                  className={`mt-1 rounded-2xl border-2 border-b-[5px] px-4 py-2.5 text-sm font-extrabold transition-all active:translate-y-0.5 active:border-b-2 ${styles.button} ${styles.buttonText}`}
                >
                  Entrar na Aula
                </button>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
