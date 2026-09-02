"use client"

import { useState } from "react"
import { Search, UserPlus, Flame, Pencil, Eye } from "lucide-react"

type Student = {
  readonly id: string
  readonly name: string
  readonly level: string
  readonly streak: number
  readonly attendance: number
  readonly status: "active" | "risk"
}

const students: ReadonlyArray<Student> = [
  {
    id: "1",
    name: "Ana Beatriz Rocha",
    level: "Flex 2",
    streak: 18,
    attendance: 96,
    status: "active",
  },
  {
    id: "2",
    name: "Bruno Almeida",
    level: "Flex 4",
    streak: 0,
    attendance: 54,
    status: "risk",
  },
  {
    id: "3",
    name: "Carla Souza",
    level: "Flex 1",
    streak: 7,
    attendance: 88,
    status: "active",
  },
]

const levelFilters = [
  "Todos os níveis",
  "Flex 1",
  "Flex 2",
  "Flex 3",
  "Flex 4",
  "Flex 5",
]

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("")
  const [levelFilter, setLevelFilter] = useState(levelFilters[0])

  const visibleStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(search.trim().toLowerCase())
    const matchesLevel = levelFilter === levelFilters[0] || student.level === levelFilter
    return matchesSearch && matchesLevel
  })

  return (
    <>
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-[#083344]">Gestão de Alunos</h1>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
        >
          <UserPlus className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Matricular Aluno
        </button>
      </header>

      {/* Busca e filtro */}
      <section className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-64 flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#083344]/50"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar aluno pelo nome..."
            aria-label="Buscar aluno pelo nome"
            className="w-full rounded-xl border-[3px] border-[#083344] bg-white py-3 pl-12 pr-4 font-medium text-[#083344] shadow-[3px_3px_0_0_#083344] outline-none placeholder:text-[#083344]/40 focus:border-[#BE1622]"
          />
        </div>

        <label className="flex items-center gap-2 rounded-xl border-[3px] border-[#083344] bg-white px-4 py-3 shadow-[3px_3px_0_0_#083344]">
          <span className="text-sm font-bold text-[#083344]">Filtrar por nível:</span>
          <select
            value={levelFilter}
            onChange={(event) => setLevelFilter(event.target.value)}
            className="cursor-pointer bg-transparent font-bold text-[#083344] outline-none"
          >
            {levelFilters.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
      </section>

      {/* Tabela */}
      <section className="rounded-2xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#083344]">
              <th className="pb-3 text-sm font-black text-[#083344]">Nome do Aluno</th>
              <th className="pb-3 text-sm font-black text-[#083344]">Nível</th>
              <th className="pb-3 text-sm font-black text-[#083344]">Ofensiva</th>
              <th className="pb-3 text-sm font-black text-[#083344]">Presença</th>
              <th className="pb-3 text-sm font-black text-[#083344]">Status</th>
              <th className="pb-3 text-right text-sm font-black text-[#083344]">Ações</th>
            </tr>
          </thead>

          <tbody>
            {visibleStudents.map((student) => (
              <tr key={student.id} className="border-b-2 border-[#083344]/10">
                <td className="py-4 font-bold text-[#083344]">{student.name}</td>

                <td className="py-4">
                  <span className="rounded-full border-2 border-[#083344] bg-[#FDF6E3] px-2.5 py-0.5 text-xs font-bold text-[#083344]">
                    {student.level}
                  </span>
                </td>

                <td className="py-4">
                  <span className="flex items-center gap-1.5 font-bold text-[#083344]">
                    <Flame
                      className={`size-4 ${
                        student.streak === 0 ? "text-[#BE1622]" : "text-[#083344]/60"
                      }`}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {student.streak}
                  </span>
                </td>

                <td className="py-4 font-bold text-[#083344]">{student.attendance}%</td>

                <td className="py-4">
                  <span
                    className={`rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${
                      student.status === "active"
                        ? "border-emerald-700 bg-emerald-100 text-emerald-800"
                        : "border-[#BE1622] bg-red-50 text-[#BE1622]"
                    }`}
                  >
                    {student.status === "active" ? "Ativo" : "Risco de Evasão"}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Editar ${student.name}`}
                      className="grid size-9 place-items-center rounded-lg border-2 border-[#083344] bg-white text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                    >
                      <Pencil className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      aria-label={`Ver perfil de ${student.name}`}
                      className="grid size-9 place-items-center rounded-lg border-2 border-[#083344] bg-white text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                    >
                      <Eye className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleStudents.length === 0 && (
          <p className="py-8 text-center text-sm font-bold text-[#083344]/50">
            Nenhum aluno encontrado com esses filtros.
          </p>
        )}
      </section>
    </>
  )
}
