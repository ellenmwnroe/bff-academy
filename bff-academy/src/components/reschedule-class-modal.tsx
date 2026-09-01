"use client"

import { Ticket, X, Clock, Check, Users, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
  formatSlotDate,
  formatSlotTimeRange,
  type MakeupSlot,
} from "../lib/makeup-slots"

type RescheduleClassModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onConfirm?: (slotId: string) => void
  readonly ticketsAvailable?: number
  readonly slots?: ReadonlyArray<MakeupSlot>
  readonly isLoadingSlots?: boolean
}

export function RescheduleClassModal({
  isOpen,
  onClose,
  onConfirm,
  ticketsAvailable = 0,
  slots = [],
  isLoadingSlots = false,
}: RescheduleClassModalProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    setSelectedSlotId(null)

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

  const hasTickets = ticketsAvailable > 0
  const ticketLabel = ticketsAvailable === 1 ? "Ticket" : "Tickets"

  const renderSlots = () => {
    if (isLoadingSlots) {
      return (
        <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#083344]/30 p-6">
          <Loader2
            className="size-5 animate-spin text-[#083344]/60"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <p className="text-sm font-bold text-[#083344]/60">Buscando horários...</p>
        </div>
      )
    }

    if (slots.length === 0) {
      return (
        <div className="rounded-xl border-2 border-dashed border-[#083344]/30 p-4 text-center">
          <p className="text-sm font-bold text-[#083344]/70">
            Nenhum horário de reposição disponível no momento. Seu ticket continua
            guardado — tente de novo em alguns dias.
          </p>
        </div>
      )
    }

    return (
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-black text-[#083344]">
          Horários disponíveis
        </legend>

        {slots.map((slot) => {
          const isSelected = slot.id === selectedSlotId

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => setSelectedSlotId(slot.id)}
              aria-pressed={isSelected}
              className={`flex items-center gap-3 rounded-xl border-[3px] border-[#083344] p-3 text-left transition-all active:scale-[0.98] ${
                isSelected
                  ? "bg-[#083344] text-white shadow-[3px_3px_0_0_#083344]"
                  : "bg-white text-[#083344]"
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    isSelected ? "text-white/70" : "text-[#083344]/60"
                  }`}
                >
                  <Clock className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                  {formatSlotDate(slot)} · {formatSlotTimeRange(slot)}
                </span>

                <span className="truncate font-bold">{slot.title}</span>

                <span
                  className={`flex items-center gap-2 truncate text-sm font-medium ${
                    isSelected ? "text-white/70" : "text-[#083344]/60"
                  }`}
                >
                  {slot.teacherName}
                  {slot.spotsLeft !== null && (
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                      {slot.spotsLeft} {slot.spotsLeft === 1 ? "vaga" : "vagas"}
                    </span>
                  )}
                </span>
              </div>

              {isSelected && (
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white">
                  <Check className="size-4 text-[#083344]" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
            </button>
          )
        })}
      </fieldset>
    )
  }

  return (
    <dialog
      open
      aria-labelledby="reschedule-modal-title"
      className="fixed inset-0 z-100 flex size-full max-h-none max-w-none items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      {/* Camada de fechamento ao clicar fora do card */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar modal"
        className="absolute inset-0 cursor-default"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-4xl border-4 border-[#083344] bg-white p-6 shadow-[8px_8px_0_0_#083344]">
        {/* Cabeçalho */}
        <header className="flex items-start gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#FDD835] shadow-[2px_2px_0_0_#083344]">
            <Ticket className="size-6 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <h2 id="reschedule-modal-title" className="text-2xl font-black text-[#083344]">
              Agendar Reposição
            </h2>
            <p className="text-sm font-bold text-[#083344]/60">
              Escolha um horário disponível
            </p>
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

        {/* Saldo de tickets */}
        <div className="flex items-center gap-3 rounded-xl border-2 border-[#083344] bg-[#FDF6E3] p-3">
          <Ticket className="size-5 shrink-0 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
          <p className="text-sm font-bold text-[#083344]">
            Você tem{" "}
            <span className="font-black">
              {ticketsAvailable} {ticketLabel} de Reposição
            </span>{" "}
            {ticketsAvailable === 1 ? "disponível" : "disponíveis"}
          </p>
        </div>

        {hasTickets ? (
          <>
            {renderSlots()}

            <p className="text-xs font-medium text-[#083344]/60">
              O ticket é reservado agora e baixado pelo professor no diário de classe assim
              que a reposição acontecer.
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => selectedSlotId && onConfirm?.(selectedSlotId)}
                disabled={selectedSlotId === null}
                className="w-full rounded-2xl border-[3px] border-[#083344] bg-[#083344] px-4 py-3.5 font-black text-white shadow-[4px_4px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-[#083344]/40 disabled:shadow-none"
              >
                {selectedSlotId ? "Usar 1 Ticket e Agendar" : "Escolha um horário"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-transparent py-2 font-bold text-[#083344] transition-all hover:text-[#083344]/60"
              >
                Agora não
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Sem saldo: explica como conseguir um ticket */}
            <div className="rounded-xl border-2 border-dashed border-[#083344]/30 p-4 text-center">
              <p className="text-sm font-bold text-[#083344]/70">
                Você ainda não tem tickets. Cancele uma aula com pelo menos 5 horas de
                antecedência para receber um Ticket de Reposição.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl border-[3px] border-[#083344] bg-white px-4 py-3.5 font-black text-[#083344] shadow-[4px_4px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none"
            >
              Entendi
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}
