"use client"

import { Clock } from "lucide-react"

type ClassButtonStyle = "teal" | "red" | "outline"

type UpcomingClass = {
  readonly id: string
  readonly time: string
  readonly title: string
  readonly teacher: string
  readonly buttonStyle: ClassButtonStyle
}

const mockClasses: ReadonlyArray<UpcomingClass> = [
  {
    id: "1",
    time: "18:00",
    title: "Speaking Club",
    teacher: "Prof. Marina",
    buttonStyle: "teal",
  },
  {
    id: "2",
    time: "20:30",
    title: "Grammar Fix",
    teacher: "Prof. Lucas",
    buttonStyle: "red",
  },
  {
    id: "3",
    time: "AMANHÃ - 09:00",
    title: "Pronúncia",
    teacher: "Prof. Kate",
    buttonStyle: "outline",
  },
  {
    id: "4",
    time: "QUINTA - 15:00",
    title: "Conversation Practice",
    teacher: "Prof. John",
    buttonStyle: "teal",
  },
]

const buttonStyles: Record<ClassButtonStyle, string> = {
  teal: "bg-[#6597A8] text-white hover:bg-[#5a8899]",
  red: "bg-[#BE1622] text-white hover:bg-[#a51420]",
  outline: "bg-[#FDF6E3] text-[#083344] border-2 border-[#083344] hover:bg-[#f5efd9]",
}

type UpcomingClassesCarouselProps = {
  readonly classes?: ReadonlyArray<UpcomingClass>
  readonly onJoinClass?: (classId: string) => void
}

export function UpcomingClassesCarousel({
  classes = mockClasses,
  onJoinClass,
}: UpcomingClassesCarouselProps) {
  return (
    <section
      className="bg-[#FDF6E3] py-6"
      aria-labelledby="upcoming-classes-title"
    >
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-2 px-5">
        <Clock className="size-5 text-[#083344]" strokeWidth={2} aria-hidden="true" />
        <h2
          id="upcoming-classes-title"
          className="font-bold text-lg text-[#083344]"
        >
          Próximas Aulas
        </h2>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex flex-row flex-nowrap gap-4 overflow-x-auto overflow-y-hidden px-5 pb-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {classes.map((classItem) => (
            <article
              key={classItem.id}
              className="w-70 min-w-70 shrink-0 snap-center rounded-4xl border-2 border-[#083344] bg-white p-5"
            >
              {/* Time Badge */}
              <span className="mb-4 inline-block rounded-full border-2 border-[#083344] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#083344]">
                {classItem.time}
              </span>

              {/* Class Info */}
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-2xl font-bold leading-tight text-[#083344]">
                  {classItem.title}
                </h3>
                <p className="text-sm font-semibold text-[#6597A8]">
                  {classItem.teacher}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onJoinClass?.(classItem.id)}
                className={`w-full rounded-2xl px-4 py-3 text-sm font-bold transition-all active:scale-[0.98] ${
                  buttonStyles[classItem.buttonStyle]
                }`}
              >
                Entrar na Aula
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        .snap-x {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .snap-x::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
