"use client"

import { useState } from "react"
import { HomeView } from "./home-view"
import { PracticeView } from "./practice-view"
import { BottomNav } from "./bottom-nav"

type Tab = "home" | "practice" | "classes" | "profile"

export function BffAcademy() {
  const [tab, setTab] = useState<Tab>("home")

  return (
    <div className="bg-dots min-h-dvh font-sans">
      <div className="bg-dots relative mx-auto flex min-h-dvh max-w-md flex-col">
        <main className="flex-1 pb-28">
          {tab === "practice" ? (
            <PracticeView onClose={() => setTab("home")} />
          ) : (
            <HomeView />
          )}
        </main>

        <BottomNav active={tab} onChange={setTab} />
      </div>
    </div>
  )
}
