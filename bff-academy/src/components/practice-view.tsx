"use client"

import { X, Mic, Star, Zap } from "lucide-react"

export function PracticeView({ onClose }: { readonly onClose: () => void }) {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col px-5 pb-6 pt-5">
      {/* Top bar: progress + close */}
      <div className="flex items-center gap-3">
        <progress
          value={20}
          max={100}
          aria-label="Progresso da prática"
          className="h-4 flex-1 overflow-hidden rounded-full border-[3px] border-cosmos bg-card shadow-[2px_2px_0_0_var(--color-cosmos)] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-card [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-marble [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-marble"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar prática"
          className="grid size-10 place-items-center rounded-2xl border-[3px] border-cosmos bg-card text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)] transition-transform active:scale-90"
        >
          <X className="size-5" strokeWidth={3} aria-hidden="true" />
        </button>
      </div>

      {/* Center stage: flashcard */}
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="relative w-full rounded-[28px] border-[3px] border-cosmos bg-card px-6 py-14 text-center shadow-[6px_6px_0_0_var(--color-cosmos)]">
          <Star
            className="animate-bob absolute -left-3 -top-3 size-8 fill-varden text-cosmos"
            style={{ ["--bob-rot" as string]: "-12deg" }}
            aria-hidden="true"
          />
          <Zap
            className="animate-bob absolute -right-3 -top-3 size-7 fill-varden text-cosmos"
            style={{ ["--bob-rot" as string]: "10deg", animationDelay: "0.6s" }}
            aria-hidden="true"
          />
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-widest text-marble">
            Traduza em voz alta
          </span>
          <p className="mt-5 text-balance font-serif text-2xl leading-snug text-cosmos">
            Eu tenho que passar minhas roupas.
          </p>
        </div>
      </div>

      {/* Action area: record button */}
      <div className="flex flex-col items-center gap-4 pb-4">
        <div className="relative grid place-items-center">
          <span
            className="absolute inset-0 animate-ping rounded-full bg-crimson/30"
            aria-hidden="true"
          />
          <button
            type="button"
            aria-label="Segure para gravar"
            className="relative grid size-24 place-items-center rounded-full border-[3px] border-gochujang border-b-[8px] bg-crimson text-varden transition-all active:translate-y-1 active:border-b-[3px]"
          >
            <Mic className="size-10" strokeWidth={2.75} aria-hidden="true" />
          </button>
        </div>
        <p className="text-sm font-bold text-muted-foreground">Segure para gravar</p>
      </div>
    </div>
  )
}
