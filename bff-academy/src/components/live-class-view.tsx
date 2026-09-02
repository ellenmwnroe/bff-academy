"use client"

import { useState } from "react"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  PhoneOff,
  Send,
  User,
} from "lucide-react"

type ChatMessage = {
  readonly id: string
  readonly author: string
  readonly text: string
  readonly isTeacher: boolean
}

const initialMessages: ReadonlyArray<ChatMessage> = [
  {
    id: "1",
    author: "Prof. Marina",
    text: "Bom dia, pessoal! Hoje vamos praticar daily routine. Podem abrir o material na página 12.",
    isTeacher: true,
  },
  {
    id: "2",
    author: "Rafael",
    text: "Professora, o áudio tá baixinho aqui pra alguém mais?",
    isTeacher: false,
  },
  {
    id: "3",
    author: "Prof. Marina",
    text: "Já aumentei! Rafael, quer começar lendo o primeiro exemplo?",
    isTeacher: true,
  },
]

type LiveClassViewProps = {
  readonly teacherName?: string
  readonly onLeave?: () => void
}

export function LiveClassView({
  teacherName = "Prof. Marina",
  onLeave,
}: LiveClassViewProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [hasRaisedHand, setHasRaisedHand] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState("")

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault()

    const text = draft.trim()
    if (!text) return

    setMessages((current) => [
      ...current,
      { id: `msg-${Date.now()}`, author: "Você", text, isTeacher: false },
    ])
    setDraft("")
  }

  const controlButtonBase =
    "grid size-11 place-items-center rounded-full border-[3px] border-[#083344] transition-all active:translate-y-0.5"

  return (
    <main className="flex h-screen flex-col gap-4 bg-[#FDF6E3] p-4 lg:flex-row">
      {/* Player de vídeo */}
      <section className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl border-4 border-[#083344] bg-slate-800 shadow-[6px_6px_0_0_#083344]">
        {/* Badge ao vivo */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border-[3px] border-[#083344] bg-[#BE1622] px-3 py-1.5 shadow-[2px_2px_0_0_#083344]">
          <span
            className="size-2 animate-pulse rounded-full bg-white"
            aria-hidden="true"
          />
          <span className="text-xs font-black uppercase tracking-wide text-white">
            Ao Vivo
          </span>
        </div>

        {/* Professor */}
        <div className="flex flex-col items-center gap-3">
          <div className="grid size-28 place-items-center rounded-full border-4 border-[#083344] bg-[#FDF6E3] shadow-[4px_4px_0_0_#083344]">
            <User className="size-14 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <p className="text-xl font-black text-white">{teacherName}</p>
        </div>

        {/* Controles de mídia */}
        <div className="absolute bottom-6 flex items-center gap-4 rounded-full border-[3px] border-[#083344] bg-white px-6 py-3 shadow-[4px_4px_0_0_#083344]">
          <button
            type="button"
            onClick={() => setIsMuted((current) => !current)}
            aria-pressed={isMuted}
            aria-label={isMuted ? "Ativar microfone" : "Desativar microfone"}
            className={`${controlButtonBase} ${
              isMuted ? "bg-[#BE1622] text-white" : "bg-white text-[#083344]"
            }`}
          >
            {isMuted ? (
              <MicOff className="size-5" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <Mic className="size-5" strokeWidth={2.5} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCameraOff((current) => !current)}
            aria-pressed={isCameraOff}
            aria-label={isCameraOff ? "Ligar câmera" : "Desligar câmera"}
            className={`${controlButtonBase} ${
              isCameraOff ? "bg-[#BE1622] text-white" : "bg-white text-[#083344]"
            }`}
          >
            {isCameraOff ? (
              <VideoOff className="size-5" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <Video className="size-5" strokeWidth={2.5} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setHasRaisedHand((current) => !current)}
            aria-pressed={hasRaisedHand}
            aria-label={hasRaisedHand ? "Abaixar a mão" : "Levantar a mão"}
            className={`${controlButtonBase} ${
              hasRaisedHand ? "bg-[#FDD835] text-[#083344]" : "bg-white text-[#083344]"
            }`}
          >
            <Hand className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onLeave}
            aria-label="Sair da aula"
            className={`${controlButtonBase} bg-[#BE1622] text-white`}
          >
            <PhoneOff className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Chat */}
      <section className="flex h-[50vh] w-full flex-col overflow-hidden rounded-3xl border-[3px] border-[#083344] bg-white shadow-[4px_4px_0_0_#083344] lg:h-full lg:w-96">
        <header className="border-b-[3px] border-[#083344] px-5 py-4">
          <h2 className="font-black text-[#083344]">Chat da Turma</h2>
        </header>

        {/* Mensagens */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-xl border-2 p-3 ${
                message.isTeacher
                  ? "border-[#083344] bg-[#FDF6E3]"
                  : "border-[#083344]/20 bg-white"
              }`}
            >
              <p
                className={`text-xs font-black ${
                  message.isTeacher ? "text-[#BE1622]" : "text-[#083344]/60"
                }`}
              >
                {message.author}
              </p>
              <p className="mt-1 text-sm font-medium text-[#083344]">{message.text}</p>
            </article>
          ))}
        </div>

        {/* Envio */}
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 border-t-[3px] border-[#083344] p-3"
        >
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Escreva uma mensagem..."
            aria-label="Mensagem para o chat da turma"
            className="min-w-0 flex-1 rounded-xl border-2 border-[#083344] bg-[#FDF6E3] px-3 py-2.5 text-sm font-medium text-[#083344] outline-none placeholder:text-[#083344]/40 focus:border-[#BE1622]"
          />

          <button
            type="submit"
            aria-label="Enviar mensagem"
            className="grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-[#083344] bg-[#083344] text-white transition-all active:translate-y-0.5"
          >
            <Send className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  )
}
