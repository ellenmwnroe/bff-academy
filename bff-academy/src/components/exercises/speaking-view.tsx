"use client"

import { useState } from "react"
import { X, Heart, Volume2, Mic, Check, Loader2 } from "lucide-react"

type RecordingState = "idle" | "recording" | "processing" | "validated"

type SpeakingExerciseProps = {
  readonly targetPhrase: string
  readonly audioUrl?: string
  readonly progress: number
  readonly lives: number
  readonly onClose: () => void
  readonly onContinue: () => void
  readonly onRecordStart?: () => void
  readonly onRecordStop?: () => void
}

export function SpeakingView({
  targetPhrase,
  audioUrl,
  progress,
  lives,
  onClose,
  onContinue,
  onRecordStart,
  onRecordStop,
}: SpeakingExerciseProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const handlePlayAudio = () => {
    if (audioUrl) {
      setIsPlaying(true)
      const audio = new Audio(audioUrl)
      audio.play()
      audio.onended = () => setIsPlaying(false)
    } else {
      // Mock audio play
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }

  const handleMicClick = () => {
    if (recordingState === "idle") {
      // Start recording
      setRecordingState("recording")
      onRecordStart?.()

      // Mock: Stop after 3 seconds
      setTimeout(() => {
        setRecordingState("processing")
        onRecordStop?.()

        // Mock: Validate after 2 seconds
        setTimeout(() => {
          setRecordingState("validated")
          // Mock validation (50% chance of correct)
          const correct = Math.random() > 0.5
          setIsCorrect(correct)
          setFeedbackMessage(
            correct
              ? "Excelente pronúncia! Continue praticando!"
              : "Quase lá! Tente novamente prestando atenção na entonação."
          )
        }, 2000)
      }, 3000)
    } else if (recordingState === "recording") {
      // Stop recording early
      setRecordingState("processing")
      onRecordStop?.()

      setTimeout(() => {
        setRecordingState("validated")
        const correct = Math.random() > 0.5
        setIsCorrect(correct)
        setFeedbackMessage(
          correct
            ? "Excelente pronúncia! Continue praticando!"
            : "Quase lá! Tente novamente prestando atenção na entonação."
        )
      }, 2000)
    }
  }

  const handleContinue = () => {
    setRecordingState("idle")
    setIsCorrect(false)
    setFeedbackMessage("")
    onContinue()
  }

  const getMicButtonStyles = () => {
    switch (recordingState) {
      case "recording":
        return "border-gochujang bg-crimson"
      case "processing":
        return "border-cosmos bg-marble"
      case "validated":
        return isCorrect ? "border-cosmos bg-marble" : "border-gochujang bg-crimson"
      default:
        return "border-cosmos bg-card hover:bg-marble hover:border-cosmos"
    }
  }

  const getMicIconColor = () => {
    switch (recordingState) {
      case "recording":
        return "text-varden"
      case "processing":
        return "text-varden"
      case "validated":
        return isCorrect ? "text-varden" : "text-varden"
      default:
        return "text-cosmos"
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
        <progress
          value={progress}
          max={100}
          aria-label="Progresso da lição"
          className="h-5 w-full overflow-hidden rounded-full border-[3px] border-cosmos bg-card shadow-[3px_3px_0_0_var(--color-cosmos)] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-card [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-marble [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-marble"
        />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-5 pb-32">
        {/* Listening Area - Target Phrase Card */}
        <section className="w-full space-y-4">
          <div className="rounded-[28px] border-[3px] border-cosmos bg-card p-8 shadow-[6px_6px_0_0_var(--color-cosmos)]">
            <div className="space-y-4">
              <span className="inline-block rounded-full border-[3px] border-cosmos bg-marble px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-varden shadow-[2px_2px_0_0_var(--color-cosmos)]">
                Ouça e repita
              </span>

              <h2 className="text-center font-serif text-3xl leading-tight text-cosmos text-balance">
                {targetPhrase}
              </h2>

              {/* Audio Play Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  disabled={isPlaying || recordingState === "recording"}
                  className={`flex items-center gap-2 rounded-full border-[3px] px-5 py-3 font-bold shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all ${
                    isPlaying
                      ? "border-cosmos bg-marble text-varden"
                      : "border-cosmos bg-cosmos text-varden hover:brightness-110 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
                  } ${recordingState === "recording" ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <Volume2
                    className={`size-5 ${isPlaying ? "animate-pulse" : ""}`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="text-sm">{isPlaying ? "Reproduzindo..." : "Ouvir Frase"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Speaking Area - Microphone Button */}
        <section className="flex flex-col items-center gap-4">
          {recordingState === "idle" && (
            <p className="text-center text-sm font-bold uppercase tracking-wide text-cosmos">
              Pressione o microfone para gravar
            </p>
          )}

          {recordingState === "recording" && (
            <p className="text-center text-sm font-bold uppercase tracking-wide text-crimson animate-pulse">
              🔴 Gravando... Fale agora!
            </p>
          )}

          {recordingState === "processing" && (
            <p className="text-center text-sm font-bold uppercase tracking-wide text-cosmos">
              Analisando sua pronúncia...
            </p>
          )}

          {/* Microphone Button */}
          <div className="relative">
            {/* Pulse effect when recording */}
            {recordingState === "recording" && (
              <div className="absolute inset-0 animate-ping rounded-full bg-crimson/30" aria-hidden="true" />
            )}

            <button
              type="button"
              onClick={handleMicClick}
              disabled={recordingState === "processing" || recordingState === "validated"}
              className={`relative grid size-32 place-items-center rounded-full border-[3px] border-b-[8px] shadow-[6px_6px_0_0_var(--color-cosmos)] transition-all ${getMicButtonStyles()} ${
                recordingState === "processing" || recordingState === "validated"
                  ? "cursor-not-allowed"
                  : "active:translate-y-1 active:border-b-[3px] active:shadow-[3px_3px_0_0_var(--color-cosmos)]"
              }`}
              aria-label={recordingState === "recording" ? "Parar gravação" : "Começar gravação"}
            >
              {recordingState === "processing" ? (
                <Loader2 className="size-12 animate-spin text-varden" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <Mic className={`size-12 ${getMicIconColor()}`} strokeWidth={2.5} aria-hidden="true" />
              )}
            </button>
          </div>

          {recordingState === "recording" && (
            <p className="text-xs font-medium text-cosmos/70">Toque novamente para parar</p>
          )}
        </section>
      </main>

      {/* Fixed Bottom Validation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-varden via-varden to-transparent px-5 pb-6 pt-8">
        {recordingState === "validated" ? (
          <div className="space-y-3">
            {/* Feedback Message */}
            <div
              className={`rounded-2xl border-[3px] p-4 shadow-[3px_3px_0_0_var(--color-cosmos)] ${
                isCorrect ? "border-cosmos bg-marble" : "border-gochujang bg-crimson"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full border-[3px] border-varden bg-varden/20">
                  {isCorrect ? (
                    <Check className="size-6 stroke-varden" strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <X className="size-6 stroke-varden" strokeWidth={3} aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-varden">
                    {isCorrect ? "Ótimo trabalho! 🎤" : "Tente novamente!"}
                  </h3>
                  <p className="text-sm font-medium text-varden/90">{feedbackMessage}</p>
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
              {isCorrect ? "Continuar" : "Tentar Novamente"}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border-[3px] border-cosmos bg-card p-4 shadow-[3px_3px_0_0_var(--color-cosmos)]">
            <p className="text-center text-sm font-bold text-cosmos">
              💡 Dica: Fale claramente e com calma para melhor resultado
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
