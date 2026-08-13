"use client"

import Image from "next/image"
import { Flame, ArrowRight, Sparkles, Zap, Star, MessageCircle, Mic, BookOpen, Trophy } from "lucide-react"

const quests = [
  {
    title: "Praticar Speaking",
    progress: 1,
    total: 3,
    icon: Mic,
    tint: "#EC6206",
    ring: "#b34a04",
  },
  {
    title: "Revisar 10 palavras",
    progress: 7,
    total: 10,
    icon: BookOpen,
    tint: "#2F8EE0",
    ring: "#216bb0",
  },
  {
    title: "Manter a sequência",
    progress: 1,
    total: 1,
    icon: Trophy,
    tint: "#FFA723",
    ring: "#cc7f10",
  },
]

const upcomingClasses = [
  { time: "18:00", title: "Speaking Club", professor: "Prof. Marina", tint: "#2F8EE0", ring: "#216bb0" },
  { time: "20:30", title: "Grammar Fix", professor: "Prof. Lucas", tint: "#EC6206", ring: "#b34a04" },
  { time: "Amanhã · 09:00", title: "Pronúncia", professor: "Prof. Kate", tint: "#FFA723", ring: "#cc7f10" },
]

export function HomeView({ onStartPractice }: { readonly onStartPractice: () => void }) {
  return (
    <div className="flex flex-col gap-6 px-5 pb-6 pt-5">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Image
            src="/bff-logo.png"
            alt="Logo da BFF Academy"
            width={40}
            height={40}
            className="size-10 rounded-xl border-2 border-[#00457F] shadow-[2px_2px_0_0_rgba(0,69,127,1)]"
          />
          <div className="relative">
            <Image
              src="/mascot.png"
              alt="Avatar da Ellen"
              width={48}
              height={48}
              className="size-12 rounded-full border-[3px] border-[#00457F] bg-white object-cover shadow-[2px_2px_0_0_rgba(0,69,127,1)]"
            />
            <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-white bg-[#EC6206] text-[10px] font-bold text-white">
              5
            </span>
          </div>
        </div>

        {/* Glowing streak badge */}
        <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#cc7f10] bg-[#FFA723] px-3.5 py-2 shadow-[3px_3px_0_0_rgba(204,127,16,1)]">
          <Flame className="size-5 fill-white text-white" aria-hidden="true" />
          <span className="font-serif text-xl leading-none text-white">12</span>
          <span className="sr-only">dias de sequência</span>
        </div>
      </header>

      {/* Greeting */}
      <h1 className="-mt-1 font-serif text-3xl leading-tight text-[#00457F] text-balance">
        Olá, Ellen! Bora aprender?
      </h1>

      {/* Hero lesson card */}
      <section
        aria-labelledby="lesson-heading"
        className="relative rounded-[28px] border-[3px] border-[#00457F] bg-[#2F8EE0] p-6 shadow-[6px_6px_0_0_rgba(0,69,127,1)]"
      >
        {/* floating decorations */}
        <Star
          className="animate-bob absolute -left-2 -top-3 size-8 fill-[#FFA723] text-[#00457F]"
          style={{ ["--bob-rot" as string]: "-12deg" }}
          aria-hidden="true"
        />
        <Zap
          className="animate-bob absolute right-4 -top-4 size-7 fill-[#FFE08A] text-[#00457F]"
          style={{ ["--bob-rot" as string]: "10deg", animationDelay: "0.6s" }}
          aria-hidden="true"
        />
        <MessageCircle
          className="animate-bob absolute -right-2 bottom-8 size-7 fill-white text-[#00457F]"
          style={{ animationDelay: "1.1s" }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-1">
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-white/25 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Jornada de hoje
          </span>
          <h2 id="lesson-heading" className="mt-2 font-serif text-2xl text-white text-balance">
            Lição 1: Daily Routine
          </h2>
          <p className="mb-5 mt-1 text-sm font-medium leading-relaxed text-white/90">
            Continue de onde parou e mantenha sua sequência viva!
          </p>

          <button
            type="button"
            onClick={onStartPractice}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#8f3a03] border-b-[6px] bg-[#EC6206] px-6 py-4 text-base font-extrabold text-white transition-all active:translate-y-1 active:border-b-2"
          >
            Continuar Jornada
            <ArrowRight className="size-5" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Daily quests */}
      <section aria-labelledby="quests-heading" className="flex flex-col gap-3">
        <h2 id="quests-heading" className="flex items-center gap-2 font-serif text-lg text-[#00457F]">
          <Trophy className="size-5 fill-[#FFA723] text-[#00457F]" aria-hidden="true" />
          Missões Diárias
        </h2>

        <ul className="flex flex-col gap-3">
          {quests.map((q) => {
            const Icon = q.icon
            const pct = Math.round((q.progress / q.total) * 100)
            const done = q.progress >= q.total
            return (
              <li
                key={q.title}
                className="flex items-center gap-3 rounded-3xl border-[3px] border-[#00457F] bg-white p-3 shadow-[4px_4px_0_0_rgba(0,69,127,1)]"
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-2xl border-2"
                  style={{ backgroundColor: q.tint, borderColor: q.ring }}
                >
                  <Icon className="size-6 text-white" strokeWidth={2.5} aria-hidden="true" />
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-bold text-[#00457F]">{q.title}</span>
                    <span className="shrink-0 text-xs font-bold text-[#5b7a99]">
                      {q.progress}/{q.total}
                    </span>
                  </div>
                  <progress
                    value={pct}
                    max={100}
                    aria-label={`${q.title}: ${pct}%`}
                    className="h-3 w-full overflow-hidden rounded-full border-2 border-[#d6e6f2] bg-[#EDF5FA] [&::-webkit-progress-bar]:bg-[#EDF5FA]"
                    style={{
                      ["--tw-progress-fill" as string]: q.tint,
                    }}
                  />
                </div>

                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border-2 ${
                    done ? "border-[#cc7f10] bg-[#FFA723]" : "border-[#d6e6f2] bg-[#EDF5FA]"
                  }`}
                  aria-label={done ? "Recompensa disponível" : "Recompensa bloqueada"}
                >
                  <Star
                    className={`size-4 ${done ? "fill-white text-white" : "fill-[#c3d7e8] text-[#c3d7e8]"}`}
                    aria-hidden="true"
                  />
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Upcoming classes */}
      <section aria-labelledby="classes-heading" className="flex flex-col gap-3">
        <h2 id="classes-heading" className="font-serif text-lg text-[#00457F]">
          Próximas Aulas
        </h2>

        <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
          {upcomingClasses.map((c) => (
            <article
              key={c.title}
              className="flex w-56 shrink-0 snap-start flex-col gap-3 rounded-3xl border-[3px] border-[#00457F] bg-white p-5 shadow-[4px_4px_0_0_rgba(0,69,127,1)]"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase tracking-wide text-[#FFA723]">{c.time}</span>
                <h3 className="font-serif text-lg text-[#00457F]">{c.title}</h3>
                <p className="text-sm font-medium text-[#5b7a99]">{c.professor}</p>
              </div>
              <button
                type="button"
                className="mt-1 rounded-2xl border-2 border-b-[5px] px-4 py-2.5 text-sm font-extrabold text-white transition-all active:translate-y-0.5 active:border-b-2"
                style={{ backgroundColor: c.tint, borderColor: c.ring }}
              >
                Entrar na Aula
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
