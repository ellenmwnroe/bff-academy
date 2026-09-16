"use client"

import { HeartCrack } from "lucide-react"
import { useEffect } from "react"

type CancelLessonModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onConfirm?: () => void
}

export function CancelLessonModal({ isOpen, onClose, onConfirm }: CancelLessonModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <dialog
      open
      aria-labelledby="cancel-lesson-title"
      aria-describedby="cancel-lesson-copy"
      className="fixed inset-0 z-100 flex size-full max-h-none max-w-none items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Manter a aula e fechar"
        className="absolute inset-0 cursor-default"
      />

      <div className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border-[3px] border-cosmos bg-varden p-6 text-center shadow-[8px_8px_0_0_var(--color-cosmos)] sm:p-8">
        <span className="grid size-16 place-items-center rounded-full border-[3px] border-cosmos bg-crimson/10 shadow-[3px_3px_0_0_var(--color-cosmos)]">
          <HeartCrack className="size-8 text-crimson" strokeWidth={2.5} aria-hidden="true" />
        </span>

        <div className="flex flex-col gap-3">
          <h2 id="cancel-lesson-title" className="font-serif text-2xl leading-tight text-cosmos text-balance sm:text-3xl">
            Tem certeza que deseja cancelar?
          </h2>
          <p id="cancel-lesson-copy" className="text-sm font-bold leading-relaxed text-cosmos/75 sm:text-base">
            Você vai perder a chance de praticar seu inglês hoje e sua ofensiva pode ser
            afetada. Lembre-se que cancelamentos com menos de 5h não devolvem o ticket de
            reposição.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border-[3px] border-cosmos bg-cosmos px-4 py-5 text-lg font-black text-varden shadow-[6px_6px_0_0_var(--color-crimson)] transition-all hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-crimson)] active:translate-y-1 active:shadow-none"
          >
            Não, quero manter minha aula! 🚀
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="bg-transparent py-1 text-sm font-bold text-cosmos/45 underline decoration-cosmos/30 underline-offset-4 transition-colors hover:text-cosmos/70"
          >
            Sim, cancelar aula.
          </button>
        </div>
      </div>
    </dialog>
  )
}
