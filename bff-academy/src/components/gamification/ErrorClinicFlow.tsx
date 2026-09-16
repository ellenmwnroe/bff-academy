"use client"

import { Check, Lightbulb, PartyPopper, Stethoscope } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type ClinicItem = {
  readonly id: string
  readonly before: string
  readonly error: string
  readonly after: string
  readonly prompt: string
  readonly answer: string
  readonly hint: string
  readonly suggestions: ReadonlyArray<string>
}

const CLINIC_ITEMS: ReadonlyArray<ClinicItem> = [
  {
    id: "have-has",
    before: "I ",
    error: "has",
    after: " a car.",
    prompt: "Como é a forma correta usando o pronome 'I'?",
    answer: "have",
    hint: "Lembre-se: He/She/It usa 'has'. O restante usa 'have'.",
    suggestions: ["has", "have", "had", "having"],
  },
  {
    id: "third-person",
    before: "She ",
    error: "go",
    after: " to school every day.",
    prompt: "Qual é a forma correta do verbo no presente para 'She'?",
    answer: "goes",
    hint: "Na terceira pessoa do singular (He/She/It), o verbo ganha -s ou -es.",
    suggestions: ["go", "goes", "going", "gone"],
  },
  {
    id: "to-be",
    before: "They ",
    error: "is",
    after: " happy.",
    prompt: "Qual verbo 'to be' combina com 'They'?",
    answer: "are",
    hint: "I am, He/She/It is, You/We/They are.",
    suggestions: ["is", "am", "are", "were"],
  },
]

type ErrorClinicFlowProps = {
  readonly onComplete?: () => void
}

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase().replace(/[.,!?]/g, "")
}

function isMatchingAnswer(value: string, expected: string) {
  const normalized = normalizeAnswer(value)
  const target = expected.toLowerCase()

  if (normalized === target) {
    return true
  }

  const tokens = normalized.split(/\s+/)
  return tokens.includes(target)
}

export function ErrorClinicFlow({ onComplete }: ErrorClinicFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = CLINIC_ITEMS.length
  const [isCorrect, setIsCorrect] = useState<null | true | false>(null)
  const [answer, setAnswer] = useState("")
  const [shakeKey, setShakeKey] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  const item = CLINIC_ITEMS[currentStep - 1] ?? CLINIC_ITEMS[0]
  const progressPercent = useMemo(
    () => Math.round((currentStep / totalSteps) * 100),
    [currentStep, totalSteps],
  )

  useEffect(() => {
    const node = cardRef.current
    if (!node) {
      return
    }

    node.classList.remove("animate-shake")
    if (isCorrect !== false) {
      return
    }

    node.getBoundingClientRect()
    node.classList.add("animate-shake")
  }, [isCorrect, shakeKey])

  const handleAnswerChange = (value: string) => {
    setAnswer(value)
    if (isCorrect === false) {
      setIsCorrect(null)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (isCorrect === true) {
      return
    }

    setAnswer(suggestion)
    if (isCorrect === false) {
      setIsCorrect(null)
    }
  }

  const handleVerify = () => {
    if (!answer.trim() || isCorrect === true) {
      return
    }

    const matched = isMatchingAnswer(answer, item.answer)
    setIsCorrect(matched)

    if (!matched) {
      setShakeKey((key) => key + 1)
      return
    }

    if (currentStep >= totalSteps) {
      setIsComplete(true)
    }
  }

  const handleNext = () => {
    setCurrentStep((step) => step + 1)
    setIsCorrect(null)
    setAnswer("")
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-varden px-5 py-8">
        <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl border-[3px] border-cosmos bg-card p-8 text-center shadow-[4px_4px_0_0_var(--color-cosmos)]">
          <div className="grid size-20 place-items-center rounded-2xl border-[3px] border-emerald-800 bg-emerald-100 shadow-[4px_4px_0_0_#065f46]">
            <PartyPopper className="size-10 text-emerald-800" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-cosmos">Você está pronto para o próximo módulo!</h1>
            <p className="text-sm font-semibold text-cosmos/70">
              Os tópicos da última aula já foram consertados. Bora seguir na trilha.
            </p>
          </div>
          <button
            type="button"
            onClick={onComplete}
            className="w-full rounded-2xl border-[3px] border-cosmos bg-crimson px-6 py-4 text-lg font-bold text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-cosmos)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Voltar para a Trilha
          </button>
        </div>
      </div>
    )
  }

  let cardTone = "border-cosmos bg-card shadow-[4px_4px_0_0_var(--color-cosmos)]"
  if (isCorrect === true) {
    cardTone = "border-emerald-800 bg-emerald-100 shadow-[4px_4px_0_0_#065f46]"
  } else if (isCorrect === false) {
    cardTone = "animate-shake border-crimson bg-red-100 shadow-[4px_4px_0_0_var(--color-crimson)]"
  }

  return (
    <div className="flex min-h-screen flex-col bg-varden px-5 py-6">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
        <header className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-cosmos/70">
              <span>Etapa {currentStep}/{totalSteps}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full border-[3px] border-cosmos bg-card shadow-[3px_3px_0_0_var(--color-cosmos)]">
              <div
                className="h-full rounded-full bg-marble transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border-[3px] border-cosmos bg-marble shadow-[4px_4px_0_0_var(--color-cosmos)]">
              <Stethoscope className="size-6 text-varden" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-serif text-3xl text-cosmos">Clínica de Erros</h1>
              <p className="mt-1 text-sm font-semibold text-cosmos/70">
                Você tropeçou nestes tópicos na última aula. Conserte para avançar!
              </p>
            </div>
          </div>
        </header>

        <section
          ref={cardRef}
          className={`flex flex-col gap-5 rounded-2xl border-[3px] p-6 ${cardTone}`}
        >
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-cosmos/60">O contexto</p>
            <p className="font-serif text-2xl leading-snug text-cosmos">
              {item.before}
              <span className="text-crimson line-through decoration-[3px]">{item.error}</span>
              {item.after}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-cosmos">{item.prompt}</span>
              <input
                type="text"
                value={answer}
                onChange={(event) => handleAnswerChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    if (isCorrect === true) {
                      handleNext()
                      return
                    }
                    handleVerify()
                  }
                }}
                disabled={isCorrect === true}
                placeholder="Digite ou escolha uma sugestão"
                autoComplete="off"
                className="rounded-2xl border-[3px] border-cosmos bg-varden px-4 py-3 text-lg font-bold text-cosmos shadow-[4px_4px_0_0_var(--color-cosmos)] outline-none placeholder:font-semibold placeholder:text-cosmos/40 disabled:bg-white/70"
              />
            </label>

            <fieldset disabled={isCorrect === true} className="space-y-2">
              <legend className="text-xs font-bold uppercase tracking-wide text-cosmos/60">
                Sugestões
              </legend>
              <div className="flex flex-wrap gap-2">
                {item.suggestions.map((suggestion) => {
                  const isSelected = normalizeAnswer(answer) === normalizeAnswer(suggestion)

                  let chipTone =
                    "border-cosmos bg-card text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)] hover:bg-marble hover:text-varden"
                  if (isSelected && isCorrect === true) {
                    chipTone =
                      "border-emerald-800 bg-emerald-100 text-emerald-800 shadow-[3px_3px_0_0_#065f46]"
                  } else if (isSelected && isCorrect === false) {
                    chipTone =
                      "border-crimson bg-crimson text-varden shadow-[3px_3px_0_0_var(--color-crimson)]"
                  } else if (isSelected) {
                    chipTone =
                      "border-cosmos bg-marble text-varden shadow-[3px_3px_0_0_var(--color-cosmos)]"
                  }

                  return (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`rounded-full border-[3px] px-4 py-2 font-bold transition-all active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--color-cosmos)] disabled:cursor-default ${chipTone}`}
                    >
                      {suggestion}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>

          {isCorrect === true ? (
            <div className="flex items-center gap-2 rounded-2xl border-[3px] border-emerald-800 bg-white/70 px-4 py-3 font-bold text-emerald-800">
              <Check className="size-6" strokeWidth={3} aria-hidden="true" />
              Corrigido! Pode avançar.
            </div>
          ) : null}

          {isCorrect === false ? (
            <div className="flex items-start gap-2 rounded-2xl border-[3px] border-crimson bg-white/70 px-4 py-3 text-sm font-semibold text-cosmos">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-crimson" strokeWidth={2.5} aria-hidden="true" />
              <span>{item.hint}</span>
            </div>
          ) : null}
        </section>

        <footer className="sticky bottom-0 bg-varden pb-1 pt-2">
          {isCorrect === true ? (
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-2xl border-[3px] border-cosmos bg-crimson px-6 py-5 text-xl font-bold text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-cosmos)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Próximo Erro 🚀
            </button>
          ) : (
            <button
              type="button"
              onClick={handleVerify}
              disabled={!answer.trim()}
              className="w-full rounded-2xl border-[3px] border-cosmos bg-crimson px-6 py-5 text-xl font-bold text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-cosmos)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:translate-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-[4px_4px_0_0_var(--color-cosmos)]"
            >
              Verificar
            </button>
          )}
        </footer>
      </div>
    </div>
  )
}
