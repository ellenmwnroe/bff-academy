"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Settings,
  Zap,
  Flame,
  Trophy,
  User,
  CreditCard,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"
import { AchievementsView } from "../../components/achievements-view"
import { BottomNav } from "../../components/bottom-nav"

const student = {
  name: "Ellen Diniz",
  tag: "🚀 Explorador",
  avatarUrl: "/mascot.png",
  totalXp: 1450,
  streak: 12,
  level: 4,
}

type Stat = {
  readonly id: string
  readonly value: string
  readonly label: string
  readonly icon: LucideIcon
  readonly iconColor: string
  readonly valueColor: string
  readonly background: string
}

const stats: ReadonlyArray<Stat> = [
  {
    id: "xp",
    value: student.totalXp.toLocaleString("pt-BR"),
    label: "XP Total",
    icon: Zap,
    iconColor: "text-[#5F9EA0]",
    valueColor: "text-[#083344]",
    background: "bg-[#FDF6E3]",
  },
  {
    id: "streak",
    value: `${student.streak}`,
    label: "Dias seguidos",
    icon: Flame,
    iconColor: "text-[#BE1622]",
    valueColor: "text-[#BE1622]",
    background: "bg-[#FDECEC]",
  },
  {
    id: "level",
    value: `${student.level}`,
    label: "Nível atual",
    icon: Trophy,
    iconColor: "text-yellow-500",
    valueColor: "text-[#083344]",
    background: "bg-[#E8F1F5]",
  },
]

function StudentAvatar() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="grid size-24 place-items-center rounded-full border-[3px] border-[#083344] bg-[#5F9EA0]/20">
        <User className="size-10 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
      </div>
    )
  }

  return (
    <Image
      src={student.avatarUrl}
      alt={`Avatar de ${student.name}`}
      width={96}
      height={96}
      className="size-24 rounded-full border-[3px] border-[#083344] object-cover"
      onError={() => setHasError(true)}
    />
  )
}

type AccountAction = {
  readonly id: string
  readonly label: string
  readonly icon: LucideIcon
  readonly className: string
}

const accountActions: ReadonlyArray<AccountAction> = [
  {
    id: "personal-data",
    label: "Editar Dados Pessoais",
    icon: User,
    className: "bg-white text-[#083344]",
  },
  {
    id: "subscription",
    label: "Gerenciar Assinatura (Stripe)",
    icon: CreditCard,
    className: "bg-[#E8F1F5] text-[#083344]",
  },
  {
    id: "logout",
    label: "Sair da Conta",
    icon: LogOut,
    className: "bg-white text-[#BE1622]",
  },
]

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col gap-6 bg-[#FDF6E3] px-4 pb-28 pt-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#083344]">Meu Perfil</h1>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl border-[3px] border-[#083344] bg-white text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
          aria-label="Abrir configurações"
        >
          <Settings className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </button>
      </header>

      {/* Identity & Stats Card */}
      <section className="rounded-4xl border-[3px] border-[#083344] bg-white p-6 shadow-[6px_6px_0_0_#083344]">
        <div className="flex flex-col items-center gap-3">
          <StudentAvatar />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-black text-[#083344]">{student.name}</h2>
            <span className="rounded-full border-2 border-[#083344] bg-[#BE1622] px-4 py-1 text-xs font-bold text-white">
              {student.tag}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className={`flex flex-col items-center gap-1 rounded-2xl border-[3px] border-[#083344] p-3 text-center shadow-[3px_3px_0_0_#083344] ${stat.background}`}
              >
                <Icon className={`size-5 ${stat.iconColor}`} strokeWidth={2.5} aria-hidden="true" />
                <p className={`text-lg font-black ${stat.valueColor}`}>{stat.value}</p>
                <p className="text-xs font-bold text-[#083344]/70">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Achievements */}
      <AchievementsView />

      {/* Account Actions */}
      <section aria-labelledby="account-title">
        <h2 id="account-title" className="mb-3 mt-6 text-lg font-black text-[#083344]">
          Minha Conta
        </h2>

        <div className="flex flex-col gap-3">
          {accountActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl border-[3px] border-[#083344] px-4 py-3.5 text-left font-bold shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.75 active:shadow-none ${action.className}`}
              >
                <Icon className="size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                <span className="flex-1">{action.label}</span>
                <ChevronRight className="size-5 shrink-0 opacity-60" strokeWidth={2.5} aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </section>

      <BottomNav />
    </main>
  )
}
