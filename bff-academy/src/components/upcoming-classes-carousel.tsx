"use client"

import { Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type ClassVariant = "marble" | "crimson" | "varden"

type UpcomingClass = {
  readonly id: string
  readonly time: string
  readonly title: string
  readonly teacher: string
  readonly variant: ClassVariant
}

const mockClasses: ReadonlyArray<UpcomingClass> = [
  {
    id: "1",
    time: "18:00",
    title: "Speaking Club",
    teacher: "Prof. Marina",
    variant: "marble",
  },
  {
    id: "2",
    time: "20:30",
    title: "Grammar Fix",
    teacher: "Prof. Lucas",
    variant: "crimson",
  },
  {
    id: "3",
    time: "Amanhã · 09:00",
    title: "Pronúncia",
    teacher: "Prof. Kate",
    variant: "varden",
  },
  {
    id: "4",
    time: "Quinta · 15:00",
    title: "Conversation Practice",
    teacher: "Prof. John",
    variant: "marble",
  },
]

const buttonVariants: Record<ClassVariant, string> = {
  marble: "bg-marble border-cosmos text-varden",
  crimson: "bg-crimson border-gochujang text-varden",
  varden: "bg-varden border-cosmos text-cosmos",
}

type UpcomingClassesCarouselProps = {
  readonly classes?: ReadonlyArray<UpcomingClass>
  readonly onJoinClass?: (classId: string) => void
}

export function UpcomingClassesCarousel({
  classes = mockClasses,
  onJoinClass,
}: UpcomingClassesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragOrigin = useRef({ pointerX: 0, scrollLeft: 0 })
  const lastPointer = useRef({ x: 0, time: 0 })
  const velocity = useRef(0)
  const isDragging = useRef(false)
  const hasDragged = useRef(false)
  const momentumFrame = useRef<number | null>(null)
  const [isGrabbing, setIsGrabbing] = useState(false)

  const stopMomentum = () => {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current)
      momentumFrame.current = null
    }
  }

  useEffect(() => stopMomentum, [])

  const startMomentum = () => {
    const track = trackRef.current
    if (!track || Math.abs(velocity.current) < 0.15) return

    let speed = -velocity.current * 18
    let lastTime = performance.now()

    const step = (time: number) => {
      const delta = time - lastTime
      lastTime = time

      track.scrollLeft += speed * (delta / 16)
      speed *= 0.94

      if (Math.abs(speed) > 0.3) {
        momentumFrame.current = requestAnimationFrame(step)
      } else {
        momentumFrame.current = null
      }
    }

    momentumFrame.current = requestAnimationFrame(step)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || event.pointerType === "touch") return

    stopMomentum()
    isDragging.current = true
    hasDragged.current = false
    velocity.current = 0
    dragOrigin.current = { pointerX: event.clientX, scrollLeft: track.scrollLeft }
    lastPointer.current = { x: event.clientX, time: performance.now() }
    track.setPointerCapture(event.pointerId)
    setIsGrabbing(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !isDragging.current) return

    const now = performance.now()
    const dt = now - lastPointer.current.time
    if (dt > 0) {
      velocity.current = (event.clientX - lastPointer.current.x) / dt
    }
    lastPointer.current = { x: event.clientX, time: now }

    const distance = event.clientX - dragOrigin.current.pointerX
    if (Math.abs(distance) > 4) {
      hasDragged.current = true
      event.preventDefault()
    }

    track.scrollLeft = dragOrigin.current.scrollLeft - distance
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current && trackRef.current?.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId)
    }

    const wasDragging = isDragging.current
    isDragging.current = false
    setIsGrabbing(false)

    if (wasDragging && hasDragged.current) {
      startMomentum()
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    stopMomentum()

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (delta === 0) return

    track.scrollBy({ left: delta, behavior: "smooth" })
    event.preventDefault()
  }

  const handleJoinClick = (classId: string) => {
    if (hasDragged.current) return
    onJoinClass?.(classId)
  }

  return (
    <section aria-labelledby="upcoming-classes-title">
      <h2
        id="upcoming-classes-title"
        className="mb-4 flex items-center gap-2 px-5 font-serif text-xl text-cosmos"
      >
        <Clock className="size-6 text-cosmos" aria-hidden="true" />
        Próximas Aulas
      </h2>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={handleWheel}
        style={{ touchAction: "pan-x" }}
        className={`flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-none select-none [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden ${
          isGrabbing
            ? "cursor-grabbing snap-none"
            : "cursor-grab snap-x snap-proximity scroll-smooth"
        }`}
      >
        {classes.map((classItem) => (
          <article
            key={classItem.id}
            className="flex w-72 shrink-0 snap-center flex-col gap-4 rounded-4xl border-[3px] border-cosmos bg-card p-5 shadow-[4px_4px_0_0_var(--color-cosmos)]"
          >
            <span className="w-fit rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-bold uppercase tracking-wide text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)]">
              {classItem.time}
            </span>

            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-xl leading-tight text-cosmos">
                {classItem.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {classItem.teacher}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleJoinClick(classItem.id)}
              className={`mt-auto rounded-2xl border-[3px] border-b-[6px] px-4 py-3 text-sm font-extrabold transition-all active:translate-y-1 active:border-b-[3px] ${buttonVariants[classItem.variant]}`}
            >
              Entrar na Aula
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
