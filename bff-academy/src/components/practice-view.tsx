"use client"

import { X, Mic, Star, Zap } from "lucide-react"

export function PracticeView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col px-5 pb-6 pt-5">
      {/* Top bar: progress + close */}
      <div className="flex items-center gap-3">
        <div
          className="h-4 flex-1 overflow-hidden rounded-full border-2 border-[#00457F] bg-white shadow-[2px_2px_0_0_rgba(0,69,127,1)]"
          role="progressbar"
          aria-valuenow={20}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso da prática"
        >
          <div className="h-full w-1/5 rounded-full bg-[#FFA723]" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar prática"
          className="grid size-10 place-items-center rounded-2xl border-2 border-[#00457F] bg-white text-[#00457F] shadow-[2px_2px_0_0_rgba(0,69,127,1)] transition-transform active:scale-90"
        >
          <X className="size-5" strokeWidth={3} aria-hidden="true" />
        </button>
      </div>

      {/* Center stage: flashcard */}
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="relative w-full rounded-[28px] border-[3px] border-[#00457F] bg-white px-6 py-14 text-center shadow-[6px_6px_0_0_rgba(0,69,127,1)]">
          <Star
            className="animate-bob absolute -left-3 -top-3 size-8 fill-[#FFA723] text-[#00457F]"
            style={{ ["--bob-rot" as string]: "-12deg" }}
            aria-hidden="true"
          />
          <Zap
            className="animate-bob absolute -right-3 -top-3 size-7 fill-[#FFE08A] text-[#00457F]"
            style={{ ["--bob-rot" as string]: "10deg", animationDelay: "0.6s" }}
            aria-hidden="true"
          />
          <span className="rounded-full bg-[#EDF5FA] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#2F8EE0]">
            Traduza em voz alta
          </span>
          <p className="mt-5 text-balance font-serif text-2xl leading-snug text-[#00457F]">
            Eu tenho que passar minhas roupas.
          </p>
        </div>
      </div>

      {/* Action area: record button */}
      <div className="flex flex-col items-center gap-4 pb-4">
        <div className="relative grid place-items-center">
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#EC6206]/30"
            aria-hidden="true"
          />
          <button
            type="button"
            aria-label="Segure para gravar"
            className="relative grid size-24 place-items-center rounded-full border-[3px] border-[#8f3a03] border-b-[8px] bg-[#EC6206] text-white transition-all active:translate-y-1 active:border-b-[3px]"
          >
            <Mic className="size-10" strokeWidth={2.75} aria-hidden="true" />
          </button>
        </div>
        <p className="text-sm font-bold text-[#5b7a99]">Segure para gravar</p>
      </div>
    </div>
  )
}
