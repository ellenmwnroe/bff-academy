"use client"

import { useState, useRef, useEffect } from "react"
import { X, Heart, Check, Lightbulb } from "lucide-react"

type FillInTheBlankExerciseProps = {
  readonly sentence: string
  readonly blankPosition: number
  readonly correctAnswer: string
  readonly wordBank?: ReadonlyArray<string>
  readonly progress: number
  readonly lives: number
  readonly onClose: () => void
  readonly onContinue: () => void
}

export function FillInTheBlankView({
  sentence,
  blankPosition,
  correctAnswer,
  wordBank = [],
  progress,
  lives,
  onClose,
  onContinue,
}: FillInTheBlankExerciseProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [isValidated, setIsValidated] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showWordBank, setShowWordBank] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sentenceParts = sentence.split("___")

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleValidate = () => {
    if (!userAnswer.trim()) return

    const correct = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()
    setIsCorrect(correct)
    setIsValidated(true)
  }

  const handleContinue = () => {
    setUserAnswer("")
    setIsValidated(false)
    setIsCorrect(false)
    onContinue()
  }

  const handleWordClick = (word: string) => {
    setUserAnswer(word)
    inputRef.current?.focus()
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
        <progress
          value={progress}
          max={100}
          aria-label="Progresso da lição"
          className="h-5 w-full overflow-hidden rounded-full border-[3px] border-cosmos bg-card shadow-[3px_3px_0_0_var(--color-cosmos)] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-card [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-marble [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-marble"
        />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-5 pb-32 pt-6">
        {/* Sentence with Inline Input */}
        <section className="mb-6 space-y-4">
          <div className="rounded-[28px] border-[3px] border-cosmos bg-card p-8 shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <p className="text-center font-serif text-2xl leading-relaxed text-cosmos">
              {sentenceParts[0]}
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => !isValidated && setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userAnswer.trim() && !isValidated) {
                    handleValidate()
                  }
                }}
                disabled={isValidated}
                className={`mx-2 inline-block min-w-[120px] max-w-[200px] rounded-2xl border-[3px] px-4 py-2 text-center font-serif text-2xl font-bold shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all focus:outline-none focus:ring-4 ${
                  isValidated
                    ? isCorrect
                      ? "border-cosmos bg-marble text-varden ring-marble/30"
                      : "border-gochujang bg-crimson text-varden ring-gochujang/30"
                    : "border-cosmos bg-varden text-cosmos ring-marble/30 focus:bg-marble focus:text-varden"
                }`}
                placeholder="?"
                aria-label="Preencha a lacuna"
              />
              {sentenceParts[1]}
            </p>

            {/* Correct Answer Display (only when wrong) */}
            {isValidated && !isCorrect && (
              <div className="mt-4 rounded-2xl border-[3px] border-cosmos bg-marble p-3 shadow-[3px_3px_0_0_var(--color-cosmos)]">
                <p className="text-center text-sm font-bold text-varden">
                  Resposta correta: <span className="font-serif text-lg">{correctAnswer}</span>
                </p>
              </div>
            )}
          </div>

          {/* Validation Icon */}
          {isValidated && (
            <div className="flex justify-center">
              {isCorrect ? (
                <div className="grid size-16 place-items-center rounded-full border-[3px] border-cosmos bg-marble shadow-[4px_4px_0_0_var(--color-cosmos)]">
                  <Check className="size-8 stroke-varden" strokeWidth={3} aria-hidden="true" />
                </div>
              ) : (
                <div className="grid size-16 place-items-center rounded-full border-[3px] border-gochujang bg-crimson shadow-[4px_4px_0_0_var(--color-gochujang)]">
                  <X className="size-8 stroke-varden" strokeWidth={3} aria-hidden="true" />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Word Bank Section */}
        {wordBank.length > 0 && !isValidated && (
          <section className="space-y-3">
            <button
              type="button"
              onClick={() => setShowWordBank(!showWordBank)}
              className="flex items-center gap-2 rounded-full border-[3px] border-cosmos bg-marble px-4 py-2 text-sm font-bold text-varden shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all hover:brightness-110 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
            >
              <Lightbulb className="size-4" strokeWidth={2.5} aria-hidden="true" />
              {showWordBank ? "Esconder dicas" : "Ver banco de palavras"}
            </button>

            {showWordBank && (
              <div className="flex flex-wrap gap-2">
                {wordBank.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => handleWordClick(word)}
                    className="rounded-full border-[3px] border-cosmos bg-card px-4 py-2 font-bold text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all hover:bg-marble hover:text-varden active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
                  >
                    {word}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Fixed Bottom Validation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-varden via-varden to-transparent px-5 pb-6 pt-8">
        {!isValidated ? (
          <button
            type="button"
            onClick={handleValidate}
            disabled={!userAnswer.trim()}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-b-[6px] px-6 py-5 text-xl font-extrabold shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all ${
              userAnswer.trim()
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
                isCorrect ? "border-cosmos bg-marble" : "border-gochujang bg-crimson"
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
                    {isCorrect ? "Perfeito! 🎯" : "Quase lá!"}
                  </h3>
                  <p className="text-sm font-medium text-varden/90">
                    {isCorrect
                      ? "Você preencheu corretamente! Continue assim!"
                      : "Não desanime, você está aprendendo. Tente novamente!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-b-[6px] px-6 py-5 text-xl font-extrabold text-varden shadow-[4px_4px_0_0_var(--color-gochujang)] transition-all hover:brightness-110 active:translate-y-1 active:border-b-[3px] active:shadow-[2px_2px_0_0_var(--color-gochujang)] ${
                isCorrect ? "border-cosmos bg-marble" : "border-gochujang bg-crimson"
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
