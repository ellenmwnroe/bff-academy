"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Download,
  User,
} from "lucide-react"

const syllabus = [
  "Vocabulário de entrevista: cargos, competências e experiência",
  "Perguntas clássicas do recrutador e como estruturar a resposta",
  "Simulação em duplas com feedback de pronúncia",
]

const teacher = {
  name: "Prof. Marina",
  subject: "Inglês · Nível Intermediário",
}

export default function ClassDetailsPage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col bg-varden px-4 pb-28 pt-8">
      {/* Voltar */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Voltar"
        className="mb-6 grid size-10 place-items-center rounded-xl text-cosmos transition-all hover:bg-cosmos/10 active:scale-95"
      >
        <ArrowLeft className="size-6" strokeWidth={2.5} aria-hidden="true" />
      </button>

      {/* Título e status */}
      <header className="flex flex-col items-start gap-3">
        <h1 className="text-3xl font-black leading-tight text-cosmos text-balance">
          Speaking: Entrevista de Emprego
        </h1>

        <span className="rounded-full bg-crimson px-3 py-1 text-sm font-bold text-white">
          Começa em 10 min
        </span>
      </header>

      {/* Professor */}
      <section className="mt-6 flex items-center gap-4 rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)]">
        <div className="grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-cosmos bg-varden">
          <User className="size-7 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-lg font-bold text-cosmos">{teacher.name}</p>
          <p className="text-sm text-cosmos/70">{teacher.subject}</p>
        </div>
      </section>

      {/* Ementa */}
      <section aria-labelledby="syllabus-title">
        <h2 id="syllabus-title" className="mb-4 mt-8 text-xl font-bold text-cosmos">
          O que vamos praticar hoje
        </h2>

        <ul className="flex flex-col gap-3">
          {syllabus.map((topic) => (
            <li key={topic} className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-crimson"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span className="text-cosmos">{topic}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Materiais */}
      <section aria-labelledby="materials-title">
        <h2 id="materials-title" className="mb-4 mt-8 text-xl font-bold text-cosmos">
          Material de Apoio
        </h2>

        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border-2 border-cosmos bg-white p-4 shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all active:translate-y-0.5 active:shadow-none"
        >
          <span className="flex items-center gap-3 font-bold text-cosmos">
            <FileText className="size-5" strokeWidth={2.5} aria-hidden="true" />
            PDF da Dinâmica
          </span>

          <Download className="size-5 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
          <span className="sr-only">Baixar</span>
        </button>
      </section>

      {/* Ação principal */}
      <Link
        href="/live"
        className="mt-8 w-full rounded-2xl border-[3px] border-cosmos bg-cosmos px-4 py-4 text-center text-lg font-black text-white shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none"
      >
        Entrar na Sala
      </Link>
    </main>
  )
}
