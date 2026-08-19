"use client"

import { useRouter } from "next/navigation"
import { GlobalHeader } from "./global-header"
import { JourneyHeroCard } from "./journey-hero-card"
import { DailyMissionsCard } from "./daily-missions-card"
import { UpcomingClassesCarousel } from "./upcoming-classes-carousel"

export function HomeView() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6 pb-8">
      <GlobalHeader
        streakCount={12}
        ticketsCount={2}
        avatarUrl="/mascot.png"
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
    </div>
  )
}
