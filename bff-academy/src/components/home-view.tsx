"use client"

import { useRouter } from "next/navigation"
import { Clock } from "lucide-react"
import { GlobalHeader } from "./global-header"
import { JourneyHeroCard } from "./journey-hero-card"
import { DailyMissionsCard } from "./daily-missions-card"

type PaletteVariant = "crimson" | "marble" | "varden"

const paletteStyles: Record<
  PaletteVariant,
  {
    icon: string
    iconText: string
    ring: string
  }
> = {
  crimson: {
    icon: "bg-crimson border-gochujang",
    iconText: "text-varden",
    ring: "stroke-crimson",
  },
  marble: {
    icon: "bg-marble border-cosmos",
    iconText: "text-varden",
    ring: "stroke-marble",
  },
  varden: {
    icon: "bg-varden border-cosmos",
    iconText: "text-cosmos",
    ring: "stroke-varden",
  },
}

const upcomingClasses: ReadonlyArray<{
  time: string
  title: string
  professor: string
  variant: PaletteVariant
}> = [
  { time: "18:00", title: "Speaking Club", professor: "Prof. Marina", variant: "marble" },
  { time: "20:30", title: "Grammar Fix", professor: "Prof. Lucas", variant: "crimson" },
  { time: "Amanhã · 09:00", title: "Pronúncia", professor: "Prof. Kate", variant: "varden" },
]

export function HomeView() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Global Header */}
      <GlobalHeader
        streakCount={12}
        livesCount={5}
        avatarUrl="/mascot.png"
        onAvatarClick={() => console.log("Avatar clicked - perfil modal")}
        onStreakClick={() => console.log("Streak clicked - histórico modal")}
        onLivesClick={() => console.log("Lives clicked - loja modal")}
      />

      <div className="px-5 flex flex-col gap-6">

      {/* Greeting */}
      <h1 className="font-serif text-3xl leading-tight text-cosmos text-balance">
        Olá, Ellen! Bora aprender?
      </h1>

      {/* Bento Grid Layout */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Hero lesson card */}
        <div className="md:col-span-2">
          <JourneyHeroCard
            unitNumber={1}
            title="Daily Routine & Horários"
            description="Continue de onde parou e mantenha sua sequência viva!"
            currentLesson={3}
            totalLessons={5}
            progressPercentage={60}
            onContinueClick={() => router.push("/lesson-overview")}
          />
        </div>

        {/* Daily missions */}
        <div className="md:col-span-2">
          <DailyMissionsCard resetInHours={12} />
        </div>

        {/* Upcoming classes - Bento style */}
        <section aria-labelledby="classes-heading" className="flex flex-col gap-4 md:col-span-2">
          <h2 id="classes-heading" className="flex items-center gap-2 font-serif text-xl text-cosmos">
            <Clock className="size-6 text-cosmos" aria-hidden="true" />
            Próximas Aulas
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {upcomingClasses.map((c) => {
              const styles = paletteStyles[c.variant]
              return (
                <article
                  key={c.title}
                  className="flex flex-col gap-4 rounded-[28px] border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]"
                >
                  {/* Time pill */}
                  <span className="w-fit rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-bold uppercase tracking-wide text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]">
                    {c.time}
                  </span>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-xl leading-tight text-cosmos">{c.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{c.professor}</p>
                  </div>

                  <button
                    type="button"
                    className={`mt-auto rounded-2xl border-[3px] border-b-[6px] px-4 py-3 text-sm font-extrabold transition-all active:translate-y-1 active:border-b-[3px] ${styles.icon} ${styles.iconText}`}
                  >
                    Entrar na Aula
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}
