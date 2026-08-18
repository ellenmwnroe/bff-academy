"use client"

import { Clock, Zap, Mic, Target, type LucideIcon } from "lucide-react"

type Mission = {
  readonly id: string
  readonly title: string
  readonly progress: number
  readonly total: number
  readonly rewardXp: number
  readonly icon: LucideIcon
  readonly ringColor: "gochujang" | "cosmos" | "crimson"
}

const mockMissions: ReadonlyArray<Mission> = [
  {
    id: "speaking",
    title: "Complete 1 exercício de Speaking",
    progress: 0,
    total: 1,
    rewardXp: 20,
    icon: Mic,
    ringColor: "gochujang",
  },
  {
    id: "vocabulary",
    title: "Revise 10 palavras do módulo",
    progress: 5,
    total: 10,
    rewardXp: 30,
    icon: Zap,
    ringColor: "cosmos",
  },
  {
    id: "accuracy",
    title: "Acerte 5 exercícios seguidos",
    progress: 5,
    total: 5,
    rewardXp: 50,
    icon: Target,
    ringColor: "crimson",
  },
]

const ringStrokeClasses: Record<Mission["ringColor"], string> = {
  gochujang: "stroke-gochujang",
  cosmos: "stroke-cosmos",
  crimson: "stroke-crimson",
}

type ProgressRingProps = {
  readonly progress: number
  readonly total: number
  readonly icon: LucideIcon
  readonly ringColor: Mission["ringColor"]
  readonly size?: number
}

function ProgressRing({
  progress,
  total,
  icon: Icon,
  ringColor,
  size = 56,
}: ProgressRingProps) {
  const percentage = total > 0 ? Math.min(Math.round((progress / total) * 100), 100) : 0
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  const isComplete = progress >= total

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-none stroke-cosmos/20"
          strokeWidth="5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`fill-none transition-all duration-500 ${ringStrokeClasses[ringColor]}`}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <Icon
          className={`size-5 ${isComplete ? "text-crimson" : "text-cosmos"}`}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

type DailyMissionsCardProps = {
  readonly resetInHours?: number
  readonly missions?: ReadonlyArray<Mission>
}

export function DailyMissionsCard({
  resetInHours = 12,
  missions = mockMissions,
}: DailyMissionsCardProps) {
  return (
    <section
      className="rounded-3xl border-[3px] border-cosmos bg-card p-6 shadow-[4px_4px_0_0_var(--color-cosmos)]"
      aria-labelledby="daily-missions-title"
    >
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="daily-missions-title" className="font-serif text-2xl font-black text-cosmos">
          Missões Diárias
        </h2>

        <span className="flex w-fit items-center gap-1.5 rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-bold uppercase tracking-wide text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]">
          <Clock className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
          Atualiza em {resetInHours}h
        </span>
      </div>

      {/* Missions List */}
      <ul className="flex flex-col">
        {missions.map((mission, index) => {
          const isLast = index === missions.length - 1
          const isComplete = mission.progress >= mission.total

          return (
            <li
              key={mission.id}
              className={`flex items-center gap-4 py-4 ${
                isLast ? "" : "border-b-2 border-cosmos/20"
              }`}
            >
              <ProgressRing
                progress={mission.progress}
                total={mission.total}
                icon={mission.icon}
                ringColor={mission.ringColor}
              />

              <div className="min-w-0 flex-1">
                <p className="font-bold leading-snug text-cosmos text-balance">
                  {mission.title}
                </p>
                <p className="mt-0.5 text-sm font-bold text-cosmos/60">
                  {mission.progress}/{mission.total}
                  {isComplete ? " · Concluída!" : ""}
                </p>
              </div>

              <span className="shrink-0 -rotate-2 rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-extrabold text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]">
                +{mission.rewardXp} XP
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
