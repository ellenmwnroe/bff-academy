"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Flag, Check, BookOpen } from "lucide-react"

type Student = {
  readonly id: string
  readonly name: string
  readonly initials: string
  readonly present: boolean
}

type StudentReview = {
  readonly flagged: boolean
  readonly notesOpen: boolean
  readonly notes: string
}

const students: ReadonlyArray<Student> = [
  { id: "1", name: "Emma Thompson", initials: "ET", present: true },
  { id: "2", name: "Liam Brooks", initials: "LB", present: true },
  { id: "3", name: "Sofia Almeida", initials: "SA", present: true },
  { id: "4", name: "Noah Patel", initials: "NP", present: true },
  { id: "5", name: "Olivia Chen", initials: "OC", present: false },
]

const presentCount = students.filter((student) => student.present).length
const absentCount = students.length - presentCount

const initialReviews: Record<string, StudentReview> = Object.fromEntries(
  students.map((student) => [
    student.id,
    { flagged: student.id === "4", notesOpen: false, notes: "" },
  ]),
)

export default function TeacherEvaluationPage() {
  const router = useRouter()
  const [reviews, setReviews] = useState(initialReviews)
  const [confirmed, setConfirmed] = useState(false)

  const updateReview = (id: string, patch: Partial<StudentReview>) => {
    setConfirmed(false)
    setReviews((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }))
  }

  return (
    <main className="min-h-screen bg-varden p-4 pb-32 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => router.push("/teacher")}
              aria-label="Voltar para o Dashboard"
              className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-cosmos bg-white text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
            >
              <ArrowLeft className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </button>

            <div className="min-w-0">
              <h1 className="text-2xl font-black leading-tight text-cosmos sm:text-3xl">
                Revisão da Aula: Turma Flex 2
              </h1>
              <p className="mt-1 text-sm font-bold text-cosmos/60">
                Hoje, 15:00 - 16:00 · Job Interviews
              </p>
            </div>
          </div>

          <article className="rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-5">
            <p className="text-sm font-bold text-cosmos sm:text-base">
              O sistema detectou {presentCount} alunos presentes e {absentCount} ausente.
              A gravação e o resumo automático estão sendo processados.
            </p>
          </article>
        </header>

        <section aria-label="Alunos da turma" className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          {students.map((student) => {
            const review = reviews[student.id]

            return (
              <article
                key={student.id}
                className="flex flex-col gap-3 rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:p-5"
              >
                <header className="flex items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-cosmos bg-varden text-sm font-black text-cosmos">
                    {student.initials}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-cosmos">{student.name}</p>
                    {student.present ? (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full border-2 border-marble bg-marble/15 px-2.5 py-0.5 text-xs font-bold text-marble">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        Presente
                      </span>
                    ) : (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full border-2 border-cosmos/30 bg-varden px-2.5 py-0.5 text-xs font-bold text-cosmos/60">
                        Ausente
                      </span>
                    )}
                  </div>
                </header>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => updateReview(student.id, { notesOpen: !review.notesOpen })}
                    className="flex w-full items-center justify-center rounded-xl border-[3px] border-cosmos bg-white px-4 py-2.5 text-sm font-black text-cosmos shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    {review.notesOpen ? "Fechar observação" : "Adicionar Observação"}
                  </button>

                  {review.notesOpen && (
                    <textarea
                      value={review.notes}
                      onChange={(event) => updateReview(student.id, { notes: event.target.value })}
                      rows={3}
                      placeholder="Nota para o diário de classe..."
                      className="resize-none rounded-xl border-[3px] border-cosmos bg-varden px-3 py-2 text-sm font-medium text-cosmos outline-none placeholder:text-cosmos/40 focus:border-crimson"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => updateReview(student.id, { flagged: !review.flagged })}
                    aria-pressed={review.flagged}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-cosmos px-4 py-2.5 text-sm font-black transition-all active:translate-y-0.5 ${
                      review.flagged
                        ? "bg-crimson text-white shadow-[2px_2px_0_0_var(--color-cosmos)]"
                        : "bg-white text-crimson"
                    }`}
                  >
                    <Flag
                      className={`size-4 ${review.flagged ? "fill-white text-white" : "text-crimson"}`}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {review.flagged ? "Dificuldade sinalizada" : "Sinalizar Dificuldade"}
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-cosmos bg-varden p-4">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-cosmos bg-cosmos px-4 py-4 text-base font-black text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none sm:text-lg"
          >
            <BookOpen className="size-5" strokeWidth={2.5} aria-hidden="true" />
            {confirmed ? "Diário confirmado!" : "Confirmar Diário de Classe"}
          </button>
        </div>
      </div>
    </main>
  )
}
