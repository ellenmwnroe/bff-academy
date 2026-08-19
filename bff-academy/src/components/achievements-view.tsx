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
    circleColor: "bg-[#BE1622]",
  },
  {
    id: "xp-500",
    title: "Raio de XP",
    progress: 500,
    total: 500,
    unlocked: true,
    icon: Zap,
    circleColor: "bg-[#5F9EA0]",
  },
  {
    id: "perfect-lesson",
    title: "Aula Perfeita",
    progress: 1,
    total: 1,
    unlocked: true,
    icon: Star,
    circleColor: "bg-yellow-500",
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
        <div className="grid size-10 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#BE1622] shadow-[2px_2px_0_0_#083344]">
          <Award className="size-5 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h2 id="achievements-title" className="text-xl font-black text-[#083344]">
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
                className={`flex h-full flex-col items-center gap-2 rounded-3xl border-[3px] border-[#083344] bg-white p-4 text-center ${
                  achievement.unlocked ? "shadow-[4px_4px_0_0_#083344]" : ""
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`flex size-14 items-center justify-center rounded-full border-[3px] border-[#083344] ${achievement.circleColor}`}
                >
                  <Icon
                    className={`size-6 ${
                      achievement.unlocked ? "text-white" : "text-gray-500"
                    }`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3
                  className={`text-sm leading-snug text-balance ${
                    achievement.unlocked ? "font-bold text-[#083344]" : "font-bold text-gray-500"
                  }`}
                >
                  {achievement.title}
                </h3>

                {/* Progress */}
                {achievement.unlocked ? (
                  <span className="mt-auto rounded-full border-2 border-[#083344] bg-[#FDF6E3] px-3 py-0.5 text-xs font-bold text-[#083344]">
                    Desbloqueada!
                  </span>
                ) : (
                  <div className="mt-auto flex w-full flex-col gap-1.5 pt-1">
                    <div className="relative h-3 w-full overflow-hidden rounded-full border-2 border-[#083344] bg-white">
                      <progress
                        className="absolute inset-0 h-full w-full appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-[#5F9EA0] [&::-moz-progress-bar]:bg-[#5F9EA0]"
                        value={achievement.progress}
                        max={achievement.total}
                        aria-label={`Progresso: ${progressLabel}`}
                      />
                      <div
                        className="absolute inset-0 h-full bg-[#5F9EA0]"
                        style={{ width: `${progressPercent}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-500">{progressLabel}</span>
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
