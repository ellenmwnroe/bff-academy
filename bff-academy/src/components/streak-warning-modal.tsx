"use client"

import { Flame } from "lucide-react"
import { useEffect } from "react"

type StreakWarningModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onSaveStreak?: () => void
  readonly streakDays?: number
}

export function StreakWarningModal({
  isOpen,
  onClose,
  onSaveStreak,
  streakDays = 12,
}: StreakWarningModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <dialog
      open
      aria-labelledby="streak-warning-title"
      className="fixed inset-0 z-100 flex size-full max-h-none max-w-none items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      {/* Camada de fechamento ao clicar fora do card */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar alerta"
        className="absolute inset-0 cursor-default"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center gap-4 rounded-4xl border-4 border-[#083344] bg-[#FDF6E3] p-6 text-center shadow-[8px_8px_0_0_#083344]">
        {/* Ícone de urgência */}
        <div className="flex size-20 items-center justify-center rounded-full border-[3px] border-[#083344] bg-[#BE1622]/10">
          <Flame
            className="size-10 animate-pulse fill-[#BE1622] text-[#BE1622]"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        {/* Textos */}
        <div className="flex flex-col gap-2">
          <h2 id="streak-warning-title" className="text-2xl font-black text-[#083344]">
            Sua Ofensiva está em perigo!
          </h2>
          <p className="text-sm font-medium text-[#083344]/80">
            Você está há {streakDays} dias seguidos estudando. Faça uma lição agora para não
            zerar seu progresso!
          </p>
        </div>

        {/* Ações */}
        <div className="mt-2 flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={onSaveStreak}
            className="w-full rounded-2xl border-[3px] border-[#083344] bg-[#BE1622] px-4 py-3.5 font-black text-white shadow-[4px_4px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none"
          >
            Salvar minha Ofensiva
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-transparent py-2 font-bold text-[#083344]/60 transition-all hover:text-[#083344]"
          >
            Talvez mais tarde
          </button>
        </div>
      </div>
    </dialog>
  )
}
