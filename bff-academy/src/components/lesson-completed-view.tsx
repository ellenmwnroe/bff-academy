"use client"

import { useState } from "react"
import { Trophy, Zap, Target, Clock, Star, Gift, Package, ArrowRight, Sparkles } from "lucide-react"

type LessonCompletedProps = {
  readonly xpGained?: number
  readonly accuracy?: number
  readonly timeSpent?: string
  readonly onContinue: () => void
}

export function LessonCompletedView({
  xpGained = 50,
  accuracy = 85,
  timeSpent = "4:30",
  onContinue,
}: LessonCompletedProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-varden">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-5 pb-32 pt-8">
        {/* Success Header */}
        <div className="text-center">
          <h1 className="font-serif text-5xl font-bold text-cosmos">
            Aula Concluída! 🎉
          </h1>
          <p className="mt-2 text-lg font-bold uppercase tracking-wide text-cosmos/70">
            {isOpened ? "Você está arrasando!" : "Toque para abrir sua recompensa!"}
          </p>
        </div>

        {/* Interactive Reward Card with Sticker Badge */}
        <div className="relative">
          {/* Sticker Badge (Adesivo) - Sobreposto */}
          <div className="absolute -right-6 -top-6 z-10 rotate-[8deg]">
            <div className="rounded-full border-[3px] border-cosmos bg-crimson px-4 py-2 shadow-[4px_4px_0_0_var(--color-cosmos)]">
              <p className="font-serif text-sm font-bold text-varden">Perfect!</p>
            </div>
          </div>

          {/* Main Interactive Card */}
          <button
            type="button"
            onClick={() => !isOpened && setIsOpened(true)}
            disabled={isOpened}
            className={`relative rounded-4xl border-[3px] border-cosmos p-8 shadow-[8px_8px_0_0_var(--color-cosmos)] transition-all ${
              isOpened
                ? "cursor-default bg-marble"
                : "cursor-pointer bg-card hover:brightness-95 active:scale-95"
            }`}
            aria-label={isOpened ? "Recompensa revelada" : "Clique para abrir a recompensa"}
          >
            {!isOpened ? (
              // Closed State - Mystery Package
              <div className="flex flex-col items-center gap-4">
                {/* Package Icon with Stars */}
                <div className="relative">
                  <Star
                    className="absolute -left-6 -top-2 size-6 fill-crimson text-cosmos"
                    aria-hidden="true"
                  />
                  <Star
                    className="absolute -right-6 -top-2 size-6 fill-marble text-cosmos"
                    aria-hidden="true"
                  />

                  <div className="grid size-24 place-items-center rounded-full border-[3px] border-cosmos bg-varden shadow-[4px_4px_0_0_var(--color-cosmos)]">
                    <Package className="size-14 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                </div>

                {/* Mystery Text */}
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-cosmos/70">
                    Recompensa Desbloqueada
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold text-cosmos">
                    Toque para revelar
                  </p>
                </div>

                {/* Tap Indicator */}
                <div className="flex items-center gap-2 rounded-full border-[3px] border-cosmos bg-crimson px-4 py-2 shadow-[3px_3px_0_0_var(--color-cosmos)]">
                  <Sparkles className="size-4 text-varden" strokeWidth={2.5} aria-hidden="true" />
                  <span className="text-sm font-bold text-varden">Toque aqui</span>
                </div>
              </div>
            ) : (
              // Opened State - Trophy & XP Revealed
              <div className="flex flex-col items-center gap-4">
                {/* Floating decorative stars - apenas no lado esquerdo para não colidir com o badge */}
                <Star
                  className="absolute -left-6 top-4 size-8 fill-crimson text-cosmos"
                  aria-hidden="true"
                />
                <Sparkles
                  className="absolute bottom-2 left-4 size-6 fill-cosmos text-cosmos"
                  aria-hidden="true"
                />

                {/* Trophy Icon */}
                <div className="grid size-24 place-items-center rounded-full border-[3px] border-varden bg-crimson shadow-[4px_4px_0_0_var(--color-varden)]">
                  <Trophy className="size-14 fill-varden text-varden" strokeWidth={2} aria-hidden="true" />
                </div>

                {/* Reward Text */}
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-varden/90">
                    Recompensa desbloqueada
                  </p>
                  <h2 className="mt-1 font-serif text-4xl font-bold text-varden">
                    +{xpGained} XP
                  </h2>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Statistics Grid - Bento Box Style */}
        <section className="w-full max-w-md space-y-3">
          <h3 className="text-center font-serif text-xl text-cosmos">Resumo da Aula</h3>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* XP Card */}
            <article className="flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]">
              <div className="grid size-12 place-items-center rounded-2xl border-[3px] border-cosmos bg-marble shadow-[3px_3px_0_0_var(--color-cosmos)]">
                <Zap className="size-6 fill-varden text-varden" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-cosmos">+{xpGained}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  XP Total
                </p>
              </div>
            </article>

            {/* Accuracy Card */}
            <article className="flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]">
              <div className="grid size-12 place-items-center rounded-2xl border-[3px] border-gochujang bg-crimson shadow-[3px_3px_0_0_var(--color-gochujang)]">
                <Target className="size-6 fill-varden text-varden" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-cosmos">{accuracy}%</p>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Acertos
                </p>
              </div>
            </article>

            {/* Time Card */}
            <article className="flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]">
              <div className="grid size-12 place-items-center rounded-2xl border-[3px] border-cosmos bg-varden shadow-[3px_3px_0_0_var(--color-cosmos)]">
                <Clock className="size-6 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-cosmos">{timeSpent}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Tempo
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Achievement Message */}
        <div className="rounded-2xl border-[3px] border-cosmos bg-marble p-4 shadow-[4px_4px_0_0_var(--color-cosmos)]">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-varden bg-varden/20">
              <Gift className="size-6 text-varden" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <p className="text-sm font-bold text-varden">
              Continue praticando para desbloquear mais conquistas e subir de nível!
            </p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-varden via-varden to-transparent px-5 pb-6 pt-8">
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border-[3px] border-gochujang border-b-[6px] bg-crimson px-6 py-5 text-xl font-extrabold text-varden shadow-[6px_6px_0_0_var(--color-gochujang)] transition-all hover:brightness-110 active:translate-y-1 active:border-b-[3px] active:shadow-[3px_3px_0_0_var(--color-gochujang)]"
        >
          Continuar
          <ArrowRight className="size-6" strokeWidth={3} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
