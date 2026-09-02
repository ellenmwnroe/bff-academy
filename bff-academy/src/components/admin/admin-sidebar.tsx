"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Wallet,
  BarChart3,
  LogOut,
  type LucideIcon,
} from "lucide-react"

type AdminNavItem = {
  readonly href: string
  readonly label: string
  readonly icon: LucideIcon
}

const navItems: ReadonlyArray<AdminNavItem> = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/alunos", label: "Alunos", icon: Users },
  { href: "/admin/professores", label: "Professores", icon: GraduationCap },
  { href: "/admin/conteudo", label: "Turmas & Conteúdo", icon: BookOpen },
  { href: "/admin/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/admin/relatorios", label: "Relatórios", icon: BarChart3 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed flex h-screen w-64 flex-col gap-4 border-r-[3px] border-[#083344] bg-white p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-3">
        <span className="grid size-9 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#BE1622] text-sm font-black text-white">
          BFF
        </span>
        <span className="font-black text-[#083344]">Academy</span>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-1" aria-label="Navegação administrativa">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                isActive
                  ? "border-2 border-[#083344] bg-[#FDF6E3] text-[#083344]"
                  : "border-2 border-transparent text-[#083344]/70 hover:bg-[#083344]/10 hover:text-[#083344]"
              }`}
            >
              <Icon className="size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-[#BE1622] transition-all hover:bg-[#BE1622]/10"
      >
        <LogOut className="size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        Sair da Conta
      </button>
    </aside>
  )
}
