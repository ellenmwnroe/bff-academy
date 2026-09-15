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
    className: "border-marble bg-marble/20 text-cosmos",
  },
  pending: {
    label: "Pendente",
    className: "border-amber-600 bg-amber-100 text-amber-800",
  },
  overdue: {
    label: "Atrasado",
    className: "border-crimson bg-gochujang/10 text-crimson",
  },
}

export default function AdminFinancePage() {
  return (
    <>
      {/* Cabeçalho */}
      <header>
        <h1 className="text-3xl font-black text-cosmos">Controle Financeiro</h1>
        <p className="mt-1 text-sm font-medium text-cosmos/60">
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
              className="flex flex-col gap-2 rounded-2xl border-[3px] border-cosmos bg-white p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-cosmos/70">{card.label}</p>
                <Icon
                  className={`size-5 ${card.isAlert ? "text-crimson" : "text-cosmos"}`}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </div>

              <p
                className={`text-3xl font-black ${
                  card.isAlert ? "text-crimson" : "text-cosmos"
                }`}
              >
                {card.value}
              </p>

              <p className="text-xs font-bold text-cosmos/60">{card.detail}</p>
            </article>
          )
        })}
      </section>

      {/* Transações */}
      <section
        aria-labelledby="transactions-title"
        className="rounded-2xl border-[3px] border-cosmos bg-white p-6 shadow-[4px_4px_0_0_var(--color-cosmos)]"
      >
        <h2 id="transactions-title" className="text-xl font-bold text-cosmos">
          Transações Recentes
        </h2>

        <table className="mt-5 w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-cosmos">
              <th className="pb-3 text-sm font-black text-cosmos">Data</th>
              <th className="pb-3 text-sm font-black text-cosmos">Descrição</th>
              <th className="pb-3 text-right text-sm font-black text-cosmos">Valor</th>
              <th className="pb-3 text-right text-sm font-black text-cosmos">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const status = statusStyles[transaction.status]

              return (
                <tr key={transaction.id} className="border-b-2 border-cosmos/10">
                  <td className="py-4 text-sm font-medium text-cosmos/70">
                    {transaction.date}
                  </td>
                  <td className="py-4 font-bold text-cosmos">
                    {transaction.description}
                  </td>
                  <td className="py-4 text-right font-black text-cosmos">
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
