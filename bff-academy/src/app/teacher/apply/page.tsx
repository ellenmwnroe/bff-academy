"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Send,
  Sparkles,
  UploadCloud,
  Wallet,
} from "lucide-react"

const proficiencyLevels = [
  "C1 - Avançado",
  "C2 - Proficiente",
  "Nativo",
  "Professor certificado (CELTA/TESOL)",
]

const shiftOptions = ["Manhã", "Tarde", "Noite", "Finais de Semana"] as const

type Shift = (typeof shiftOptions)[number]

const benefits = [
  {
    title: "Flexibilidade Total",
    description: "Você decide quando trabalhar.",
    icon: CalendarDays,
    accent: "bg-[#F59E0B]",
  },
  {
    title: "Inteligência Artificial",
    description: "Aulas e resumos mastigados para você.",
    icon: Bot,
    accent: "bg-[#669BBC]",
  },
  {
    title: "Ganhos por Aula",
    description: "Receba por aulas dadas e bônus por reposições express.",
    icon: Wallet,
    accent: "bg-[#10B981]",
  },
] as const

const inputClassName =
  "h-11 w-full rounded-xl border-[3px] border-[#083344] bg-white px-4 font-bold text-[#083344] shadow-[3px_3px_0_0_#083344] outline-none placeholder:text-[#083344]/40 focus:border-[#BE1622]"

export default function TeacherApplyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [shifts, setShifts] = useState<ReadonlyArray<Shift>>(["Noite"])
  const [fileName, setFileName] = useState("")
  const [resumeName, setResumeName] = useState("")

  const toggleShift = (shift: Shift) => {
    setShifts((current) =>
      current.includes(shift)
        ? current.filter((item) => item !== shift)
        : [...current, shift],
    )
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#FDF6E3]">
      <header className="border-b-[3px] border-[#083344] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl text-[#083344] sm:text-2xl">
            BFF Academy
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border-2 border-[#083344] bg-[#F59E0B] px-3 py-1 text-xs font-black text-[#083344] sm:flex">
              <Sparkles className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
              Vagas abertas
            </span>
            <a
              href="#cadastro"
              className="rounded-full border-[3px] border-[#083344] bg-[#083344] px-4 py-2 text-sm font-black text-[#FDF6E3] shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
            >
              Quero ensinar
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8 lg:py-14">
        <section className="flex flex-col gap-6 lg:pt-4">
          <span className="flex w-fit items-center gap-2 rounded-full border-2 border-[#083344] bg-white px-3 py-1 text-xs font-black text-[#083344] shadow-[2px_2px_0_0_#083344]">
            <Sparkles className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
            Ensino no seu ritmo
          </span>

          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-4xl leading-[1.05] text-[#083344] text-balance sm:text-5xl lg:text-6xl">
              Dê aulas no seu ritmo. Crie seu próprio horário.
            </h1>
            <p className="max-w-xl text-base font-bold leading-relaxed text-[#083344]/75 sm:text-lg">
              Junte-se ao BFF Academy. A plataforma que cuida da captação de alunos e da
              burocracia para você focar apenas em ensinar.
            </p>
          </div>

          <div className="grid gap-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <article
                  key={benefit.title}
                  className="flex items-start gap-4 rounded-2xl border-[3px] border-[#083344] bg-white p-4 shadow-[4px_4px_0_0_#083344]"
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] ${benefit.accent} shadow-[2px_2px_0_0_#083344]`}
                  >
                    <Icon className="size-6 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-serif text-lg text-[#083344]">{benefit.title}</h2>
                    <p className="mt-0.5 text-sm font-bold text-[#083344]/70">{benefit.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="cadastro" className="lg:sticky lg:top-8">
          <div className="rounded-2xl border-[3px] border-[#083344] bg-[#083344] p-5 text-[#FDF6E3] shadow-[8px_8px_0_0_#BE1622] sm:p-7">
            {isSubmitted ? (
              <div className="flex flex-col items-center gap-5 py-6 text-center">
                <span className="grid size-16 place-items-center rounded-full border-[3px] border-[#FDF6E3] bg-[#10B981] shadow-[3px_3px_0_0_#00000040]">
                  <CheckCircle2 className="size-8 text-white" strokeWidth={2.5} aria-hidden="true" />
                </span>

                <div>
                  <h2 className="font-serif text-3xl text-[#FDF6E3]">Tudo certo!</h2>
                  <span className="mt-3 inline-flex rounded-full border-2 border-[#FDF6E3] bg-[#F59E0B] px-3 py-1 text-xs font-black text-[#083344]">
                    Pendente de Aprovação
                  </span>
                  <p className="mt-3 text-sm font-bold text-[#FDF6E3]/80">
                    Seu perfil está em análise. Nossa equipe entrará em contato em até 48 horas.
                  </p>
                </div>

                <Link
                  href="/"
                  className="flex w-full items-center justify-center rounded-2xl border-[3px] border-[#FDF6E3] bg-[#FDF6E3] px-4 py-4 font-black text-[#083344] shadow-[4px_4px_0_0_#00000040] transition-all active:translate-y-1 active:shadow-none"
                >
                  Voltar para a Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="font-serif text-2xl text-[#FDF6E3] sm:text-3xl">
                    Comece sua jornada hoje
                  </h2>
                  <p className="mt-1 text-sm font-bold text-[#FDF6E3]/70">
                    Cadastre seu perfil. A aprovação leva até 48 horas.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-black">Nome Completo</span>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      className={inputClassName}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-black">E-mail</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="voce@email.com"
                      className={inputClassName}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-black">Nível de Inglês</span>
                    <select
                      required
                      name="proficiency"
                      defaultValue=""
                      className={`${inputClassName} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-black">Link do LinkedIn</span>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/seu-perfil"
                      className={inputClassName}
                    />
                  </label>

                  <fieldset>
                    <legend className="mb-2 flex items-center gap-2 text-sm font-black">
                      <Clock className="size-4" strokeWidth={2.5} aria-hidden="true" />
                      Disponibilidade
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {shiftOptions.map((shift) => {
                        const isActive = shifts.includes(shift)

                        return (
                          <button
                            key={shift}
                            type="button"
                            onClick={() => toggleShift(shift)}
                            aria-pressed={isActive}
                            className={`rounded-full border-2 border-[#FDF6E3] px-3 py-2 text-sm font-black transition-all active:scale-95 ${
                              isActive
                                ? "bg-[#10B981] text-white"
                                : "bg-transparent text-[#FDF6E3]"
                            }`}
                          >
                            {shift}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-black">Currículo</span>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border-[3px] border-dashed border-[#FDF6E3]/50 bg-white/5 px-4 py-3 transition-all hover:bg-white/10">
                      <FileText className="size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                      <span className="min-w-0 flex-1 text-sm font-bold">
                        {resumeName || "Envie seu currículo em PDF"}
                      </span>
                      <input
                        required
                        type="file"
                        name="resume"
                        accept=".pdf,application/pdf"
                        className="sr-only"
                        onChange={(event) => setResumeName(event.target.files?.[0]?.name ?? "")}
                      />
                    </label>
                  </div>

                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-[3px] border-dashed border-[#FDF6E3]/50 bg-white/5 p-4 text-center transition-all hover:bg-white/10">
                    <UploadCloud className="size-7" strokeWidth={2.5} aria-hidden="true" />
                    <span className="text-sm font-black">
                      Envie um áudio ou vídeo curto (1 min) se apresentando em inglês.
                    </span>
                    <span className="text-xs font-bold text-[#FDF6E3]/60">
                      {fileName || "Toque para escolher (.mp3, .mp4, .webm)"}
                    </span>
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      className="sr-only"
                      onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-[#FDF6E3] bg-[#BE1622] px-4 py-4 text-lg font-black text-white shadow-[4px_4px_0_0_#00000040] transition-all active:translate-y-1 active:shadow-none"
                >
                  <Send className="size-5" strokeWidth={2.5} aria-hidden="true" />
                  Enviar Perfil para Aprovação
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
