"use client"

import { useEffect, useState } from "react"
import {
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  ExternalLink,
  Mail,
  Play,
  User,
  X,
} from "lucide-react"

type PresentationKind = "audio" | "video"

type Candidate = {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly level: string
  readonly availability: string
  readonly linkedin: string
  readonly presentation: PresentationKind
}

const initialCandidates: ReadonlyArray<Candidate> = [
  {
    id: "1",
    name: "Rafael Mendes",
    email: "rafael.mendes@email.com",
    level: "C1 - Avançado",
    availability: "Manhã, Noite",
    linkedin: "https://linkedin.com/in/rafael-mendes",
    presentation: "audio",
  },
  {
    id: "2",
    name: "Sofia Almeida",
    email: "sofia.almeida@email.com",
    level: "C2 - Proficiente",
    availability: "Tarde",
    linkedin: "https://linkedin.com/in/sofia-almeida",
    presentation: "video",
  },
  {
    id: "3",
    name: "James Carter",
    email: "james.carter@email.com",
    level: "Nativo",
    availability: "Finais de Semana",
    linkedin: "https://linkedin.com/in/james-carter",
    presentation: "video",
  },
]

export default function TeacherApprovalsPage() {
  const [candidates, setCandidates] = useState<ReadonlyArray<Candidate>>(initialCandidates)
  const [leavingIds, setLeavingIds] = useState<ReadonlyArray<string>>([])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{
    readonly message: string
    readonly tone: "approve" | "reject"
  } | null>(null)

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const pendingCount = candidates.length
  const pendingLabel =
    pendingCount === 1 ? "1 Perfil Pendente" : `${pendingCount} Perfis Pendentes`

  const resolveCandidate = (id: string, tone: "approve" | "reject", message: string) => {
    if (leavingIds.includes(id)) {
      return
    }

    setToast({ message, tone })
    setPlayingId((current) => (current === id ? null : current))
    setLeavingIds((current) => [...current, id])

    window.setTimeout(() => {
      setCandidates((current) => current.filter((candidate) => candidate.id !== id))
      setLeavingIds((current) => current.filter((leavingId) => leavingId !== id))
    }, 320)
  }

  return (
    <>
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-8 right-8 z-50 max-w-sm rounded-2xl border-[3px] border-cosmos px-5 py-4 font-black shadow-[4px_4px_0_0_var(--color-cosmos)] ${
            toast.tone === "approve" ? "bg-cosmos text-varden" : "bg-crimson text-varden"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-cosmos">Solicitações de Professores</h1>
          <p className="mt-1 text-sm font-bold text-cosmos/70">
            Analise os perfis com status &apos;Pendente de Aprovação&apos;.
          </p>
        </div>

        <span className="rounded-full border-[3px] border-cosmos bg-marble px-4 py-2 text-sm font-black text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)]">
          {pendingLabel}
        </span>
      </header>

      {pendingCount === 0 ? (
        <section className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed border-cosmos bg-white p-10 text-center shadow-[4px_4px_0_0_var(--color-cosmos)]">
          <span className="grid size-20 place-items-center rounded-full border-[3px] border-cosmos bg-marble shadow-[3px_3px_0_0_var(--color-cosmos)]">
            <Coffee className="size-10 text-varden" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-cosmos">Caixa de entrada vazia</h2>
            <p className="mt-2 max-w-md text-sm font-bold text-cosmos/70">
              Nenhuma solicitação pendente no momento
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-black text-cosmos">
            <CheckCircle2 className="size-4 text-marble" strokeWidth={2.5} aria-hidden="true" />
            Tudo em dia
          </span>
        </section>
      ) : (
        <section aria-label="Candidatos pendentes" className="flex flex-col gap-5">
          {candidates.map((candidate) => {
            const isLeaving = leavingIds.includes(candidate.id)
            const isPlaying = playingId === candidate.id
            const presentationLabel =
              candidate.presentation === "audio" ? "Ouvir Apresentação" : "Assistir Vídeo"

            return (
              <article
                key={candidate.id}
                className={`flex flex-col gap-5 rounded-2xl border-[3px] border-cosmos bg-white p-5 shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all duration-300 lg:flex-row lg:items-center ${
                  isLeaving ? "translate-x-4 scale-[0.98] opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl border-[3px] border-cosmos bg-varden shadow-[2px_2px_0_0_var(--color-cosmos)]">
                    <User className="size-7 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-cosmos">{candidate.name}</h2>
                      <span className="rounded-full border-2 border-cosmos bg-marble px-2.5 py-0.5 text-[11px] font-black text-cosmos">
                        Pendente de Aprovação
                      </span>
                    </div>

                    <p className="mt-1 flex items-center gap-2 text-sm font-bold text-cosmos/70">
                      <Mail className="size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                      <span className="truncate">{candidate.email}</span>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border-2 border-cosmos bg-varden px-3 py-1 text-xs font-black text-cosmos">
                        {candidate.level}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border-2 border-cosmos bg-white px-3 py-1 text-xs font-black text-cosmos">
                        <Clock className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                        {candidate.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-56">
                  <button
                    type="button"
                    onClick={() =>
                      setPlayingId((current) => (current === candidate.id ? null : candidate.id))
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl border-[3px] border-cosmos px-4 py-3 text-sm font-black shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none ${
                      isPlaying
                        ? "bg-cosmos text-varden"
                        : "bg-white text-cosmos"
                    }`}
                  >
                    <Play
                      className={`size-4 ${isPlaying ? "fill-varden" : "fill-cosmos"}`}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {isPlaying ? "Reproduzindo..." : presentationLabel}
                  </button>

                  <a
                    href={candidate.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-cosmos bg-varden px-4 py-3 text-sm font-black text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    <ExternalLink className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    Ver LinkedIn
                  </a>
                </div>

                <div className="flex flex-col gap-2 lg:w-52">
                  <button
                    type="button"
                    onClick={() =>
                      resolveCandidate(
                        candidate.id,
                        "approve",
                        "Professor aprovado! Credenciais enviadas por e-mail.",
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-cosmos bg-cosmos px-4 py-3 text-sm font-black text-varden shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
                    Aprovar Professor
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      resolveCandidate(candidate.id, "reject", "Candidatura recusada.")
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-cosmos bg-white px-4 py-3 text-sm font-black text-crimson shadow-[3px_3px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
                  >
                    <X className="size-5" strokeWidth={2.5} aria-hidden="true" />
                    Recusar
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      )}
    </>
  )
}
