"use client"

import { Home, Dumbbell, CalendarDays, User } from "lucide-react"

type Tab = "home" | "practice" | "classes" | "profile"

const items: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "practice", label: "Praticar", icon: Dumbbell },
  { id: "classes", label: "Aulas", icon: CalendarDays },
  { id: "profile", label: "Perfil", icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4">
      <ul className="pointer-events-auto flex items-center gap-1 rounded-[26px] border-[3px] border-[#00457F] bg-white p-1.5 shadow-[4px_4px_0_0_rgba(0,69,127,1)]">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-2xl px-3.5 py-2 transition-all active:scale-90 ${
                  isActive
                    ? "border-2 border-[#8f3a03] bg-[#EC6206] shadow-[0_3px_0_0_#8f3a03]"
                    : "border-2 border-transparent"
                }`}
              >
                <Icon
                  className="size-6"
                  strokeWidth={2.75}
                  color={isActive ? "#ffffff" : "#7FA8CE"}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px] font-extrabold"
                  style={{ color: isActive ? "#ffffff" : "#7FA8CE" }}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
