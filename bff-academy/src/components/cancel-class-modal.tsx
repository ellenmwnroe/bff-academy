"use client"

import { CalendarX, X, AlertTriangle, Ticket } from "lucide-react"
import { useEffect } from "react"

export const MIN_HOURS_TO_EARN_TICKET = 5

type CancelClassModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onConfirm?: () => void
  readonly lessonTitle?: string
  readonly lessonTime?: string
  readonly hoursUntilClass?: number
}

export function CancelClassModal({
  isOpen,
  onClose,
  onConfirm,
  lessonTitle,
  lessonTime,
  hoursUntilClass = 0,
}: CancelClassModalProps) {
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

  const earnsTicket = hoursUntilClass >= MIN_HOURS_TO_EARN_TICKET
  const hoursLabel = hoursUntilClass === 1 ? "1 hora" : `${hoursUntilClass} horas`

  return (
    <dialog
      open
      aria-labelledby="cancel-modal-title"
      className="fixed inset-0 z-100 flex size-full max-h-none max-w-none items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      {/* Camada de fechamento ao clicar fora do card */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar modal"
        className="absolute inset-0 cursor-default"
      />

      <div className="relative flex w-full max-w-md flex-col gap-5 rounded-4xl border-4 border-[#083344] bg-white p-6 shadow-[8px_8px_0_0_#083344]">
        {/* Cabeçalho */}
        <header className="flex items-start gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#BE1622] shadow-[2px_2px_0_0_#083344]">
            <CalendarX className="size-6 text-white" strokeWidth={2.5} aria-hidden="true" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <h2 id="cancel-modal-title" className="text-2xl font-black text-[#083344]">
              Cancelar Aula
            </h2>
            {lessonTitle && (
              <p className="truncate text-sm font-bold text-[#083344]/60">
                {lessonTitle}
                {lessonTime && ` · ${lessonTime}`}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-[#083344]/50 transition-all hover:bg-[#083344]/10 hover:text-[#083344] active:scale-95"
          >
            <X className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </header>

        {/* Consequência do cancelamento neste horário */}
        {earnsTicket ? (
          <div className="flex gap-2.5 rounded-xl border-2 border-[#083344] bg-[#FDF6E3] p-3">
            <Ticket
              className="size-5 shrink-0 text-[#083344]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-black text-[#083344]">
                Você vai receber 1 Ticket de Reposição
              </p>
              <p className="text-sm font-medium text-[#083344]/70">
                Faltam {hoursLabel} para a aula, então o cancelamento está dentro do prazo.
                Use o ticket depois para agendar a reposição quando quiser.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2.5 rounded-lg border-2 border-[#BE1622]/20 bg-red-50 p-3">
            <AlertTriangle
              className="size-5 shrink-0 text-[#BE1622]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-black text-[#BE1622]">
                Você não vai receber ticket
              </p>
              <p className="text-sm font-bold text-[#BE1622]">
                Faltam apenas {hoursLabel} para a aula. Cancelamentos precisam de{" "}
                {MIN_HOURS_TO_EARN_TICKET} horas de antecedência, então esta aula será
                cobrada normalmente.
              </p>
            </div>
          </div>
        )}

        {/* Regra de negócio */}
        <p className="text-xs font-medium text-[#083344]/60">
          Regra da escola: cancelamentos feitos com pelo menos{" "}
          {MIN_HOURS_TO_EARN_TICKET} horas de antecedência geram um Ticket de Reposição.
          Abaixo desse prazo, a aula é cobrada e nenhum ticket é gerado.
        </p>

        {/* Ações */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-2xl border-[3px] border-[#083344] bg-[#BE1622] px-4 py-3.5 font-black text-white shadow-[4px_4px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none"
          >
            {earnsTicket ? "Cancelar e receber ticket" : "Cancelar mesmo assim"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-transparent py-2 font-bold text-[#083344] transition-all hover:text-[#083344]/60"
          >
            Manter minha aula
          </button>
        </div>
      </div>
    </dialog>
  )
}
