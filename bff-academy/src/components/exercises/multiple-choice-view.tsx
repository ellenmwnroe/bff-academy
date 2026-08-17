"use client"

import { useState } from "react"
import { X, Heart, Volume2, Check } from "lucide-react"

type Answer = {
  readonly id: string
  readonly text: string
}

type MultipleChoiceExerciseProps = {
  readonly question: string
  readonly answers: ReadonlyArray<Answer>
  readonly correctAnswerId: string
  readonly audioUrl?: string
  readonly progress: number
  readonly lives: number
  readonly onClose: () => void
  readonly onContinue: () => void
}

export function MultipleChoiceView({
  question,
  answers,
  correctAnswerId,
  audioUrl,
  progress,
  lives,
  onClose,
  onContinue,
}: MultipleChoiceExerciseProps) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [isValidated, setIsValidated] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleValidate = () => {
    if (!selectedAnswerId) return
    
    const correct = selectedAnswerId === correctAnswerId
    setIsCorrect(correct)
    setIsValidated(true)
  }

  const handleContinue = () => {
    setSelectedAnswerId(null)
    setIsValidated(false)
    setIsCorrect(false)
    onContinue()
  }

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-varden">
      {/* Header */}
      <header className="space-y-3 px-5 py-4">
        {/* Top Bar: Close + Lives */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-2xl border-[3px] border-cosmos bg-card shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--color-cosmos)]"
            aria-label="Fechar exercício"
          >
            <X className="size-5 text-cosmos" strokeWidth={3} aria-hidden="true" />
          </button>

          {/* Lives Counter */}
          <div className="flex items-center gap-2 rounded-full border-[3px] border-cosmos bg-card px-3 py-1.5 shadow-[3px_3px_0_0_var(--color-cosmos)]">
            <Heart className="size-5 fill-crimson text-crimson" strokeWidth={2.5} aria-hidden="true" />
            <span className="font-serif text-lg font-bold text-cosmos">{lives}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-5 overflow-hidden rounded-full border-[3px] border-cosmos bg-card shadow-[3px_3px_0_0_var(--color-cosmos)]">
          <div
            className="h-full rounded-full bg-marble transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-5 pb-32 pt-6">
        {/* Question Area */}
        <section className="mb-8 space-y-4">
          <div className="rounded-[28px] border-[3px] border-cosmos bg-card p-6 shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <h2 className="text-center font-serif text-2xl leading-tight text-cosmos text-balance">
              {question}
            </h2>
          </div>

          {/* Audio Button (Optional) */}
          {audioUrl && (
            <button
              type="button"
              onClick={playAudio}
              className="mx-auto flex items-center gap-2 rounded-full border-[3px] border-cosmos bg-marble px-4 py-2 shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all hover:brightness-110 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
            >
              <Volume2 className="size-5 fill-varden text-varden" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-sm font-bold text-varden">Ouvir pergunta</span>
            </button>
          )}
        </section>

        {/* Answer Cards Grid */}
        <section className="grid gap-4 sm:grid-cols-2">
          {answers.map((answer) => {
            const isSelected = selectedAnswerId === answer.id
            const showResult = isValidated && isSelected
            const isCorrectAnswer = answer.id === correctAnswerId

            let cardStyles = "border-cosmos bg-card"
            let textStyles = "text-cosmos"

            if (isValidated) {
              if (isSelected && isCorrect) {
                cardStyles = "border-cosmos bg-marble"
                textStyles = "text-varden"
              } else if (isSelected && !isCorrect) {
                cardStyles = "border-gochujang bg-crimson"
                textStyles = "text-varden"
              } else if (!isSelected && isCorrectAnswer) {
                cardStyles = "border-cosmos bg-marble opacity-70"
                textStyles = "text-varden"
              }
            } else if (isSelected) {
              cardStyles = "border-cosmos bg-marble"
              textStyles = "text-varden"
            }

            return (
              <button
                key={answer.id}
                type="button"
                onClick={() => !isValidated && setSelectedAnswerId(answer.id)}
                disabled={isValidated}
                className={`relative rounded-[28px] border-[3px] p-6 text-left font-bold shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all ${cardStyles} ${
                  !isValidated
                    ? "hover:brightness-105 active:translate-y-1 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
                    : ""
                } ${isValidated ? "cursor-default" : "cursor-pointer"}`}
              >
                {/* Check/X Icon for validation */}
                {showResult && (
                  <div className="absolute -right-2 -top-2">
                    {isCorrect ? (
                      <div className="grid size-8 place-items-center rounded-full border-[3px] border-cosmos bg-marble shadow-[2px_2px_0_0_var(--color-cosmos)]">
                        <Check className="size-5 stroke-varden" strokeWidth={3} aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="grid size-8 place-items-center rounded-full border-[3px] border-gochujang bg-crimson shadow-[2px_2px_0_0_var(--color-gochujang)]">
                        <X className="size-5 stroke-varden" strokeWidth={3} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                )}

                <span className={`text-lg ${textStyles}`}>{answer.text}</span>
              </button>
            )
          })}
        </section>
      </main>

      {/* Fixed Bottom Validation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-varden via-varden to-transparent px-5 pb-6 pt-8">
        {!isValidated ? (
          <button
            type="button"
            onClick={handleValidate}
            disabled={!selectedAnswerId}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-b-[6px] px-6 py-5 text-xl font-extrabold shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all ${
              selectedAnswerId
                ? "border-cosmos bg-marble text-varden hover:brightness-110 active:translate-y-1 active:border-b-[3px] active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
                : "cursor-not-allowed border-cosmos bg-muted text-muted-foreground opacity-50"
            }`}
          >
            Verificar Resposta
          </button>
        ) : (
          <div className="space-y-3">
            {/* Feedback Message */}
            <div
              className={`rounded-2xl border-[3px] p-4 shadow-[3px_3px_0_0_var(--color-cosmos)] ${
                isCorrect
                  ? "border-cosmos bg-marble"
                  : "border-gochujang bg-crimson"
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <div className="grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-varden bg-varden/20">
                    <Check className="size-6 stroke-varden" strokeWidth={3} aria-hidden="true" />
                  </div>
                ) : (
                  <div className="grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-varden bg-varden/20">
                    <X className="size-6 stroke-varden" strokeWidth={3} aria-hidden="true" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-varden">
                    {isCorrect ? "Parabéns! 🎉" : "Ops! Não foi dessa vez"}
                  </h3>
                  <p className="text-sm font-medium text-varden/90">
                    {isCorrect
                      ? "Você acertou! Continue assim para manter sua sequência!"
                      : "Não desanime! Aprender é errar e tentar de novo."}
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-b-[6px] px-6 py-5 text-xl font-extrabold text-varden shadow-[4px_4px_0_0_var(--color-gochujang)] transition-all hover:brightness-110 active:translate-y-1 active:border-b-[3px] active:shadow-[2px_2px_0_0_var(--color-gochujang)] ${
                isCorrect
                  ? "border-cosmos bg-marble"
                  : "border-gochujang bg-crimson"
              }`}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
