"use client"

import {
  Upload,
  Download,
  CircleDollarSign,
  Users,
  Video,
  Flame,
  type LucideIcon,
} from "lucide-react"
type Kpi = {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly detail: string
  readonly detailTone: "positive" | "neutral"
  readonly icon: LucideIcon
}

const kpis: ReadonlyArray<Kpi> = [
  {
    id: "mrr",
    label: "Receita Mensal Recorrente",
    value: "R$ 45.200",
    detail: "+12% esse mês",
    detailTone: "positive",
    icon: CircleDollarSign,
  },
  {
    id: "students",
    label: "Alunos Ativos",
    value: "1.240",
    detail: "34 novos hoje",
    detailTone: "positive",
    icon: Users,
  },
  {
    id: "classes",
    label: "Aulas Hoje",
    value: "24 Aulas",
    detail: "92% de ocupação",
    detailTone: "neutral",
    icon: Video,
  },
  {
    id: "engagement",
    label: "Ofensiva Média",
    value: "14 dias",
    detail: "84 tickets de reposição gastos na semana",
    detailTone: "neutral",
    icon: Flame,
  },
]

const subscriptionsChart = [
  { month: "Abr", newSubs: 45, churn: 12 },
  { month: "Mai", newSubs: 62, churn: 18 },
  { month: "Jun", newSubs: 58, churn: 9 },
  { month: "Jul", newSubs: 81, churn: 15 },
  { month: "Ago", newSubs: 74, churn: 21 },
  { month: "Set", newSubs: 96, churn: 11 },
]

const CHART_MAX = 100

const appUsage = [
  { id: "exercises", label: "Fazem exercícios no app", percentage: 62 },
  { id: "class-only", label: "Só assistem a aula ao vivo", percentage: 28 },
  { id: "inactive", label: "Sem atividade há 7 dias", percentage: 10 },
]

const riskStudents = [
  { id: "1", name: "Bruno Almeida", plan: "Premium", streak: 0, absences: 3 },
  { id: "2", name: "Carla Souza", plan: "Básico", streak: 1, absences: 2 },
  { id: "3", name: "Diego Ferreira", plan: "Premium", streak: 0, absences: 4 },
  { id: "4", name: "Fernanda Lima", plan: "Intermediário", streak: 2, absences: 2 },
]

export default function AdminPage() {
  return (
    <>
      {/* Cabeçalho */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-black text-[#083344]">Visão Geral do Negócio</h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border-2 border-[#083344] bg-white px-4 py-2.5 text-sm font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
            >
              <Upload className="size-4" strokeWidth={2.5} aria-hidden="true" />
              Importar XLS
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border-2 border-[#083344] bg-white px-4 py-2.5 text-sm font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
            >
              <Download className="size-4" strokeWidth={2.5} aria-hidden="true" />
              Exportar Relatório
            </button>
          </div>
        </header>

        {/* KPIs */}
        <section aria-label="Indicadores principais" className="grid grid-cols-4 gap-5">
          {kpis.map((kpi) => {
            const Icon = kpi.icon

            return (
              <article
                key={kpi.id}
                className="flex flex-col gap-2 rounded-2xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#083344]/70">{kpi.label}</p>
                  <Icon className="size-5 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
                </div>

                <p className="text-3xl font-black text-[#083344]">{kpi.value}</p>

                <span
                  className={`w-fit rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${
                    kpi.detailTone === "positive"
                      ? "border-emerald-700 bg-emerald-100 text-emerald-800"
                      : "border-[#083344]/20 bg-[#FDF6E3] text-[#083344]/70"
                  }`}
                >
                  {kpi.detail}
                </span>
              </article>
            )
          })}
        </section>

        {/* Gráficos */}
        <section aria-label="Gráficos" className="grid grid-cols-2 gap-5">
          {/* Evolução de assinaturas */}
          <article className="flex h-80 flex-col rounded-2xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]">
            <h2 className="text-xl font-bold text-[#083344]">Evolução de Assinaturas</h2>

            <div className="mt-1 flex items-center gap-4 text-xs font-bold text-[#083344]/70">
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-[#5F9EA0]" aria-hidden="true" />
                <span>Novas</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-[#083344]" aria-hidden="true" />
                <span>Cancelamentos</span>
              </span>
            </div>

            <div className="mt-4 flex flex-1 items-end justify-between gap-3">
              {subscriptionsChart.map((entry) => (
                <div key={entry.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div
                      className="w-1/2 rounded-t-sm border-2 border-[#083344] bg-[#5F9EA0]"
                      style={{ height: `${(entry.newSubs / CHART_MAX) * 100}%` }}
                      title={`${entry.newSubs} novas assinaturas`}
                    />
                    <div
                      className="w-1/2 rounded-t-sm border-2 border-[#083344] bg-[#083344]"
                      style={{ height: `${(entry.churn / CHART_MAX) * 100}%` }}
                      title={`${entry.churn} cancelamentos`}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#083344]/70">{entry.month}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Uso do aplicativo */}
          <article className="flex h-80 flex-col rounded-2xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]">
            <h2 className="text-xl font-bold text-[#083344]">Uso do Aplicativo</h2>
            <p className="mt-1 text-sm font-medium text-[#083344]/60">
              Como os alunos ativos se distribuem
            </p>

            <div className="mt-6 flex flex-col gap-5">
              {appUsage.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#083344]">{item.label}</span>
                    <span className="text-sm font-black text-[#083344]">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="h-5 w-full overflow-hidden rounded-full border-2 border-[#083344] bg-[#FDF6E3]">
                    <div
                      className="h-full bg-[#5F9EA0]"
                      style={{ width: `${item.percentage}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Alunos de risco */}
        <section
          aria-labelledby="risk-title"
          className="rounded-2xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]"
        >
          <h2 id="risk-title" className="text-xl font-bold text-[#083344]">
            Monitoramento de Alunos de Risco
          </h2>
          <p className="mt-1 text-sm font-medium text-[#083344]/60">
            Ofensiva zerada ou faltas seguidas nas últimas duas semanas
          </p>

          <table className="mt-5 w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#083344]">
                <th className="pb-3 text-sm font-black text-[#083344]">Nome</th>
                <th className="pb-3 text-sm font-black text-[#083344]">Plano</th>
                <th className="pb-3 text-sm font-black text-[#083344]">Ofensiva Atual</th>
                <th className="pb-3 text-sm font-black text-[#083344]">Faltas Seguidas</th>
                <th className="pb-3 text-right text-sm font-black text-[#083344]">Ação</th>
              </tr>
            </thead>

            <tbody>
              {riskStudents.map((student) => (
                <tr key={student.id} className="border-b-2 border-[#083344]/10">
                  <td className="py-4 font-bold text-[#083344]">{student.name}</td>
                  <td className="py-4 text-sm font-medium text-[#083344]/70">
                    {student.plan}
                  </td>
                  <td className="py-4">
                    <span className="flex items-center gap-1.5 font-bold text-[#083344]">
                      <Flame
                        className={`size-4 ${
                          student.streak === 0 ? "text-[#BE1622]" : "text-[#083344]/50"
                        }`}
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      {student.streak} {student.streak === 1 ? "dia" : "dias"}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="rounded-full border-2 border-[#BE1622] bg-red-50 px-2.5 py-0.5 text-xs font-bold text-[#BE1622]">
                      {student.absences} faltas
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg border-2 border-[#083344] bg-white px-3 py-1.5 text-xs font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                      >
                        Ver Perfil
                      </button>

                      <button
                        type="button"
                        className="rounded-lg border-2 border-[#083344] bg-[#BE1622] px-3 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                      >
                        Notificar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    </>
  )
}
