"use client"

import { Clock } from "lucide-react"

type ClassStatus = "scheduled" | "starting-soon"

type UpcomingClass = {
  readonly id: string
  readonly time: string
  readonly title: string
  readonly teacher: string
  readonly status: ClassStatus
}

const mockClasses: ReadonlyArray<UpcomingClass> = [
  {
    id: "1",
    time: "18:00",
    title: "Speaking Club",
    teacher: "Prof. Marina",
    status: "scheduled",
  },
  {
    id: "2",
    time: "20:30",
    title: "Grammar Fix",
    teacher: "Prof. Lucas",
    status: "starting-soon",
  },
  {
    id: "3",
    time: "Amanhã · 09:00",
    title: "Pronúncia",
    teacher: "Prof. Kate",
    status: "scheduled",
  },
]

type UpcomingClassesListProps = {
  readonly classes?: ReadonlyArray<UpcomingClass>
  readonly onJoinClass?: (classId: string) => void
}

export function UpcomingClassesList({
  classes = mockClasses,
  onJoinClass,
}: UpcomingClassesListProps) {
  return (
    <section
      className="rounded-3xl bg-[#FDF6E3] p-6"
      aria-labelledby="upcoming-classes-title"
    >
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-2">
        <Clock className="size-5 text-[#083344]" strokeWidth={2} aria-hidden="true" />
        <h2
          id="upcoming-classes-title"
          className="font-bold text-lg text-[#083344]"
        >
          Próximas Aulas
        </h2>
      </div>

      {/* Vertical List of Classes */}
      <div className="flex flex-col gap-4">
        {classes.map((classItem) => {
          const isStartingSoon = classItem.status === "starting-soon"

          return (
            <article
              key={classItem.id}
              className="flex flex-col gap-4 rounded-3xl border border-gray-300 bg-white p-5 shadow-sm"
            >
              {/* Time Badge */}
              <span className="w-fit rounded-full border border-[#083344] px-3 py-1 text-sm font-semibold text-[#083344]">
                {classItem.time}
              </span>

              {/* Title and Teacher */}
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold leading-tight text-[#083344]">
                  {classItem.title}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {classItem.teacher}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onJoinClass?.(classItem.id)}
                className={`w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] ${
                  isStartingSoon ? "bg-[#B22222]" : "bg-[#5F9EA0]"
                }`}
              >
                Entrar na Aula
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
