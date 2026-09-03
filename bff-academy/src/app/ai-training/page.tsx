"use client"

import { useEffect, useRef, useState, type PointerEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bot, Mic, Send, Zap } from "lucide-react"

type ChatLevel = "iniciante" | "avancado"

type ChatMessage = {
  readonly id: string
  readonly author: "ai" | "user"
  readonly text: string
}

const MAX_ENERGY = 5

const beginnerSuggestions = [
  "I have 3 years of experience.",
  "I worked as a developer.",
  "I'm looking for a new challenge.",
]

const initialMessages: ReadonlyArray<ChatMessage> = [
  {
    id: "1",
    author: "ai",
    text: "Hello! Tell me about your previous experience.",
  },
  {
    id: "2",
    author: "user",
    text: "Sure. I used to work with customer support.",
  },
]

const aiReplies = [
  "Interesting. What was your biggest challenge in that role?",
  "Got it. Why are you looking for a new opportunity now?",
  "Nice. Can you give me an example of a problem you solved?",
  "Thanks. How do you usually work in a team?",
]

export default function AiTrainingPage() {
  const router = useRouter()
  const [energy, setEnergy] = useState(MAX_ENERGY)
  const [level, setLevel] = useState<ChatLevel>("iniciante")
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const replyIndex = useRef(0)

  useEffect(() => {
    const chat = chatRef.current
    if (!chat) return
    chat.scrollTop = chat.scrollHeight
  }, [messages])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || energy <= 0) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      author: "user",
      text: trimmed,
    }

    setMessages((current) => [...current, userMessage])
    setDraft("")
    setEnergy((current) => Math.max(0, current - 1))

    const reply = aiReplies[replyIndex.current % aiReplies.length]
    replyIndex.current += 1

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `ai-${Date.now()}`, author: "ai", text: reply },
      ])
    }, 600)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    sendMessage(draft)
  }

  const handleMicDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (energy <= 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsRecording(true)
  }

  const handleMicUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isRecording) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsRecording(false)
    sendMessage("I have experience working with people and solving problems.")
  }

  const handleMicCancel = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setIsRecording(false)
  }

  const showSuggestions = level === "iniciante" && energy > 0
  const hasEnergy = energy > 0

  return (
    <main className="flex min-h-screen flex-col bg-[#FDF6E3] px-4 pb-8 pt-8">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Voltar"
        className="mb-4 grid size-10 place-items-center rounded-xl text-[#083344] transition-all hover:bg-[#083344]/10 active:scale-95"
      >
        <ArrowLeft className="size-6" strokeWidth={2.5} aria-hidden="true" />
      </button>

      <header className="mb-4 flex flex-col gap-4">
        <h1 className="text-2xl font-black text-[#083344]">
          Simulador: Entrevista de Emprego
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border-[3px] border-[#083344] bg-white px-4 py-2.5 shadow-[3px_3px_0_0_#083344]">
            <Zap
              className="size-5 fill-[#FDD835] text-[#FDD835]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <p className="text-sm font-black text-[#083344]">
              ⚡ Energia: {energy}/{MAX_ENERGY}
            </p>
          </div>

          <fieldset className="flex rounded-full border-[3px] border-[#083344] bg-white p-1 shadow-[3px_3px_0_0_#083344]">
            <legend className="sr-only">Nível de dificuldade</legend>
            <button
              type="button"
              onClick={() => setLevel("iniciante")}
              aria-pressed={level === "iniciante"}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                level === "iniciante"
                  ? "bg-[#083344] text-white"
                  : "bg-transparent text-[#083344]/60"
              }`}
            >
              Iniciante
            </button>
            <button
              type="button"
              onClick={() => setLevel("avancado")}
              aria-pressed={level === "avancado"}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                level === "avancado"
                  ? "bg-[#083344] text-white"
                  : "bg-transparent text-[#083344]/60"
              }`}
            >
              Avançado
            </button>
          </fieldset>
        </div>
      </header>

      {/* Chat */}
      <section
        ref={chatRef}
        aria-label="Conversa com a IA"
        className="mb-4 flex h-[55vh] flex-col gap-4 overflow-y-auto rounded-3xl border-[3px] border-[#083344] bg-white p-5 shadow-[6px_6px_0_0_#083344]"
      >
        {messages.map((message) => {
          const isUser = message.author === "user"

          return (
            <article
              key={message.id}
              className={`flex max-w-[85%] items-end gap-2 ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {!isUser && (
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-[#083344] bg-[#FDF6E3]">
                  <Bot className="size-4 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
                </span>
              )}

              <p
                className={`rounded-2xl border-2 border-[#083344] px-4 py-2.5 text-sm font-medium ${
                  isUser
                    ? "bg-[#083344] text-white"
                    : "bg-neutral-100 text-[#083344]"
                }`}
              >
                {message.text}
              </p>
            </article>
          )
        })}

        {isRecording && (
          <p className="text-center text-xs font-bold text-[#BE1622]">
            Gravando... solte para enviar
          </p>
        )}
      </section>

      {/* Sugestões para iniciante */}
      {showSuggestions && (
        <div className="mb-3 flex flex-wrap gap-2">
          {beginnerSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setDraft(suggestion)}
              className="rounded-full border-2 border-[#083344] bg-white px-3 py-1.5 text-xs font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Rodapé */}
      {hasEnergy ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onPointerDown={handleMicDown}
            onPointerUp={handleMicUp}
            onPointerCancel={handleMicCancel}
            aria-label={isRecording ? "Parar gravação" : "Gravar resposta"}
            aria-pressed={isRecording}
            className={`grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-[#083344] bg-[#BE1622] text-white shadow-[3px_3px_0_0_#083344] transition-all select-none ${
              isRecording ? "animate-pulse" : "active:translate-y-0.5 active:shadow-none"
            }`}
          >
            <Mic className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>

          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Escreva sua resposta em inglês..."
            aria-label="Sua resposta"
            className="min-w-0 flex-1 rounded-xl border-[3px] border-[#083344] bg-white px-4 py-3 text-sm font-medium text-[#083344] shadow-[3px_3px_0_0_#083344] outline-none placeholder:text-[#083344]/40 focus:border-[#BE1622]"
          />

          <button
            type="submit"
            aria-label="Enviar mensagem"
            disabled={!draft.trim()}
            className="grid size-12 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#083344] text-white shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <Send className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </form>
      ) : (
        <div className="flex gap-3 rounded-2xl border-[3px] border-[#BE1622] bg-red-50 p-4">
          <Zap
            className="size-6 shrink-0 fill-[#BE1622] text-[#BE1622]"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <p className="text-sm font-bold text-[#BE1622]">
            ⚡ Você gastou toda a sua energia de hoje! Volte amanhã ou complete missões
            para recarregar.
          </p>
        </div>
      )}
    </main>
  )
}
