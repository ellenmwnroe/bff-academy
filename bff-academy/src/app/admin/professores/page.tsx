"use client"

import { Plus, User, Star, CalendarDays } from "lucide-react"

type Teacher = {
  readonly id: string
  readonly name: string
  readonly specialty: string
  readonly rating: number
  readonly weeklyClasses: number
}

const teachers: ReadonlyArray<Teacher> = [
  {
    id: "1",
    name: "Prof. Marina",
    specialty: "Conversação, Flex 4 e 5",
    rating: 4.9,
    weeklyClasses: 12,
  },
  {
    id: "2",
    name: "Prof. Lucas",
    specialty: "Gramática, Flex 1 e 2",
    rating: 4.7,
    weeklyClasses: 16,
  },
  {
    id: "3",
    name: "Prof. Kate",
    specialty: "Pronúncia e Speaking, Flex 3",
    rating: 5.0,
    weeklyClasses: 9,
  },
]

export default function AdminTeachersPage() {
  return (
    <>
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-[#083344]">Corpo Docente</h1>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
        >
          <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Novo Professor
        </button>
      </header>

      {/* Grid de professores */}
      <section aria-label="Professores" className="grid grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <article
            key={teacher.id}
            className="flex flex-col items-center gap-3 rounded-2xl border-[3px] border-[#083344] bg-white p-6 text-center shadow-[4px_4px_0_0_#083344]"
          >
            {/* Avatar */}
            <div className="grid size-20 place-items-center rounded-full border-[3px] border-[#083344] bg-[#FDF6E3]">
              <User className="size-10 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
            </div>

            {/* Identificação */}
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-black text-[#083344]">{teacher.name}</h2>
              <p className="text-sm font-medium text-[#083344]/70 text-balance">
                {teacher.specialty}
              </p>
            </div>

            {/* Avaliação */}
            <span className="flex items-center gap-1.5 rounded-full border-2 border-[#083344] bg-[#FDD835] px-3 py-1 text-sm font-black text-[#083344]">
              <Star
                className="size-4 fill-[#083344] text-[#083344]"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {teacher.rating.toFixed(1)}
            </span>

            {/* Rodapé */}
            <div className="mt-auto flex w-full flex-col gap-3 pt-4">
              <p className="text-sm font-bold text-[#083344]/70">
                {teacher.weeklyClasses} aulas nesta semana
              </p>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#083344] bg-white px-4 py-2.5 text-sm font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
              >
                <CalendarDays className="size-4" strokeWidth={2.5} aria-hidden="true" />
                Ver Agenda
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
