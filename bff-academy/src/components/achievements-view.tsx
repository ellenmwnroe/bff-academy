"use client"

import { Award, Flame, Star, Zap, Mic, Target, Lock, type LucideIcon } from "lucide-react"

type AchievementAccent = "varden" | "gochujang" | "crimson" | "marble"

type Achievement = {
  readonly id: string
  readonly title: string
  readonly progress: number
  readonly total: number
  readonly unlocked: boolean
  readonly icon: LucideIcon
  readonly accent: AchievementAccent
}

const mockAchievements: ReadonlyArray<Achievement> = [
  {
    id: "streak-7",
    title: "Sequência de Fogo",
    progress: 7,
    total: 7,
    unlocked: true,
    icon: Flame,
    accent: "gochujang",
  },
  {
    id: "xp-500",
    title: "Raio de XP",
    progress: 500,
    total: 500,
    unlocked: true,
    icon: Zap,
    accent: "crimson",
  },
  {
    id: "perfect-lesson",
    title: "Aula Perfeita",
    progress: 1,
    total: 1,
    unlocked: true,
    icon: Star,
    accent: "varden",
  },
  {
    id: "speaking-10",
    title: "Mestre do Speaking",
    progress: 4,
    total: 10,
    unlocked: false,
    icon: Mic,
    accent: "marble",
  },
  {
    id: "accuracy-streak",
    title: "Precisão Lendária",
    progress: 3,
    total: 7,
    unlocked: false,
    icon: Target,
    accent: "marble",
  },
  {
    id: "daily-hero",
    title: "Herói Diário",
    progress: 12,
    total: 30,
    unlocked: false,
    icon: Award,
    accent: "marble",
  },
]

const accentStyles: Record<AchievementAccent, { circle: string; icon: string }> = {
  varden: {
    circle: "border-cosmos bg-varden",
    icon: "text-cosmos",
  },
  gochujang: {
    circle: "border-cosmos bg-gochujang",
    icon: "text-varden",
  },
  crimson: {
    circle: "border-gochujang bg-crimson",
    icon: "text-varden",
  },
  marble: {
    circle: "border-cosmos bg-marble",
    icon: "text-cosmos",
  },
}

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
        <div className="grid size-10 place-items-center rounded-xl border-2 border-cosmos bg-crimson">
          <Award className="size-5 fill-varden text-varden" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h2 id="achievements-title" className="font-serif text-lg font-black text-cosmos">
          Minhas Conquistas
        </h2>
      </header>

      {/* Badge Grid */}
      <ul className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.unlocked ? achievement.icon : Lock
          const styles = accentStyles[achievement.accent]
          const progressLabel = `${achievement.progress}/${achievement.total}`
          const progressPercent =
            achievement.total > 0
              ? Math.min(Math.round((achievement.progress / achievement.total) * 100), 100)
              : 0

          return (
            <li key={achievement.id}>
              <article
                className={`flex flex-col items-center gap-2 rounded-2xl border-[3px] border-cosmos bg-white p-4 text-center transition-all ${
                  achievement.unlocked
                    ? "shadow-[3px_3px_0_0_var(--color-cosmos)]"
                    : "opacity-60 grayscale"
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`flex size-16 items-center justify-center rounded-full border-[3px] ${
                    achievement.unlocked
                      ? styles.circle
                      : "border-cosmos/40 bg-varden/50"
                  }`}
                >
                  <Icon
                    className={`size-7 ${
                      achievement.unlocked ? styles.icon : "text-cosmos/50"
                    }`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold leading-snug text-cosmos text-balance">
                  {achievement.title}
                </h3>

                {/* Progress */}
                {achievement.unlocked ? (
                  <span className="rounded-full border-2 border-cosmos bg-varden px-2.5 py-0.5 text-xs font-bold text-cosmos">
                    Desbloqueada!
                  </span>
                ) : (
                  <div className="flex w-full flex-col gap-1.5">
                    <div className="relative h-2 w-full overflow-hidden rounded-full border-2 border-cosmos bg-varden">
                      <progress
                        className="absolute inset-0 h-full w-full appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-gochujang [&::-moz-progress-bar]:bg-gochujang"
                        value={achievement.progress}
                        max={achievement.total}
                        aria-label={`Progresso: ${progressLabel}`}
                      />
                      <div
                        className="absolute inset-0 h-full bg-gochujang transition-all"
                        style={{ width: `${progressPercent}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs font-bold text-cosmos/70">{progressLabel}</span>
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
