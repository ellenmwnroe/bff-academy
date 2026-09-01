"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Ticket } from "lucide-react"
import { BottomNav } from "../../components/bottom-nav"

type ScheduledClass = {
  readonly id: string
  readonly timeRange: string
  readonly title: string
  readonly teacher: string
}

const WEEKDAY_INITIALS = ["D", "S", "T", "Q", "Q", "S", "S"]

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${month}-${day}`
}

const today = new Date()

/**
 * Aulas ancoradas no mês atual para o mock sempre aparecer preenchido,
 * independente de quando a página for aberta.
 */
const mockClasses: Record<string, ReadonlyArray<ScheduledClass>> = {
  [toDateKey(today.getFullYear(), today.getMonth(), today.getDate())]: [
    {
      id: "1",
      timeRange: "19:00 - 20:00",
      title: "Speaking Club",
      teacher: "Prof. Marina",
    },
    {
      id: "2",
      timeRange: "20:30 - 21:30",
      title: "Grammar Fix",
      teacher: "Prof. Lucas",
    },
  ],
  [toDateKey(today.getFullYear(), today.getMonth(), today.getDate() + 2)]: [
    {
      id: "3",
      timeRange: "09:00 - 10:00",
      title: "Pronúncia: TH Sounds",
      teacher: "Prof. Kate",
    },
  ],
  [toDateKey(today.getFullYear(), today.getMonth(), today.getDate() + 5)]: [
    {
      id: "4",
      timeRange: "15:00 - 16:00",
      title: "Conversation Practice",
      teacher: "Prof. John",
    },
  ],
}

export default function CalendarPage() {
  const [visibleMonth, setVisibleMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  const { leadingBlanks, daysInMonth } = useMemo(() => {
    const firstWeekday = new Date(visibleMonth.year, visibleMonth.month, 1).getDay()
    const totalDays = new Date(visibleMonth.year, visibleMonth.month + 1, 0).getDate()

    return {
      leadingBlanks: Array.from({ length: firstWeekday }, (_, index) => index),
      daysInMonth: Array.from({ length: totalDays }, (_, index) => index + 1),
    }
  }, [visibleMonth])

  const goToMonth = (offset: number) => {
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.month + offset, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  const isToday = (day: number) =>
    visibleMonth.year === today.getFullYear() &&
    visibleMonth.month === today.getMonth() &&
    day === today.getDate()

  const hasClasses = (day: number) =>
    Boolean(mockClasses[toDateKey(visibleMonth.year, visibleMonth.month, day)])

  const selectedClasses =
    mockClasses[toDateKey(visibleMonth.year, visibleMonth.month, selectedDay)] ?? []

  return (
    <main className="flex min-h-screen flex-col bg-[#FDF6E3] px-4 pb-28 pt-8">
      <h1 className="mb-6 text-2xl font-black text-[#083344]">Minha Agenda</h1>

      {/* Calendário */}
      <section className="rounded-3xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]">
        {/* Navegação do mês */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            className="grid size-9 place-items-center rounded-lg text-[#083344] transition-all hover:bg-[#083344]/10 active:scale-95"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>

          <p className="font-bold text-[#083344]">
            {MONTH_NAMES[visibleMonth.month]} {visibleMonth.year}
          </p>

          <button
            type="button"
            onClick={() => goToMonth(1)}
            className="grid size-9 place-items-center rounded-lg text-[#083344] transition-all hover:bg-[#083344]/10 active:scale-95"
            aria-label="Próximo mês"
          >
            <ChevronRight className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {/* Iniciais dos dias da semana */}
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAY_INITIALS.map((initial, index) => (
            <span
              key={`${initial}-${index}`}
              className="py-1 text-center text-xs font-bold text-[#083344]/50"
            >
              {initial}
            </span>
          ))}
        </div>

        {/* Grade de dias */}
        <div className="mt-1 grid grid-cols-7 gap-1">
          {leadingBlanks.map((blank) => (
            <span key={`blank-${blank}`} aria-hidden="true" />
          ))}

          {daysInMonth.map((day) => {
            const dayIsToday = isToday(day)
            const dayIsSelected = day === selectedDay
            const dayHasClasses = hasClasses(day)

            let dayStyles = "border-2 border-transparent text-[#083344]"
            if (dayIsToday) {
              dayStyles = "bg-[#BE1622] font-bold text-white border-2 border-transparent"
            }
            if (dayIsSelected && !dayIsToday) {
              dayStyles = "border-2 border-[#083344] font-bold text-[#083344]"
            }
            if (dayIsSelected && dayIsToday) {
              dayStyles = "bg-[#BE1622] font-bold text-white border-2 border-[#083344]"
            }

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                aria-pressed={dayIsSelected}
                aria-label={`Dia ${day}${dayHasClasses ? ", com aula agendada" : ""}`}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-all hover:bg-[#083344]/10 active:scale-95 ${dayStyles}`}
              >
                {day}
                {dayHasClasses && (
                  <span
                    className={`absolute bottom-1 size-1.5 rounded-full ${
                      dayIsToday ? "bg-white" : "bg-[#083344]"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Aulas do dia */}
      <section aria-labelledby="scheduled-classes-title">
        <h2
          id="scheduled-classes-title"
          className="mb-3 mt-6 text-lg font-bold text-[#083344]"
        >
          Aulas Programadas
        </h2>

        {selectedClasses.length === 0 ? (
          <div className="rounded-xl border-[3px] border-dashed border-[#083344]/30 p-6 text-center">
            <p className="text-sm font-bold text-[#083344]/60">
              Nenhuma aula agendada para o dia {selectedDay}.
            </p>
          </div>
        ) : (
          selectedClasses.map((scheduledClass) => (
            <article
              key={scheduledClass.id}
              className="mb-4 rounded-xl border-[3px] border-[#083344] bg-white p-4 shadow-[3px_3px_0_0_#083344]"
            >
              <span className="flex w-fit items-center gap-1.5 rounded-full border-2 border-[#083344] px-3 py-1 text-xs font-bold text-[#083344]">
                <Clock className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                {scheduledClass.timeRange}
              </span>

              <div className="mt-3 flex flex-col gap-0.5">
                <h3 className="text-lg font-bold text-[#083344]">{scheduledClass.title}</h3>
                <p className="text-sm font-medium text-[#083344]/60">
                  {scheduledClass.teacher}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-sm font-bold text-white transition-all active:scale-95"
                >
                  Entrar na Aula
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#083344] bg-white px-4 py-2.5 text-sm font-bold text-[#BE1622] transition-all active:scale-95"
                >
                  <Ticket className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  Remarcar
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <BottomNav />
    </main>
  )
}
