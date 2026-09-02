"use client"

import { TrendingUp, AlertCircle, Ticket, type LucideIcon } from "lucide-react"

type SummaryCard = {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly detail: string
  readonly icon: LucideIcon
  readonly isAlert: boolean
}

const summaryCards: ReadonlyArray<SummaryCard> = [
  {
    id: "expected",
    label: "Receita Prevista do Mês",
    value: "R$ 48.700",
    detail: "1.240 mensalidades ativas",
    icon: TrendingUp,
    isAlert: false,
  },
  {
    id: "overdue",
    label: "Pagamentos Atrasados",
    value: "R$ 3.450",
    detail: "18 alunos inadimplentes",
    icon: AlertCircle,
    isAlert: true,
  },
  {
    id: "extra",
    label: "Receita Extra",
    value: "R$ 1.120",
    detail: "56 tickets de reposição avulsos",
    icon: Ticket,
    isAlert: false,
  },
]

type TransactionStatus = "paid" | "pending" | "overdue"

type Transaction = {
  readonly id: string
  readonly date: string
  readonly description: string
  readonly amount: string
  readonly status: TransactionStatus
}

const transactions: ReadonlyArray<Transaction> = [
  {
    id: "1",
    date: "02/09/2026",
    description: "Mensalidade - Marina Costa",
    amount: "R$ 389,00",
    status: "paid",
  },
  {
    id: "2",
    date: "01/09/2026",
    description: "Compra de 1 Ticket de Reposição - Bruno Almeida",
    amount: "R$ 20,00",
    status: "paid",
  },
  {
    id: "3",
    date: "31/08/2026",
    description: "Mensalidade - Carla Souza",
    amount: "R$ 289,00",
    status: "pending",
  },
  {
    id: "4",
    date: "25/08/2026",
    description: "Mensalidade - Diego Ferreira",
    amount: "R$ 389,00",
    status: "overdue",
  },
]

const statusStyles: Record<TransactionStatus, { label: string; className: string }> = {
  paid: {
    label: "Pago",
    className: "border-emerald-700 bg-emerald-100 text-emerald-800",
  },
  pending: {
    label: "Pendente",
    className: "border-amber-600 bg-amber-100 text-amber-800",
  },
  overdue: {
    label: "Atrasado",
    className: "border-[#BE1622] bg-red-50 text-[#BE1622]",
  },
}

export default function AdminFinancePage() {
  return (
    <>
      {/* Cabeçalho */}
      <header>
        <h1 className="text-3xl font-black text-[#083344]">Controle Financeiro</h1>
        <p className="mt-1 text-sm font-medium text-[#083344]/60">
          Setembro de 2026
        </p>
      </header>

      {/* Resumo */}
      <section aria-label="Resumo financeiro" className="grid grid-cols-3 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <article
              key={card.id}
              className="flex flex-col gap-2 rounded-2xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#083344]/70">{card.label}</p>
                <Icon
                  className={`size-5 ${card.isAlert ? "text-[#BE1622]" : "text-[#083344]"}`}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </div>

              <p
                className={`text-3xl font-black ${
                  card.isAlert ? "text-[#BE1622]" : "text-[#083344]"
                }`}
              >
                {card.value}
              </p>

              <p className="text-xs font-bold text-[#083344]/60">{card.detail}</p>
            </article>
          )
        })}
      </section>

      {/* Transações */}
      <section
        aria-labelledby="transactions-title"
        className="rounded-2xl border-[3px] border-[#083344] bg-white p-6 shadow-[4px_4px_0_0_#083344]"
      >
        <h2 id="transactions-title" className="text-xl font-bold text-[#083344]">
          Transações Recentes
        </h2>

        <table className="mt-5 w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-[#083344]">
              <th className="pb-3 text-sm font-black text-[#083344]">Data</th>
              <th className="pb-3 text-sm font-black text-[#083344]">Descrição</th>
              <th className="pb-3 text-right text-sm font-black text-[#083344]">Valor</th>
              <th className="pb-3 text-right text-sm font-black text-[#083344]">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const status = statusStyles[transaction.status]

              return (
                <tr key={transaction.id} className="border-b-2 border-[#083344]/10">
                  <td className="py-4 text-sm font-medium text-[#083344]/70">
                    {transaction.date}
                  </td>
                  <td className="py-4 font-bold text-[#083344]">
                    {transaction.description}
                  </td>
                  <td className="py-4 text-right font-black text-[#083344]">
                    {transaction.amount}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </>
  )
}
