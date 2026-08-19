"use client"

import { ArrowLeft, Play, Clock, Zap, Heart, BookOpen, MessageCircle, Mic } from "lucide-react"

type LessonObjective = {
  readonly title: string
  readonly icon: typeof BookOpen
  readonly variant: "crimson" | "marble" | "varden"
}

const objectives: ReadonlyArray<LessonObjective> = [
  {
    title: "Vocabulário de rotina",
    icon: BookOpen,
    variant: "crimson",
  },
  {
    title: "Verbos no Present Simple",
    icon: MessageCircle,
    variant: "marble",
  },
  {
    title: "Prática de pronúncia",
    icon: Mic,
    variant: "varden",
  },
]

const variantStyles = {
  crimson: "bg-crimson border-gochujang",
  marble: "bg-marble border-cosmos",
  varden: "bg-varden border-cosmos",
}

export function LessonOverviewView({
  onStartExercise,
  onBack,
}: {
  readonly onStartExercise: () => void
  readonly onBack: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col bg-varden">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-varden px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="grid size-12 place-items-center rounded-2xl border-[3px] border-cosmos bg-card shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--color-cosmos)]"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-6 text-cosmos" strokeWidth={3} aria-hidden="true" />
        </button>

        {/* Category Pill */}
        <div className="flex items-center gap-2 rounded-full border-[3px] border-cosmos bg-marble px-4 py-2 shadow-[3px_3px_0_0_var(--color-cosmos)]">
          <span className="text-sm font-bold uppercase tracking-wide text-varden">
            Módulo 1 · Unidade 3
          </span>
        </div>

        {/* Spacer to balance layout */}
        <div className="size-12" />
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-6 px-5 pb-32 pt-4">
        {/* Hero Card - Lesson Title & Description */}
        <section className="rounded-4xl border-[3px] border-cosmos bg-card p-6 shadow-[6px_6px_0_0_var(--color-cosmos)]">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl leading-tight text-cosmos text-balance">
              Daily Routine & Horários
            </h1>
            <p className="text-base font-medium leading-relaxed text-cosmos/80">
              Aprenda a falar sobre sua rotina diária em inglês, usando verbos no presente simples e
              vocabulário essencial para descrever atividades do dia a dia.
            </p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {/* Duration */}
              <div className="flex flex-col items-center gap-2 rounded-2xl border-[3px] border-cosmos bg-varden p-3 shadow-[3px_3px_0_0_var(--color-cosmos)]">
                <Clock className="size-6 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-center text-xs font-bold text-cosmos">
                  15 min
                </span>
              </div>

              {/* XP */}
              <div className="flex flex-col items-center gap-2 rounded-2xl border-[3px] border-cosmos bg-varden p-3 shadow-[3px_3px_0_0_var(--color-cosmos)]">
                <Zap className="size-6 fill-marble text-marble" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-center text-xs font-bold text-cosmos">
                  +50 XP
                </span>
              </div>

              {/* Lives */}
              <div className="flex flex-col items-center gap-2 rounded-2xl border-[3px] border-cosmos bg-varden p-3 shadow-[3px_3px_0_0_var(--color-cosmos)]">
                <Heart className="size-6 fill-crimson text-crimson" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-center text-xs font-bold text-cosmos">
                  5 vidas
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 font-serif text-2xl text-cosmos">
            <BookOpen className="size-7 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
            O que você vai aprender
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {objectives.map((objective, index) => {
              const Icon = objective.icon
              const styles = variantStyles[objective.variant]
              return (
                <article
                  key={objective.title}
                  className="relative flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-cosmos bg-card p-6 shadow-[4px_4px_0_0_var(--color-cosmos)]"
                >
                  {/* Number Badge */}
                  <div className="absolute -left-2 -top-2 grid size-8 place-items-center rounded-full border-[3px] border-cosmos bg-varden shadow-[2px_2px_0_0_var(--color-cosmos)]">
                    <span className="font-serif text-sm font-bold text-cosmos">{index + 1}</span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`grid size-14 place-items-center rounded-2xl border-[3px] shadow-[3px_3px_0_0_var(--color-cosmos)] ${styles}`}
                  >
                    <Icon
                      className={objective.variant === "varden" ? "size-7 text-cosmos" : "size-7 text-varden"}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-center font-bold text-cosmos text-balance">{objective.title}</h3>
                </article>
              )
            })}
          </div>
        </section>

        {/* Pro Tip Card */}
        <aside className="rounded-[28px] border-[3px] border-cosmos bg-marble p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]">
          <div className="flex gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-cosmos bg-varden">
              <Zap className="size-5 fill-cosmos text-cosmos" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-cosmos">Dica profissional</h3>
              <p className="text-sm font-medium leading-relaxed text-cosmos/80">
                Complete a lição sem erros para ganhar um bônus de +10 XP e manter sua sequência!
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Sticky Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-varden via-varden to-transparent px-5 pb-6 pt-8">
        <button
          type="button"
          onClick={onStartExercise}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border-[3px] border-gochujang border-b-[6px] bg-crimson px-6 py-5 text-xl font-extrabold text-varden shadow-[4px_4px_0_0_var(--color-gochujang)] transition-all hover:brightness-110 active:translate-y-1 active:border-b-[3px] active:shadow-[2px_2px_0_0_var(--color-gochujang)]"
        >
          <Play className="size-7 fill-varden" strokeWidth={3} aria-hidden="true" />
          Começar Lição
        </button>
      </div>
    </div>
  )
}
