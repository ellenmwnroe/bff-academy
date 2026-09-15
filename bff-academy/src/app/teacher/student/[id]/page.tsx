"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Flame,
  Heart,
  Flag,
  Video,
  Bot,
  CalendarDays,
  AlertTriangle,
} from "lucide-react"

type TimelineItem = {
  readonly id: string
  readonly date: string
  readonly type: string
  readonly present: boolean
  readonly note: string
  readonly flagged: boolean
}

type StudentDossier = {
  readonly name: string
  readonly initials: string
  readonly level: string
  readonly streak: number
  readonly lives: number
  readonly atRisk: boolean
  readonly riskReason: string
  readonly aiWeaknesses: ReadonlyArray<string>
  readonly timeline: ReadonlyArray<TimelineItem>
}

const dossiers: Record<string, StudentDossier> = {
  "1": {
    name: "Emma Thompson",
    initials: "ET",
    level: "Flex 2",
    streak: 12,
    lives: 4,
    atRisk: false,
    riskReason: "",
    aiWeaknesses: ["Past Tense", "Pronúncia"],
    timeline: [
      {
        id: "t1",
        date: "12 de Setembro",
        type: "Aula Ao Vivo - Flex 2",
        present: true,
        note: "Aluna com dificuldade na leitura do texto principal, mas excelente na conversação solta.",
        flagged: true,
      },
      {
        id: "t2",
        date: "10 de Setembro",
        type: "Simulador IA - Entrevista",
        present: true,
        note: "Completou 4 de 5 turnos. Travou em perguntas no passado.",
        flagged: false,
      },
      {
        id: "t3",
        date: "08 de Setembro",
        type: "Aula Ao Vivo - Flex 2",
        present: true,
        note: "Participou bem do speaking club. Pediu mais prática de phrasal verbs.",
        flagged: false,
      },
    ],
  },
  "2": {
    name: "Liam Brooks",
    initials: "LB",
    level: "Flex 2",
    streak: 7,
    lives: 5,
    atRisk: false,
    riskReason: "",
    aiWeaknesses: ["Verb To Be", "Articles"],
    timeline: [
      {
        id: "t1",
        date: "12 de Setembro",
        type: "Aula Ao Vivo - Flex 2",
        present: true,
        note: "Boa pronúncia. Precisa de mais vocabulário de trabalho.",
        flagged: false,
      },
      {
        id: "t2",
        date: "10 de Setembro",
        type: "Aula Ao Vivo - Flex 2",
        present: true,
        note: "Chegou atrasado, mas acompanhou o restante da dinâmica.",
        flagged: false,
      },
      {
        id: "t3",
        date: "05 de Setembro",
        type: "Simulador IA - Rotina",
        present: true,
        note: "Erros recorrentes em am/is/are nas respostas curtas.",
        flagged: false,
      },
    ],
  },
  "4": {
    name: "Noah Patel",
    initials: "NP",
    level: "Particular",
    streak: 0,
    lives: 2,
    atRisk: true,
    riskReason: "Risco de evasão - Faltou nas últimas 2 aulas",
    aiWeaknesses: ["Verb To Be", "Past Tense", "Pronúncia"],
    timeline: [
      {
        id: "t1",
        date: "12 de Setembro",
        type: "Aula Ao Vivo - Particular",
        present: false,
        note: "Não compareceu. Sem justificativa registrada.",
        flagged: true,
      },
      {
        id: "t2",
        date: "10 de Setembro",
        type: "Aula Ao Vivo - Particular",
        present: false,
        note: "Falta. Ticket de reposição não foi usado.",
        flagged: true,
      },
      {
        id: "t3",
        date: "03 de Setembro",
        type: "Aula Ao Vivo - Particular",
        present: true,
        note: "Aula produtiva, mas o aluno relatou cansaço e pouco tempo para estudar.",
        flagged: false,
      },
    ],
  },
}

const fallbackDossier: StudentDossier = {
  name: "Aluno da Turma",
  initials: "AL",
  level: "Flex 2",
  streak: 5,
  lives: 3,
  atRisk: false,
  riskReason: "",
  aiWeaknesses: ["Past Tense"],
  timeline: dossiers["1"].timeline,
}

export default function TeacherStudentDossierPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const student = dossiers[params.id] ?? fallbackDossier

  return (
    <main className="min-h-screen bg-varden p-4 pb-32 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Voltar"
          className="grid size-11 place-items-center rounded-xl border-[3px] border-cosmos bg-white text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
        >
          <ArrowLeft className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </button>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <section
            aria-labelledby="student-name"
            className="flex flex-col items-center gap-4 rounded-2xl border-[3px] border-cosmos bg-white p-6 text-center shadow-[4px_4px_0_0_var(--color-cosmos)] lg:col-span-1"
          >
            <span className="grid size-24 place-items-center rounded-full border-[3px] border-cosmos bg-varden text-2xl font-black text-cosmos">
              {student.initials}
            </span>

            <div>
              <h1 id="student-name" className="text-2xl font-black text-cosmos">
                {student.name}
              </h1>
              <p className="mt-1 text-sm font-bold text-cosmos/70">{student.level}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-sm font-black text-cosmos">
                <Flame
                  className="size-4 fill-crimson text-crimson"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {student.streak} dias
              </span>
              <span className="flex items-center gap-1.5 rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-sm font-black text-cosmos">
                <Heart
                  className="size-4 fill-crimson text-crimson"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {student.lives} vidas
              </span>
            </div>

            {student.atRisk && (
              <p className="flex items-start gap-2 rounded-xl border-2 border-crimson bg-gochujang/10 p-3 text-left text-sm font-bold text-crimson">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                {student.riskReason}
              </p>
            )}
          </section>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <section
              aria-labelledby="ai-insights-title"
              className="rounded-2xl border-[3px] border-cosmos bg-white p-5 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-6"
            >
              <header className="mb-4 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-cosmos bg-cosmos">
                  <Bot className="size-5 text-white" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h2 id="ai-insights-title" className="text-lg font-black text-cosmos sm:text-xl">
                  Desempenho no Simulador IA
                </h2>
              </header>

              <p className="mb-3 text-sm font-medium text-cosmos/70">
                Pontos em que o aluno mais erra no app — foque nisso na próxima aula ao vivo.
              </p>

              <div className="flex flex-wrap gap-2">
                {student.aiWeaknesses.map((weakness) => (
                  <span
                    key={weakness}
                    className="rounded-full border-2 border-cosmos bg-crimson px-3 py-1 text-sm font-black text-white"
                  >
                    {weakness}
                  </span>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="timeline-title"
              className="rounded-2xl border-[3px] border-cosmos bg-white p-5 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-6"
            >
              <header className="mb-4 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-cosmos bg-varden">
                  <CalendarDays className="size-5 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h2 id="timeline-title" className="text-lg font-black text-cosmos sm:text-xl">
                  Últimas Aulas e Observações
                </h2>
              </header>

              <ol className="flex flex-col gap-4">
                {student.timeline.map((item, index) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="flex w-4 flex-col items-center">
                      <span
                        className={`size-3 shrink-0 rounded-full border-2 border-cosmos ${
                          item.flagged ? "bg-marble" : "bg-marble"
                        }`}
                      />
                      {index < student.timeline.length - 1 && (
                        <span className="mt-1 w-0.5 flex-1 bg-cosmos/20" aria-hidden="true" />
                      )}
                    </div>

                    <article
                      className={`mb-1 min-w-0 flex-1 rounded-xl border-[3px] p-4 ${
                        item.flagged
                          ? "border-marble bg-marble/20"
                          : "border-cosmos bg-varden"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-black uppercase tracking-wide text-cosmos/60">
                          {item.date}
                        </p>
                        {item.flagged && (
                          <Flag
                            className="size-4 fill-marble text-marble"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      <p className="mt-1 font-black text-cosmos">{item.type}</p>

                      <span
                        className={`mt-2 inline-block rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${
                          item.present
                            ? "border-marble bg-marble/15 text-marble"
                            : "border-crimson bg-gochujang/10 text-crimson"
                        }`}
                      >
                        {item.present ? "Presente" : "Ausente"}
                      </span>

                      <p className="mt-2 text-sm font-medium text-cosmos/80 wrap-break-word">
                        {item.note}
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-cosmos bg-varden p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row">
          <Link
            href="/teacher"
            className="flex w-full items-center justify-center rounded-2xl border-[3px] border-cosmos bg-white px-4 py-3.5 font-black text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none sm:w-auto sm:px-6"
          >
            Voltar para Turma
          </Link>

          <Link
            href="/live"
            className="flex w-full flex-1 items-center justify-center gap-2 rounded-2xl border-[3px] border-cosmos bg-cosmos px-4 py-3.5 font-black text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none"
          >
            <Video className="size-5" strokeWidth={2.5} aria-hidden="true" />
            Iniciar Aula com Aluno
          </Link>
        </div>
      </div>
    </main>
  )
}
