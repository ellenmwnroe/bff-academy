"use client"

import Link from "next/link"
import {
  Video,
  Clock,
  Users,
  BookOpen,
  Zap,
  User,
  CalendarDays,
} from "lucide-react"

const teacherName = "Marina"

const hoursThisFortnight = {
  given: 18,
  planned: 24,
}

const nextClass = {
  timeLabel: "Hoje às 15:00",
  group: "Flex 2 - Intermediate",
  topic: "Speaking: Job Interviews",
  duration: "50 min",
}

const todaySchedule = [
  {
    id: "1",
    time: "14:00",
    title: "Aula Particular",
    detail: "James Carter · Pronúncia",
    status: "done",
  },
  {
    id: "2",
    time: "15:00",
    title: "Turma Flex 2",
    detail: "Job Interviews · 8 alunos",
    status: "next",
  },
  {
    id: "3",
    time: "18:00",
    title: "Turma Flex 3",
    detail: "Past Simple vs Present Perfect",
    status: "upcoming",
  },
] as const

const todayStudents = [
  { id: "1", name: "Emma Thompson", group: "Flex 2", streak: 12 },
  { id: "2", name: "Liam Brooks", group: "Flex 2", streak: 7 },
  { id: "3", name: "Sofia Almeida", group: "Flex 2", streak: 21 },
  { id: "4", name: "Noah Patel", group: "Particular", streak: 4 },
  { id: "5", name: "Olivia Chen", group: "Flex 3", streak: 9 },
]

export default function TeacherDashboardPage() {
  return (
    <main className="min-h-screen bg-[#FDF6E3] p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {/* Cabeçalho */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#083344]/60">
              Olá, Teacher {teacherName}
            </p>
            <h1 className="text-3xl font-black text-[#083344]">
              Seu Painel de Controle
            </h1>
          </div>

          <article className="flex items-center gap-3 rounded-2xl border-[3px] border-[#083344] bg-white px-4 py-3 shadow-[4px_4px_0_0_#083344]">
            <span className="grid size-11 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#F59E0B]">
              <Clock className="size-5 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#083344]/60">
                Minhas Horas
              </p>
              <p className="text-lg font-black leading-tight text-[#083344]">
                {hoursThisFortnight.given}/{hoursThisFortnight.planned}
              </p>
              <p className="text-xs font-medium text-[#083344]/60">nesta quinzena</p>
            </div>
          </article>
        </header>

        {/* Hero: próxima aula */}
        <section
          aria-labelledby="next-class-title"
          className="flex flex-col gap-5 rounded-3xl border-[3px] border-[#083344] bg-[#083344] p-6 text-white shadow-[6px_6px_0_0_#BE1622] md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border-2 border-white bg-[#BE1622] px-3 py-1 text-xs font-black uppercase tracking-wide">
              {nextClass.timeLabel}
            </span>

            <div>
              <p className="text-sm font-bold text-white/70">{nextClass.group}</p>
              <h2 id="next-class-title" className="text-3xl font-black text-balance">
                {nextClass.topic}
              </h2>
              <p className="mt-1 text-sm font-medium text-white/70">
                Duração estimada: {nextClass.duration}
              </p>
            </div>
          </div>

          <Link
            href="/live"
            className="flex items-center justify-center gap-2 rounded-2xl border-[3px] border-white bg-[#BE1622] px-6 py-4 text-lg font-black text-white shadow-[4px_4px_0_0_#000] transition-all active:translate-y-1 active:shadow-none"
          >
            <Video className="size-6" strokeWidth={2.5} aria-hidden="true" />
            Iniciar Transmissão
          </Link>
        </section>

        {/* Gavetas inferiores */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Agenda */}
          <section
            aria-labelledby="agenda-title"
            className="rounded-3xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]"
          >
            <header className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#FDF6E3]">
                <CalendarDays
                  className="size-5 text-[#083344]"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <h2 id="agenda-title" className="text-xl font-black text-[#083344]">
                Minha Agenda
              </h2>
            </header>

            <ol className="flex flex-col gap-3">
              {todaySchedule.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center gap-4 rounded-2xl border-[3px] p-4 ${
                    item.status === "next"
                      ? "border-[#083344] bg-[#083344] text-white"
                      : "border-[#083344] bg-[#FDF6E3] text-[#083344]"
                  }`}
                >
                  <span
                    className={`w-16 shrink-0 text-center font-black ${
                      item.status === "next" ? "text-[#F59E0B]" : "text-[#083344]"
                    }`}
                  >
                    {item.time}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-black">{item.title}</p>
                    <p
                      className={`truncate text-sm font-medium ${
                        item.status === "next" ? "text-white/70" : "text-[#083344]/60"
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>

                  {item.status === "done" && (
                    <span className="rounded-full border-2 border-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 text-xs font-bold text-[#10B981]">
                      Feita
                    </span>
                  )}
                  {item.status === "next" && (
                    <span className="rounded-full border-2 border-white bg-[#BE1622] px-2.5 py-0.5 text-xs font-bold text-white">
                      Agora
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Alunos de hoje */}
          <section
            aria-labelledby="students-title"
            className="flex flex-col rounded-3xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]"
          >
            <header className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#FDF6E3]">
                  <Users className="size-5 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h2 id="students-title" className="text-xl font-black text-[#083344]">
                  Alunos de Hoje
                </h2>
              </div>

              <span className="rounded-full border-2 border-[#083344] bg-[#FDF6E3] px-3 py-1 text-xs font-bold text-[#083344]">
                {todayStudents.length} alunos
              </span>
            </header>

            <ul className="mb-4 flex flex-col gap-2">
              {todayStudents.map((student) => (
                <li
                  key={student.id}
                  className="flex items-center gap-3 rounded-xl border-2 border-[#083344] bg-[#FDF6E3] p-3"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#083344] bg-white">
                    <User className="size-4 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-[#083344]">{student.name}</p>
                    <p className="text-xs font-medium text-[#083344]/60">{student.group}</p>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-black text-[#083344]">
                    <Zap
                      className="size-3.5 fill-[#F59E0B] text-[#F59E0B]"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {student.streak}d
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/teacher/grades"
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-[#083344] bg-[#083344] px-4 py-3.5 font-black text-white shadow-[4px_4px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none"
            >
              <BookOpen className="size-5" strokeWidth={2.5} aria-hidden="true" />
              Lançar Notas/XP
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}
