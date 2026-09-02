"use client"

import { useState } from "react"
import { FileDown, LineChart, Download } from "lucide-react"

const levelDistribution = [
  { level: "Flex 1", students: 45 },
  { level: "Flex 2", students: 30 },
  { level: "Flex 3", students: 24 },
  { level: "Flex 4", students: 18 },
  { level: "Flex 5", students: 11 },
]

const MONTHS = [
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

const dataTypes = ["Notas", "Presenças", "Financeiro"]

export default function AdminReportsPage() {
  const [month, setMonth] = useState("Setembro")
  const [dataType, setDataType] = useState(dataTypes[0])

  const maxStudents = Math.max(...levelDistribution.map((item) => item.students))

  return (
    <>
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-[#083344]">Relatórios e Métricas</h1>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
        >
          <FileDown className="size-4" strokeWidth={2.5} aria-hidden="true" />
          Gerar PDF Completo
        </button>
      </header>

      <section aria-label="Relatórios" className="grid grid-cols-2 gap-6">
        {/* Distribuição de alunos */}
        <article className="rounded-2xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]">
          <h2 className="text-xl font-bold text-[#083344]">Distribuição de Alunos</h2>
          <p className="mt-1 text-sm font-medium text-[#083344]/60">
            Total de {levelDistribution.reduce((sum, item) => sum + item.students, 0)}{" "}
            alunos matriculados
          </p>

          <ul className="mt-6 flex flex-col gap-4">
            {levelDistribution.map((item) => (
              <li key={item.level} className="flex items-center gap-4">
                <span className="w-16 shrink-0 text-sm font-black text-[#083344]">
                  {item.level}
                </span>

                <div className="h-5 flex-1 overflow-hidden rounded-full border-2 border-[#083344] bg-[#FDF6E3]">
                  <div
                    className="h-full bg-[#5F9EA0]"
                    style={{ width: `${(item.students / maxStudents) * 100}%` }}
                    aria-hidden="true"
                  />
                </div>

                <span className="w-20 shrink-0 text-right text-sm font-bold text-[#083344]">
                  {item.students} alunos
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* Saúde financeira */}
        <article className="flex flex-col rounded-2xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]">
          <h2 className="text-xl font-bold text-[#083344]">Saúde Financeira</h2>
          <p className="mt-1 text-sm font-medium text-[#083344]/60">
            Crescimento de MRR nos últimos 12 meses
          </p>

          <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border-[3px] border-dashed border-[#083344]/40 p-8 text-center">
            <LineChart
              className="size-10 text-[#083344]/40"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <p className="text-sm font-bold text-[#083344]/60">
              Gráfico de linha de MRR
            </p>
            <p className="text-xs font-medium text-[#083344]/50">
              Disponível quando a biblioteca de gráficos for integrada
            </p>
          </div>
        </article>

        {/* Exportação customizada */}
        <article className="col-span-2 rounded-2xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]">
          <h2 className="text-xl font-bold text-[#083344]">Exportação Customizada</h2>
          <p className="mt-1 text-sm font-medium text-[#083344]/60">
            Escolha o período e o tipo de dado para baixar a planilha
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex flex-wrap items-end gap-4"
          >
            <label className="flex min-w-48 flex-1 flex-col gap-2">
              <span className="text-sm font-black text-[#083344]">Mês</span>
              <select
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                className="cursor-pointer rounded-xl border-[3px] border-[#083344] bg-[#FDF6E3] px-4 py-3 font-bold text-[#083344] outline-none focus:border-[#BE1622]"
              >
                {MONTHS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-48 flex-1 flex-col gap-2">
              <span className="text-sm font-black text-[#083344]">Tipo de Dado</span>
              <select
                value={dataType}
                onChange={(event) => setDataType(event.target.value)}
                className="cursor-pointer rounded-xl border-[3px] border-[#083344] bg-[#FDF6E3] px-4 py-3 font-bold text-[#083344] outline-none focus:border-[#BE1622]"
              >
                {dataTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl border-[3px] border-[#083344] bg-[#083344] px-8 py-4 text-lg font-black text-white shadow-[4px_4px_0_0_#083344] transition-all active:translate-y-1 active:shadow-none"
            >
              <Download className="size-5" strokeWidth={2.5} aria-hidden="true" />
              Baixar XLS
            </button>
          </form>
        </article>
      </section>
    </>
  )
}
