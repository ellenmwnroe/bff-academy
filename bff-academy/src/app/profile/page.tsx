"use client"

import { AchievementsView } from "../../components/achievements-view"
import { BottomNav } from "../../components/bottom-nav"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-varden px-5 pb-28 pt-6">
      <AchievementsView />
      <BottomNav />
    </main>
  )
}
