"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, Ticket, CalendarX } from "lucide-react"
import { BottomNav } from "../../components/bottom-nav"
import { CancelClassModal } from "../../components/cancel-class-modal"
import { RescheduleClassModal } from "../../components/reschedule-class-modal"
import {
  fetchMakeupSlots,
  formatSlotTimeRange,
  type MakeupSlot,
} from "../../lib/makeup-slots"

type ScheduledClass = {
  readonly id: string
  readonly timeRange: string
  readonly title: string
  readonly teacher: string
  readonly hoursUntilClass: number
}

type ClassesByDate = Record<string, ReadonlyArray<ScheduledClass>>

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

const today = new Date()

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${month}-${day}`
}

/** Normaliza o transbordo de mês (ex.: dia 30 + 5) usando o próprio Date. */
function dateFromOffset(dayOffset: number) {
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset)
}

function keyFromOffset(dayOffset: number) {
  const date = dateFromOffset(dayOffset)
  return toDateKey(date.getFullYear(), date.getMonth(), date.getDate())
}

/** Aulas ancoradas no dia de hoje para o mock sempre abrir preenchido. */
const initialClasses: ClassesByDate = {
  [keyFromOffset(0)]: [
    {
      id: "1",
      timeRange: "19:00 - 20:00",
      title: "Speaking Club",
      teacher: "Prof. Marina",
      hoursUntilClass: 3,
    },
    {
      id: "2",
      timeRange: "20:30 - 21:30",
      title: "Grammar Fix",
      teacher: "Prof. Lucas",
      hoursUntilClass: 6,
    },
  ],
  [keyFromOffset(2)]: [
    {
      id: "3",
      timeRange: "09:00 - 10:00",
      title: "Pronúncia: TH Sounds",
      teacher: "Prof. Kate",
      hoursUntilClass: 48,
    },
  ],
  [keyFromOffset(5)]: [
    {
      id: "4",
      timeRange: "15:00 - 16:00",
      title: "Conversation Practice",
      teacher: "Prof. John",
      hoursUntilClass: 120,
    },
  ],
}

export default function CalendarPage() {
  const [visibleMonth, setVisibleMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [classesByDate, setClassesByDate] = useState<ClassesByDate>(initialClasses)
  const [tickets, setTickets] = useState(1)
  const [classToCancel, setClassToCancel] = useState<ScheduledClass | null>(null)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [slots, setSlots] = useState<ReadonlyArray<MakeupSlot>>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  useEffect(() => {
    if (!isRescheduleOpen) return

    let isCurrent = true
    setIsLoadingSlots(true)

    fetchMakeupSlots()
      .then((availableSlots) => {
        if (isCurrent) setSlots(availableSlots)
      })
      .finally(() => {
        if (isCurrent) setIsLoadingSlots(false)
      })

    return () => {
      isCurrent = false
    }
  }, [isRescheduleOpen])

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

  const hasClasses = (day: number) => {
    const dayClasses = classesByDate[toDateKey(visibleMonth.year, visibleMonth.month, day)]
    return Boolean(dayClasses && dayClasses.length > 0)
  }

  const selectedDayKey = toDateKey(visibleMonth.year, visibleMonth.month, selectedDay)
  const selectedClasses = classesByDate[selectedDayKey] ?? []

  const confirmCancel = () => {
    if (!classToCancel) return

    setClassesByDate((current) => ({
      ...current,
      [selectedDayKey]: (current[selectedDayKey] ?? []).filter(
        (item) => item.id !== classToCancel.id,
      ),
    }))

    if (classToCancel.hoursUntilClass >= 5) {
      setTickets((current) => current + 1)
    }

    setClassToCancel(null)
  }

  const confirmReschedule = (slotId: string) => {
    const slot = slots.find((item) => item.id === slotId)
    if (!slot) return

    const slotDate = new Date(slot.startsAt)
    const slotKey = toDateKey(
      slotDate.getFullYear(),
      slotDate.getMonth(),
      slotDate.getDate(),
    )
    const hoursUntilClass = Math.round(
      (slotDate.getTime() - Date.now()) / (1000 * 60 * 60),
    )

    setClassesByDate((current) => ({
      ...current,
      [slotKey]: [
        ...(current[slotKey] ?? []),
        {
          id: `makeup-${slot.id}-${Date.now()}`,
          timeRange: formatSlotTimeRange(slot),
          title: slot.title,
          teacher: slot.teacherName,
          hoursUntilClass,
        },
      ],
    }))

    setTickets((current) => current - 1)
    setVisibleMonth({ year: slotDate.getFullYear(), month: slotDate.getMonth() })
    setSelectedDay(slotDate.getDate())
    setIsRescheduleOpen(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#FDF6E3] px-4 pb-28 pt-8">
      <h1 className="mb-6 text-2xl font-black text-[#083344]">Minha Agenda</h1>

      {/* Saldo de tickets */}
      <section className="mb-4 flex items-center gap-3 rounded-2xl border-[3px] border-[#083344] bg-white p-4 shadow-[4px_4px_0_0_#083344]">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#FDD835]">
          <Ticket className="size-5 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-lg font-black leading-tight text-[#083344]">
            {tickets} {tickets === 1 ? "Ticket" : "Tickets"}
          </p>
          <p className="text-xs font-bold text-[#083344]/60">De reposição disponíveis</p>
        </div>

        <button
          type="button"
          onClick={() => setIsRescheduleOpen(true)}
          className="shrink-0 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-sm font-bold text-white transition-all active:scale-95"
        >
          Agendar reposição
        </button>
      </section>

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
                <Link
                  href="/live"
                  className="flex-1 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-center text-sm font-bold text-white transition-all active:scale-95"
                >
                  Entrar na Aula
                </Link>

                <button
                  type="button"
                  onClick={() => setClassToCancel(scheduledClass)}
                  className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#083344] bg-white px-4 py-2.5 text-sm font-bold text-[#BE1622] transition-all active:scale-95"
                >
                  <CalendarX className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  Cancelar
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <CancelClassModal
        isOpen={classToCancel !== null}
        lessonTitle={classToCancel?.title}
        lessonTime={classToCancel?.timeRange}
        hoursUntilClass={classToCancel?.hoursUntilClass}
        onClose={() => setClassToCancel(null)}
        onConfirm={confirmCancel}
      />

      <RescheduleClassModal
        isOpen={isRescheduleOpen}
        ticketsAvailable={tickets}
        slots={slots}
        isLoadingSlots={isLoadingSlots}
        onClose={() => setIsRescheduleOpen(false)}
        onConfirm={confirmReschedule}
      />

      <BottomNav />
    </main>
  )
}
