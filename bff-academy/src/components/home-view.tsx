"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Flame, ArrowRight, Sparkles, Zap, Star, MessageCircle, Mic, BookOpen, Trophy, Clock } from "lucide-react"
import { useState } from "react"

type PaletteVariant = "crimson" | "marble" | "varden"

const paletteStyles: Record<
  PaletteVariant,
  {
    icon: string
    iconText: string
    ring: string
  }
> = {
  crimson: {
    icon: "bg-crimson border-gochujang",
    iconText: "text-varden",
    ring: "stroke-crimson",
  },
  marble: {
    icon: "bg-marble border-cosmos",
    iconText: "text-varden",
    ring: "stroke-marble",
  },
  varden: {
    icon: "bg-varden border-cosmos",
    iconText: "text-cosmos",
    ring: "stroke-varden",
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

function AvatarWithFallback({
  src,
  alt,
  initials,
  size = 48,
  className = "",
}: {
  readonly src: string
  readonly alt: string
  readonly initials: string
  readonly size?: number
  readonly className?: string
}) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={`grid place-items-center rounded-full border-[3px] border-cosmos bg-marble text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)] ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="font-serif text-sm font-bold">{initials}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full border-[3px] border-cosmos bg-card object-cover shadow-[2px_2px_0_0_var(--color-cosmos)] ${className}`}
      onError={() => setError(true)}
    />
  )
}

function CircularProgress({
  progress,
  total,
  variant,
  size = 72,
}: {
  readonly progress: number
  readonly total: number
  readonly variant: PaletteVariant
  readonly size?: number
}) {
  const percentage = Math.round((progress / total) * 100)
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  const styles = paletteStyles[variant]
  const isComplete = progress >= total

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90 transform" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-none stroke-muted"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`fill-none transition-all duration-500 ${styles.ring}`}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        {isComplete ? (
          <Star className="size-8 fill-crimson text-crimson animate-pulse" aria-hidden="true" />
        ) : (
          <span className="font-serif text-lg font-bold text-cosmos">{percentage}%</span>
        )}
      </div>
    </div>
  )
}

export function HomeView() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-5">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="size-10 rounded-xl border-2 border-cosmos bg-marble shadow-[2px_2px_0_0_var(--color-cosmos)] grid place-items-center">
            <span className="font-serif text-xs font-bold text-cosmos">BFF</span>
          </div>
          <div className="relative">
            <AvatarWithFallback src="/mascot.png" alt="Avatar da Ellen" initials="EL" size={48} />
            <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-card bg-crimson text-[10px] font-bold text-varden shadow-[1px_1px_0_0_var(--color-gochujang)]">
              5
            </span>
          </div>
        </div>

        {/* Glowing streak badge */}
        <div className="flex items-center gap-1.5 rounded-full border-[3px] border-gochujang bg-crimson px-4 py-2 shadow-[3px_3px_0_0_var(--color-gochujang)]">
          <Flame className="size-5 fill-varden text-varden" aria-hidden="true" />
          <span className="font-serif text-xl leading-none text-varden">12</span>
          <span className="sr-only">dias de sequência</span>
        </div>
      </header>

      {/* Greeting */}
      <h1 className="font-serif text-3xl leading-tight text-cosmos text-balance">
        Olá, Ellen! Bora aprender?
      </h1>

      {/* Bento Grid Layout */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Hero lesson card - Compacto */}
        <section
          aria-labelledby="lesson-heading"
          className="relative overflow-hidden rounded-[32px] border-[3px] border-cosmos bg-marble p-6 shadow-[6px_6px_0_0_var(--color-cosmos)] md:col-span-2"
        >
          {/* Floating pill tag */}
          <span className="absolute left-4 top-4 flex w-fit items-center gap-1.5 rounded-full border-2 border-cosmos bg-varden px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Jornada de hoje
          </span>

          {/* floating decorations */}
          <Star
            className="animate-bob absolute right-6 top-6 size-8 fill-crimson text-cosmos"
            style={{ ["--bob-rot" as string]: "-12deg" }}
            aria-hidden="true"
          />
          <Zap
            className="animate-bob absolute bottom-8 right-8 size-7 fill-varden text-cosmos"
            style={{ ["--bob-rot" as string]: "10deg", animationDelay: "0.6s" }}
            aria-hidden="true"
          />
          <MessageCircle
            className="animate-bob absolute left-6 bottom-6 size-7 fill-cosmos text-varden"
            style={{ animationDelay: "1.1s" }}
            aria-hidden="true"
          />

          <div className="relative mt-14 grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-2">
              <h2 id="lesson-heading" className="font-serif text-3xl text-cosmos text-balance">
                Lição 1: Daily Routine
              </h2>
              <p className="text-sm font-medium leading-relaxed text-cosmos/80">
                Continue de onde parou e mantenha sua sequência viva!
              </p>
            </div>

            {/* Botão com fundo branco separado */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => router.push("/lesson-overview")}
                className="group relative rounded-2xl border-[3px] border-cosmos bg-card p-1 shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
              >
                <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-gochujang border-b-[5px] bg-crimson px-6 py-4 text-base font-extrabold text-varden transition-all group-active:translate-y-0.5 group-active:border-b-2">
                  Continuar Jornada
                  <ArrowRight className="size-5" strokeWidth={3} aria-hidden="true" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Daily quests - Grid compacto */}
        <section aria-labelledby="quests-heading" className="flex flex-col gap-4 md:col-span-2">
          <h2 id="quests-heading" className="flex items-center gap-2 font-serif text-xl text-cosmos">
            <Trophy className="size-6 fill-crimson text-cosmos" aria-hidden="true" />
            Missões Diárias
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {quests.map((q) => {
              const Icon = q.icon
              const styles = paletteStyles[q.variant]
              return (
                <article
                  key={q.title}
                  className="relative flex flex-col items-center gap-4 rounded-[28px] border-[3px] border-cosmos bg-card p-6 shadow-[4px_4px_0_0_var(--color-cosmos)]"
                >
                  {/* Icon badge floating */}
                  <div
                    className={`absolute -right-2 -top-2 grid size-12 place-items-center rounded-2xl border-[3px] shadow-[3px_3px_0_0_var(--color-cosmos)] ${styles.icon}`}
                  >
                    <Icon className={`size-6 ${styles.iconText}`} strokeWidth={2.5} aria-hidden="true" />
                  </div>

                  <CircularProgress progress={q.progress} total={q.total} variant={q.variant} size={80} />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="font-bold text-cosmos text-balance">{q.title}</h3>
                    <span className="text-xs font-bold text-muted-foreground">
                      {q.progress}/{q.total} completo
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Upcoming classes - Bento style */}
        <section aria-labelledby="classes-heading" className="flex flex-col gap-4 md:col-span-2">
          <h2 id="classes-heading" className="flex items-center gap-2 font-serif text-xl text-cosmos">
            <Clock className="size-6 text-cosmos" aria-hidden="true" />
            Próximas Aulas
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {upcomingClasses.map((c) => {
              const styles = paletteStyles[c.variant]
              return (
                <article
                  key={c.title}
                  className="flex flex-col gap-4 rounded-[28px] border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]"
                >
                  {/* Time pill */}
                  <span className="w-fit rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-bold uppercase tracking-wide text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]">
                    {c.time}
                  </span>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-xl leading-tight text-cosmos">{c.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{c.professor}</p>
                  </div>

                  <button
                    type="button"
                    className={`mt-auto rounded-2xl border-[3px] border-b-[6px] px-4 py-3 text-sm font-extrabold transition-all active:translate-y-1 active:border-b-[3px] ${styles.icon} ${styles.iconText}`}
                  >
                    Entrar na Aula
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
