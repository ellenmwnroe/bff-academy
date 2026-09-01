"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, Trophy, User, type LucideIcon } from "lucide-react"

type NavItem = {
  readonly href: string
  readonly label: string
  readonly icon: LucideIcon
}

const navItems: ReadonlyArray<NavItem> = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/feed", label: "Comunidade", icon: MessageSquare },
  { href: "/leaderboard", label: "Ranking", icon: Trophy },
  { href: "/profile", label: "Perfil", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 z-50 w-full rounded-t-2xl border-t-2 border-cosmos bg-white pb-[calc(env(safe-area-inset-bottom)+1.25rem)]"
      aria-label="Navegação principal"
    >
      <div className="flex w-full items-center justify-around px-2 pt-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 transition-all active:scale-95 ${
                isActive ? "-translate-y-0.5 text-crimson" : "text-cosmos/50"
              }`}
            >
              <Icon className="size-6" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
