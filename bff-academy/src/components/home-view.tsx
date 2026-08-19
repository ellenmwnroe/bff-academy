"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "./global-header"
import { JourneyHeroCard } from "./journey-hero-card"
import { DailyMissionsCard } from "./daily-missions-card"
import { UpcomingClassesCarousel } from "./upcoming-classes-carousel"
import { StreakWarningModal } from "./streak-warning-modal"

const STREAK_DAYS = 12

export function HomeView() {
  const router = useRouter()
  const [isStreakWarningOpen, setIsStreakWarningOpen] = useState(true)

  return (
    <div className="flex flex-col gap-6 pb-8">
      <GlobalHeader
        streakCount={STREAK_DAYS}
        ticketsCount={2}
        avatarUrl="/mascot.png"
        onStreakClick={() => setIsStreakWarningOpen(true)}
      />

      <div className="flex flex-col gap-6 px-5">
        <h1 className="font-serif text-3xl leading-tight text-cosmos text-balance">
          Olá, Ellen! Bora aprender?
        </h1>

        <JourneyHeroCard
          unitNumber={1}
          title="Daily Routine & Horários"
          description="Continue de onde parou e mantenha sua sequência viva!"
          currentLesson={3}
          totalLessons={5}
          progressPercentage={60}
          onContinueClick={() => router.push("/lesson-overview")}
        />

        <DailyMissionsCard resetInHours={12} />
      </div>

      {/* Fora do padding lateral para o carrossel sangrar até a borda da tela */}
      <UpcomingClassesCarousel />

      <StreakWarningModal
        isOpen={isStreakWarningOpen}
        streakDays={STREAK_DAYS}
        onClose={() => setIsStreakWarningOpen(false)}
        onSaveStreak={() => {
          setIsStreakWarningOpen(false)
          router.push("/lesson-overview")
        }}
      />
    </div>
  )
}
