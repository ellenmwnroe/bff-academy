"use client"

import { Play, BookOpen, Sparkles } from "lucide-react"

type JourneyHeroCardProps = {
  readonly unitNumber?: number
  readonly title?: string
  readonly description?: string
  readonly currentLesson?: number
  readonly totalLessons?: number
  readonly progressPercentage?: number
  readonly onContinueClick?: () => void
}

export function JourneyHeroCard({
  unitNumber = 1,
  title = "Apresentações Básicas",
  description = "Aprenda a falar sobre você e conhecer novas pessoas.",
  currentLesson = 3,
  totalLessons = 5,
  progressPercentage = 60,
  onContinueClick,
}: JourneyHeroCardProps) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border-[3px] border-cosmos bg-marble p-6 shadow-[4px_4px_0_0_var(--color-cosmos)]"
      aria-labelledby="journey-hero-title"
    >
      {/* Decorative Icon - Top Right Corner */}
      <div className="absolute -right-2 -top-2 rotate-12 opacity-20">
        <BookOpen className="size-24 text-cosmos" strokeWidth={2} aria-hidden="true" />
      </div>

      {/* Floating Sparkle Decoration */}
      <Sparkles
        className="absolute right-6 top-6 size-6 fill-crimson text-cosmos"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Status Badge */}
        <span className="w-fit rounded-full border-[3px] border-cosmos bg-varden px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]">
          Unidade {unitNumber}
        </span>

        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          <h2
            id="journey-hero-title"
            className="font-serif text-3xl font-black leading-tight text-cosmos text-balance"
          >
            {title}
          </h2>
          <p className="text-sm font-medium leading-relaxed text-cosmos/80 text-balance">
            {description}
          </p>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-3">
          {/* Progress Label */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-cosmos/70">
              Lição {currentLesson} de {totalLessons}
            </span>
            <span className="text-xs font-bold text-cosmos">{progressPercentage}%</span>
          </div>

          {/* Custom Progress Bar */}
          <div className="relative h-4 w-full overflow-hidden rounded-full border-[3px] border-cosmos bg-varden shadow-[2px_2px_0_0_var(--color-cosmos)]">
            {/* Progress Fill */}
            <progress
              className="absolute inset-0 h-full w-full appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-gochujang [&::-moz-progress-bar]:bg-gochujang"
              value={progressPercentage}
              max={100}
              aria-label={`Progresso da jornada: ${progressPercentage}%`}
            />
            <div
              className="absolute inset-0 h-full bg-gochujang transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onContinueClick}
          className="group relative mt-2 w-full rounded-2xl border-[3px] border-gochujang border-b-[6px] bg-crimson px-6 py-4 text-lg font-extrabold text-varden shadow-[3px_3px_0_0_var(--color-gochujang)] transition-all hover:brightness-110 active:translate-y-1 active:border-b-[3px] active:shadow-[1px_1px_0_0_var(--color-gochujang)]"
        >
          <span className="flex items-center justify-center gap-3">
            <Play className="size-6 fill-varden" strokeWidth={3} aria-hidden="true" />
            Continuar Jornada
          </span>
        </button>
      </div>
    </section>
  )
}
