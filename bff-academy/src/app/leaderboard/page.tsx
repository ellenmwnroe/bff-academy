"use client"

import { LeaderboardView } from "../../components/leaderboard-view"
import { BottomNav } from "../../components/bottom-nav"

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-varden px-5 pb-28 pt-6">
      <LeaderboardView daysRemaining={2} />
      <BottomNav />
    </main>
  )
}
