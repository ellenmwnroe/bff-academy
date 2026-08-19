"use client"

import { Trophy, Crown } from "lucide-react"

type LeaderboardEntry = {
  readonly id: string
  readonly rank: number
  readonly name: string
  readonly xp: number
  readonly isCurrentUser?: boolean
}

const mockLeaderboard: ReadonlyArray<LeaderboardEntry> = [
  {
    id: "1",
    rank: 1,
    name: "Maria Silva",
    xp: 2450,
  },
  {
    id: "2",
    rank: 2,
    name: "João Santos",
    xp: 2180,
  },
  {
    id: "3",
    rank: 3,
    name: "Ana Costa",
    xp: 1920,
  },
  {
    id: "4",
    rank: 4,
    name: "Pedro Oliveira",
    xp: 1750,
  },
  {
    id: "5",
    rank: 5,
    name: "Ellen",
    xp: 1450,
    isCurrentUser: true,
  },
  {
    id: "6",
    rank: 6,
    name: "Lucas Ferreira",
    xp: 1320,
  },
  {
    id: "7",
    rank: 7,
    name: "Carla Souza",
    xp: 1180,
  },
  {
    id: "8",
    rank: 8,
    name: "Rafael Lima",
    xp: 980,
  },
  {
    id: "9",
    rank: 9,
    name: "Beatriz Alves",
    xp: 850,
  },
  {
    id: "10",
    rank: 10,
    name: "Gabriel Rocha",
    xp: 720,
  },
]

type LeaderboardViewProps = {
  readonly leaderboard?: ReadonlyArray<LeaderboardEntry>
  readonly daysRemaining?: number
}

export function LeaderboardView({
  leaderboard = mockLeaderboard,
  daysRemaining = 2,
}: LeaderboardViewProps) {
  const getRankStyles = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return {
        container: "bg-cosmos",
        text: "text-white",
        muted: "text-white/70",
        rank: "text-white",
        xp: "text-white",
        shadow: "shadow-[2px_2px_0_0_var(--color-cosmos)]",
      }
    }

    const podiumRankColor: Record<number, string> = {
      1: "text-yellow-500",
      2: "text-gray-400",
      3: "text-orange-500",
    }

    return {
      container: "bg-white",
      text: "text-cosmos",
      muted: "text-cosmos/60",
      rank: podiumRankColor[rank] ?? "text-cosmos",
      xp: rank <= 3 ? "text-gochujang" : "text-cosmos",
      shadow: "shadow-[4px_4px_0_0_var(--color-cosmos)]",
    }
  }

  return (
    <div className="rounded-3xl border-[3px] border-cosmos bg-marble p-6 shadow-[6px_6px_0_0_var(--color-cosmos)]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl border-[3px] border-cosmos bg-crimson shadow-[3px_3px_0_0_var(--color-cosmos)]">
            <Trophy className="size-6 fill-varden text-varden" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-black text-cosmos">Ranking Semanal</h2>
            <p className="text-sm font-bold text-cosmos/70">
              Termina em {daysRemaining} {daysRemaining === 1 ? "dia" : "dias"}
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex flex-col gap-3">
        {leaderboard.map((entry) => {
          const styles = getRankStyles(entry.rank, entry.isCurrentUser ?? false)
          const isTop3 = entry.rank <= 3

          return (
            <article
              key={entry.id}
              className={`flex items-center gap-4 rounded-2xl border-[3px] border-cosmos p-4 transition-all ${styles.container} ${styles.shadow}`}
            >
              {/* Rank Position with Crown */}
              <div className="flex shrink-0 items-center gap-2">
                {isTop3 && (
                  <Crown
                    className={`size-6 ${styles.rank}`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                )}
                <span className={`font-serif text-2xl font-black ${styles.rank}`}>
                  {entry.rank}º
                </span>
              </div>

              {/* Name */}
              <div className="min-w-0 flex-1">
                <p className={`truncate text-lg font-bold ${styles.text}`}>
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="ml-2 rounded-full bg-gochujang px-3 py-1 text-xs font-extrabold text-white">
                      VOCÊ
                    </span>
                  )}
                </p>
              </div>

              {/* XP Score */}
              <div className="shrink-0 text-right">
                <p className={`text-xl font-black ${styles.xp}`}>
                  {entry.xp.toLocaleString("pt-BR")}
                </p>
                <p className={`text-xs font-bold uppercase tracking-wide ${styles.muted}`}>
                  XP
                </p>
              </div>
            </article>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-6 rounded-2xl border-[3px] border-cosmos bg-crimson p-4 text-center shadow-[4px_4px_0_0_var(--color-cosmos)]">
        <p className="font-bold text-varden">
          Continue praticando para subir no ranking! 🚀
        </p>
      </div>
    </div>
  )
}
