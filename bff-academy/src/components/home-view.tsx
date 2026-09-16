"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bot } from "lucide-react"
import { StudentHeader } from "./layout/StudentHeader"
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
      <StudentHeader />

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
      <UpcomingClassesCarousel onJoinClass={() => router.push("/class-details")} />

      {/* FAB do Simulador de IA */}
      <Link
        href="/ai-training"
        className="fixed bottom-24 right-4 z-40 grid size-14 place-items-center rounded-full border-[3px] border-cosmos bg-crimson text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_5px_0_0_var(--color-cosmos)] active:translate-y-0.5 active:shadow-none"
        aria-label="Praticar com IA"
        title="Simulador de Conversa"
      >
        <Bot className="size-6" strokeWidth={2.5} aria-hidden="true" />
      </Link>

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
