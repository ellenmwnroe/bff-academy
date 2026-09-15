"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  Video,
  Clock,
  Users,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react"

const teacherName = "Marina"

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

type LessonStatus = "past" | "next" | "upcoming"

type ScheduledLesson = {
  readonly id: string
  readonly time: string
  readonly title: string
  readonly detail: string
  readonly status: LessonStatus
}

type Student = {
  readonly id: string
  readonly name: string
  readonly group: string
  readonly streak: number
}

type DayPlan = {
  readonly lessons: ReadonlyArray<ScheduledLesson>
  readonly students: ReadonlyArray<Student>
}

const today = new Date()

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${month}-${day}`
}

function dateFromOffset(dayOffset: number) {
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset)
}

function keyFromOffset(dayOffset: number) {
  const date = dateFromOffset(dayOffset)
  return toDateKey(date.getFullYear(), date.getMonth(), date.getDate())
}

const mockDays: Record<string, DayPlan> = {
  [keyFromOffset(0)]: {
    lessons: [
      {
        id: "today-1",
        time: "14:00",
        title: "Aula Particular",
        detail: "James Carter · Pronúncia",
        status: "past",
      },
      {
        id: "today-2",
        time: "15:00",
        title: "Turma Flex 2",
        detail: "Job Interviews · 8 alunos",
        status: "next",
      },
      {
        id: "today-3",
        time: "18:00",
        title: "Turma Flex 3",
        detail: "Past Simple vs Present Perfect",
        status: "upcoming",
      },
    ],
    students: [
      { id: "1", name: "Emma Thompson", group: "Flex 2", streak: 12 },
      { id: "2", name: "Liam Brooks", group: "Flex 2", streak: 7 },
      { id: "3", name: "Sofia Almeida", group: "Flex 2", streak: 21 },
      { id: "4", name: "Noah Patel", group: "Particular", streak: 4 },
      { id: "5", name: "Olivia Chen", group: "Flex 3", streak: 9 },
    ],
  },
  [keyFromOffset(2)]: {
    lessons: [
      {
        id: "soon-1",
        time: "09:00",
        title: "Turma Flex 1",
        detail: "Daily Routine · 6 alunos",
        status: "upcoming",
      },
      {
        id: "soon-2",
        time: "16:00",
        title: "Aula Particular",
        detail: "Emma Thompson · Speaking",
        status: "upcoming",
      },
    ],
    students: [
      { id: "6", name: "Emma Thompson", group: "Particular", streak: 12 },
      { id: "7", name: "Henry Cole", group: "Flex 1", streak: 3 },
      { id: "8", name: "Mia Santos", group: "Flex 1", streak: 8 },
    ],
  },
  [keyFromOffset(5)]: {
    lessons: [
      {
        id: "later-1",
        time: "10:00",
        title: "Turma Flex 4",
        detail: "Conditionals · 7 alunos",
        status: "upcoming",
      },
    ],
    students: [
      { id: "9", name: "Oliver Wright", group: "Flex 4", streak: 15 },
      { id: "10", name: "Ava Johnson", group: "Flex 4", streak: 6 },
    ],
  },
}

const CLASS_FILTERS = [
  "Todas",
  "Flex 1",
  "Flex 2",
  "Flex 3",
  "Flex 4",
  "Particular",
] as const

type ClassFilter = (typeof CLASS_FILTERS)[number]

const emptyDay: DayPlan = { lessons: [], students: [] }

function groupFromLesson(title: string): ClassFilter {
  if (title.includes("Flex 1")) return "Flex 1"
  if (title.includes("Flex 2")) return "Flex 2"
  if (title.includes("Flex 3")) return "Flex 3"
  if (title.includes("Flex 4")) return "Flex 4"
  return "Particular"
}

const nextClass = {
  timeLabel: "Hoje às 15:00",
  group: "Flex 2 - Intermediate",
  topic: "Speaking: Job Interviews",
}

export default function TeacherDashboardPage() {
  const [visibleMonth, setVisibleMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [classFilter, setClassFilter] = useState<ClassFilter>("Todas")
  const studentsSectionRef = useRef<HTMLElement>(null)

  const { leadingBlanks, daysInMonth } = useMemo(() => {
    const firstWeekday = new Date(visibleMonth.year, visibleMonth.month, 1).getDay()
    const totalDays = new Date(visibleMonth.year, visibleMonth.month + 1, 0).getDate()

    return {
      leadingBlanks: Array.from({ length: firstWeekday }, (_, index) => index),
      daysInMonth: Array.from({ length: totalDays }, (_, index) => index + 1),
    }
  }, [visibleMonth])

  const selectedKey = toDateKey(visibleMonth.year, visibleMonth.month, selectedDay)
  const selectedPlan = mockDays[selectedKey] ?? emptyDay
  const visibleStudents =
    classFilter === "Todas"
      ? selectedPlan.students
      : selectedPlan.students.filter((student) => student.group === classFilter)

  const showStudentsForClass = (lessonTitle: string) => {
    setClassFilter(groupFromLesson(lessonTitle))
    studentsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const goToMonth = (offset: number) => {
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.month + offset, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
    setSelectedDay(1)
  }

  const isToday = (day: number) =>
    visibleMonth.year === today.getFullYear() &&
    visibleMonth.month === today.getMonth() &&
    day === today.getDate()

  const hasLessons = (day: number) => {
    const key = toDateKey(visibleMonth.year, visibleMonth.month, day)
    return Boolean(mockDays[key]?.lessons.length)
  }

  const selectedDateLabel = `${selectedDay} de ${MONTH_NAMES[visibleMonth.month]}`

  return (
    <main className="min-h-screen bg-varden p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-cosmos/60">
              Olá, Teacher {teacherName}
            </p>
            <h1 className="text-2xl font-black text-cosmos sm:text-3xl">
              Seu Painel de Controle
            </h1>
          </div>

          <article className="flex w-full items-center gap-3 rounded-2xl border-[3px] border-cosmos bg-white px-4 py-3 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:w-auto">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-cosmos bg-marble">
              <Clock className="size-5 text-white" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-cosmos/60">
                Minhas Horas
              </p>
              <p className="text-lg font-black leading-tight text-cosmos">12h dadas</p>
            </div>
          </article>
        </header>

        <section
          aria-labelledby="next-class-title"
          className="flex flex-col gap-5 rounded-2xl border-[3px] border-crimson bg-varden p-5 shadow-[4px_4px_0_0_var(--color-crimson)] sm:p-6"
        >
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border-2 border-cosmos bg-crimson px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              {nextClass.timeLabel}
            </span>
            <div>
              <p className="text-sm font-bold text-cosmos/70">{nextClass.group}</p>
              <h2
                id="next-class-title"
                className="text-2xl font-black text-cosmos text-balance sm:text-3xl"
              >
                {nextClass.topic}
              </h2>
            </div>
          </div>

          <Link
            href="/live"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-cosmos bg-crimson px-6 py-4 text-base font-black text-white shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none sm:w-auto sm:self-start sm:text-lg"
          >
            <Video className="size-6 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            Iniciar Transmissão
          </Link>
        </section>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start">
        <section
          aria-labelledby="calendar-title"
          className="rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-5 lg:col-span-4"
        >
          <header className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-cosmos transition-all hover:bg-cosmos/10 active:scale-95"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </button>

            <h2
              id="calendar-title"
              className="flex min-w-0 items-center gap-2 text-center text-base font-black text-cosmos sm:text-xl"
            >
              <CalendarDays className="hidden size-5 shrink-0 sm:block" strokeWidth={2.5} aria-hidden="true" />
              <span className="truncate">
                {MONTH_NAMES[visibleMonth.month]} {visibleMonth.year}
              </span>
            </h2>

            <button
              type="button"
              onClick={() => goToMonth(1)}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-cosmos transition-all hover:bg-cosmos/10 active:scale-95"
              aria-label="Próximo mês"
            >
              <ChevronRight className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </header>

          <div className="mb-3 flex justify-end">
            <Link
              href="/teacher/schedule"
              className="text-xs font-black text-cosmos underline decoration-2 underline-offset-2"
            >
              Ver disponibilidade
            </Link>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEKDAY_INITIALS.map((initial, index) => (
              <span
                key={`${initial}-${index}`}
                className="py-1 text-center text-[10px] font-bold text-cosmos/50 sm:text-xs"
              >
                {initial}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {leadingBlanks.map((blank) => (
              <span key={`blank-${blank}`} aria-hidden="true" />
            ))}

            {daysInMonth.map((day) => {
              const dayIsSelected = day === selectedDay
              const dayHasLessons = hasLessons(day)
              const dayIsToday = isToday(day)

              let dotColor = "bg-marble"
              if (dayIsSelected) {
                dotColor = "bg-white"
              } else if (dayIsToday) {
                dotColor = "bg-crimson"
              }

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  aria-pressed={dayIsSelected}
                  aria-label={`Dia ${day}${dayHasLessons ? ", com aula marcada" : ""}`}
                  className={`relative flex h-8 items-center justify-center rounded-md text-xs font-bold transition-all hover:bg-cosmos/10 active:scale-95 sm:h-9 ${
                    dayIsSelected ? "bg-cosmos font-bold text-white" : "text-cosmos"
                  }`}
                >
                  {day}
                  {dayHasLessons && (
                    <span
                      className={`absolute bottom-0.5 size-1 rounded-full sm:bottom-1 sm:size-1.5 ${dotColor}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <section
            aria-labelledby="day-agenda-title"
            className="rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-6"
          >
            <header className="mb-4 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-cosmos bg-varden">
                <Clock className="size-5 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h2 id="day-agenda-title" className="text-lg font-black text-cosmos sm:text-xl">
                Aulas de {selectedDateLabel}
              </h2>
            </header>

            {selectedPlan.lessons.length === 0 ? (
              <div className="rounded-xl border-[3px] border-dashed border-cosmos/30 p-6 text-center">
                <p className="text-sm font-bold text-cosmos/60">
                  Nenhuma aula marcada para este dia.
                </p>
              </div>
            ) : (
              <ol className="flex flex-col gap-3">
                {selectedPlan.lessons.map((lesson) => {
                  const isNext = lesson.status === "next"

                  return (
                    <li
                      key={lesson.id}
                      className={`flex flex-col gap-3 rounded-2xl border-[3px] p-4 ${
                        isNext
                          ? "border-cosmos bg-cosmos text-white"
                          : "border-cosmos bg-varden text-cosmos"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-14 shrink-0 text-center font-black ${
                            isNext ? "text-marble" : "text-cosmos"
                          }`}
                        >
                          {lesson.time}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="font-black">{lesson.title}</p>
                          <p
                            className={`text-sm font-medium wrap-break-word ${
                              isNext ? "text-white/70" : "text-cosmos/60"
                            }`}
                          >
                            {lesson.detail}
                          </p>
                        </div>

                        {lesson.status === "past" && (
                          <span className="shrink-0 rounded-full border-2 border-marble bg-marble/15 px-2.5 py-0.5 text-xs font-bold text-marble">
                            Feita
                          </span>
                        )}
                        {isNext && (
                          <span className="shrink-0 rounded-full border-2 border-white bg-crimson px-2.5 py-0.5 text-xs font-bold text-white">
                            Agora
                          </span>
                        )}
                      </div>

                      {lesson.status === "past" ? (
                        <Link
                          href="/teacher/evaluation"
                          className="flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-cosmos bg-cosmos px-4 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none"
                        >
                          <BookOpen className="size-4" strokeWidth={2.5} aria-hidden="true" />
                          Revisar Diário
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => showStudentsForClass(lesson.title)}
                          className={`flex w-full items-center justify-center gap-2 rounded-xl border-[3px] px-4 py-2.5 text-sm font-black shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none ${
                            isNext
                              ? "border-white bg-white text-cosmos"
                              : "border-cosmos bg-white text-cosmos"
                          }`}
                        >
                          <Users className="size-4" strokeWidth={2.5} aria-hidden="true" />
                          Ver Alunos
                        </button>
                      )}
                    </li>
                  )
                })}
              </ol>
            )}
          </section>

          <section
            ref={studentsSectionRef}
            aria-labelledby="students-title"
            className="flex flex-col rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-6"
          >
            <header className="mb-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-cosmos bg-varden">
                    <Users className="size-5 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <h2 id="students-title" className="text-lg font-black text-cosmos sm:text-xl">
                    Alunos
                  </h2>
                </div>

                <span className="shrink-0 rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-bold text-cosmos">
                  {visibleStudents.length}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {CLASS_FILTERS.map((filter) => {
                  const isActive = classFilter === filter

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setClassFilter(filter)}
                      aria-pressed={isActive}
                      className={`shrink-0 rounded-full border-2 border-cosmos px-3 py-1.5 text-xs font-black transition-all active:scale-95 ${
                        isActive
                          ? "bg-cosmos text-white"
                          : "bg-varden text-cosmos"
                      }`}
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>
            </header>

            {visibleStudents.length === 0 ? (
              <div className="rounded-xl border-[3px] border-dashed border-cosmos/30 p-6 text-center">
                <p className="text-sm font-bold text-cosmos/60">
                  Nenhum aluno nesta turma para o dia selecionado.
                </p>
              </div>
            ) : (
              <ul className="mb-4 flex flex-col gap-2">
                {visibleStudents.map((student) => (
                  <li key={student.id}>
                    <Link
                      href={`/teacher/student/${student.id}`}
                      className="flex items-center gap-3 rounded-xl border-[3px] border-cosmos bg-varden p-3 shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all hover:-translate-y-0.5 hover:shadow-[2px_3px_0_0_var(--color-cosmos)] active:translate-y-0.5 active:shadow-none"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-cosmos bg-white text-xs font-black text-cosmos">
                        {student.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-cosmos">{student.name}</p>
                        <p className="text-xs font-medium text-cosmos/60">{student.group}</p>
                      </div>

                      <span className="flex shrink-0 items-center gap-1 text-xs font-black text-cosmos">
                        <Flame
                          className="size-3.5 fill-crimson text-crimson"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {student.streak}d
                      </span>

                      <ChevronRight
                        className="size-5 shrink-0 text-cosmos/50"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/teacher/evaluation"
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-cosmos bg-cosmos px-4 py-3.5 font-black text-white shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none"
            >
              <BookOpen className="size-5" strokeWidth={2.5} aria-hidden="true" />
              Revisar Diário de Classe
            </Link>
          </section>
        </div>
        </div>
      </div>
    </main>
  )
}
