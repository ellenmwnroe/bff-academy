"use client"

import { HomeView } from "../../components/home-view"
import { BottomNav } from "../../components/bottom-nav"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-varden pb-28">
      <HomeView />
      <BottomNav />
    </main>
  )
}
