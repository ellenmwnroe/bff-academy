"use client"

import { Award, Flame, Star, Zap, Mic, Target, Lock, type LucideIcon } from "lucide-react"

type Achievement = {
  readonly id: string
  readonly title: string
  readonly progress: number
  readonly total: number
  readonly unlocked: boolean
  readonly icon: LucideIcon
  readonly circleColor: string
}

const mockAchievements: ReadonlyArray<Achievement> = [
  {
    id: "streak-7",
    title: "Sequência de Fogo",
    progress: 7,
    total: 7,
    unlocked: true,
    icon: Flame,
    circleColor: "bg-crimson",
  },
  {
    id: "xp-500",
    title: "Raio de XP",
    progress: 500,
    total: 500,
    unlocked: true,
    icon: Zap,
    circleColor: "bg-marble",
  },
  {
    id: "perfect-lesson",
    title: "Aula Perfeita",
    progress: 1,
    total: 1,
    unlocked: true,
    icon: Star,
    circleColor: "bg-marble",
  },
  {
    id: "speaking-10",
    title: "Mestre do Speaking",
    progress: 4,
    total: 10,
    unlocked: false,
    icon: Mic,
    circleColor: "bg-gray-200",
  },
  {
    id: "accuracy-streak",
    title: "Precisão Lendária",
    progress: 3,
    total: 7,
    unlocked: false,
    icon: Target,
    circleColor: "bg-gray-200",
  },
  {
    id: "daily-hero",
    title: "Herói Diário",
    progress: 12,
    total: 30,
    unlocked: false,
    icon: Award,
    circleColor: "bg-gray-200",
  },
]

type AchievementsViewProps = {
  readonly achievements?: ReadonlyArray<Achievement>
}

export function AchievementsView({
  achievements = mockAchievements,
}: AchievementsViewProps) {
  return (
    <section aria-labelledby="achievements-title">
      {/* Header */}
      <header className="mb-4 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl border-[3px] border-cosmos bg-crimson shadow-[2px_2px_0_0_var(--color-cosmos)]">
          <Award className="size-5 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h2 id="achievements-title" className="text-xl font-black text-cosmos">
          Minhas Conquistas
        </h2>
      </header>

      {/* Badge Grid */}
      <ul className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.unlocked ? achievement.icon : Lock
          const progressLabel = `${achievement.progress}/${achievement.total}`
          const progressPercent =
            achievement.total > 0
              ? Math.min(Math.round((achievement.progress / achievement.total) * 100), 100)
              : 0

          return (
            <li key={achievement.id}>
              <article
                className={`flex h-full flex-col items-center gap-2 rounded-3xl border-[3px] border-cosmos bg-white p-4 text-center ${
                  achievement.unlocked ? "shadow-[4px_4px_0_0_var(--color-cosmos)]" : ""
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`flex size-14 items-center justify-center rounded-full border-[3px] border-cosmos ${achievement.circleColor}`}
                >
                  <Icon
                    className={`size-6 ${
                    achievement.unlocked ? "text-varden" : "text-cosmos/40"
                    }`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3
                  className={`text-sm leading-snug text-balance ${
                    achievement.unlocked ? "font-bold text-cosmos" : "font-bold text-cosmos/40"
                  }`}
                >
                  {achievement.title}
                </h3>

                {/* Progress */}
                {achievement.unlocked ? (
                  <span className="mt-auto rounded-full border-2 border-cosmos bg-varden px-3 py-0.5 text-xs font-bold text-cosmos">
                    Desbloqueada!
                  </span>
                ) : (
                  <div className="mt-auto flex w-full flex-col gap-1.5 pt-1">
                    <div className="relative h-3 w-full overflow-hidden rounded-full border-2 border-cosmos bg-white">
                      <progress
                        className="absolute inset-0 h-full w-full appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-marble [&::-moz-progress-bar]:bg-marble"
                        value={achievement.progress}
                        max={achievement.total}
                        aria-label={`Progresso: ${progressLabel}`}
                      />
                      <div
                        className="absolute inset-0 h-full bg-marble"
                        style={{ width: `${progressPercent}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs font-bold text-cosmos/40">{progressLabel}</span>
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
