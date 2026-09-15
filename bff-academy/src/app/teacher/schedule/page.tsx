"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Flame, Zap, Users, Clock } from "lucide-react"

const WEEKDAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const
const WEEKDAY_SHORT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const

const TIME_SLOTS = ["08:00", "10:00", "14:00", "16:00", "19:00"] as const

type SlotKey = `${(typeof WEEKDAY_SHORT)[number]}-${(typeof TIME_SLOTS)[number]}`

const initialFreeSlots: ReadonlyArray<SlotKey> = [
  "Seg-08:00",
  "Seg-14:00",
  "Ter-19:00",
  "Qua-10:00",
  "Qua-16:00",
  "Qui-19:00",
  "Sex-08:00",
  "Sáb-10:00",
]

const opportunities = [
  {
    id: "a",
    kind: "class" as const,
    title: "Flex 1 - Terças e Quintas 19h",
    detail: "Turma iniciante recém-aberta. 6 vagas preenchidas de 8.",
    badges: [
      { label: "+XP", tone: "yellow" },
      { label: "Valor Extra", tone: "green" },
    ],
    action: "Assumir Turma",
  },
  {
    id: "b",
    kind: "class" as const,
    title: "Flex 3 - Sábados 09h",
    detail: "Pré-intermediário. Turma já completa, aguardando professor titular.",
    badges: [
      { label: "Turma Lotada", tone: "red" },
      { label: "+XP", tone: "yellow" },
    ],
    action: "Assumir Turma",
  },
  {
    id: "c",
    kind: "express" as const,
    title: "Aula Avulsa de Conversação - Hoje 17:00",
    detail: "Reposição urgente. Aluno James Carter, 50 minutos.",
    badges: [
      { label: "Valor Extra", tone: "green" },
      { label: "+XP", tone: "yellow" },
    ],
    action: "Pegar Aula Agora ⚡",
  },
]

const badgeStyles: Record<string, string> = {
  yellow: "border-[#083344] bg-[#F59E0B] text-[#083344]",
  green: "border-[#083344] bg-[#10B981] text-white",
  red: "border-[#083344] bg-[#BE1622] text-white",
}

export default function TeacherSchedulePage() {
  const router = useRouter()
  const [freeSlots, setFreeSlots] = useState<ReadonlySet<SlotKey>>(
    () => new Set(initialFreeSlots),
  )

  const toggleSlot = (slot: SlotKey) => {
    setFreeSlots((current) => {
      const next = new Set(current)
      if (next.has(slot)) {
        next.delete(slot)
      } else {
        next.add(slot)
      }
      return next
    })
  }

  return (
    <main className="min-h-screen bg-[#FDF6E3] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => router.push("/teacher")}
            aria-label="Voltar ao painel"
            className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-white text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <p className="text-sm font-bold text-[#083344]/60">Teacher Marina</p>
            <h1 className="text-2xl font-black leading-tight text-[#083344] sm:text-3xl">
              Agenda e Oportunidades
            </h1>
          </div>
        </header>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
          <section
            aria-labelledby="availability-title"
            className="rounded-2xl border-[3px] border-[#083344] bg-white p-4 shadow-[4px_4px_0_0_#083344] sm:p-6 lg:col-span-7"
          >
            <header className="mb-5 flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#FDF6E3]">
                <Clock className="size-5 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="availability-title" className="text-lg font-black text-[#083344] sm:text-xl">
                  Meus Horários Livres
                </h2>
                <p className="text-sm font-bold text-[#083344]/60">
                  Toque para marcar ou desmarcar disponibilidade na semana
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-4">
              {WEEKDAYS.map((dayName, index) => {
                const short = WEEKDAY_SHORT[index]

                return (
                  <div
                    key={dayName}
                    className="flex flex-col gap-2 border-b-2 border-[#083344]/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm font-black text-[#083344]">{dayName}</p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {TIME_SLOTS.map((time) => {
                        const slotKey: SlotKey = `${short}-${time}`
                        const isFree = freeSlots.has(slotKey)

                        return (
                          <button
                            key={slotKey}
                            type="button"
                            onClick={() => toggleSlot(slotKey)}
                            aria-pressed={isFree}
                            aria-label={`${dayName} ${time}, ${isFree ? "livre" : "indisponível"}`}
                            className={`rounded-full border-2 border-[#083344] px-2 py-2 text-xs font-black transition-all active:scale-95 sm:text-sm ${
                              isFree
                                ? "bg-[#10B981] text-white shadow-[2px_2px_0_0_#083344]"
                                : "bg-[#FDF6E3] text-[#083344]/50"
                            }`}
                          >
                            {time}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section
            aria-labelledby="opportunities-title"
            className="flex flex-col gap-4 lg:col-span-5"
          >
            <header className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#BE1622] shadow-[2px_2px_0_0_#083344]">
                <Flame className="size-5 text-white" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h2 id="opportunities-title" className="text-lg font-black text-[#083344] sm:text-xl">
                Novas Turmas e Reposições
              </h2>
            </header>

            {opportunities.map((opportunity) => {
              const isExpress = opportunity.kind === "express"

              return (
                <article
                  key={opportunity.id}
                  className={`flex flex-col gap-3 rounded-2xl border-[3px] p-4 shadow-[4px_4px_0_0_#083344] sm:p-5 ${
                    isExpress
                      ? "border-[#BE1622] bg-[#F59E0B]"
                      : "border-[#083344] bg-white"
                  }`}
                >
                  <div className="flex flex-wrap gap-2">
                    {opportunity.badges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`rounded-full border-2 px-2.5 py-0.5 text-xs font-black ${badgeStyles[badge.tone]}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-black wrap-break-word text-[#083344] sm:text-lg">
                      {opportunity.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium wrap-break-word text-[#083344]/70">
                      {opportunity.detail}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={`mt-1 flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-[#083344] px-4 py-3 font-black shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none ${
                      isExpress ? "bg-[#BE1622] text-white" : "bg-[#083344] text-white"
                    }`}
                  >
                    {isExpress ? (
                      <Zap className="size-4 shrink-0 fill-white" strokeWidth={2.5} aria-hidden="true" />
                    ) : (
                      <Users className="size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                    )}
                    <span className="text-center text-sm sm:text-base">{opportunity.action}</span>
                  </button>
                </article>
              )
            })}
          </section>
        </div>
      </div>
    </main>
  )
}
