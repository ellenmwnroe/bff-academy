"use client"

import { Flame, Gift, Lightbulb, Sparkles, Trophy, Zap } from "lucide-react"
import { useEffect, useState } from "react"

type PostActivityModalProps = {
  readonly isOpen: boolean
  readonly onContinue: () => void
  readonly xpGained?: number
  readonly streakDays?: number
  readonly subtitle?: string
  readonly unlockedSkill?: string
}

const shareText =
  "Acabei de concluir uma lição no BFF Academy! Mandando bem na pronúncia. 🔥"

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-white" aria-hidden="true">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm11.25 1.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5Z" />
    </svg>
  )
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-white" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5ZM3 8.75h4v12.5H3Zm6.25 0h3.83v1.71h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14v6.71h-4v-5.95c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.28 1.55-2.28 3.14v6.06h-4Z" />
    </svg>
  )
}

export function PostActivityModal({
  isOpen,
  onContinue,
  xpGained = 20,
  streakDays = 5,
  subtitle = "Você mandou muito bem na pronúncia hoje.",
  unlockedSkill = "Você já sabe cumprimentar pessoas formalmente.",
}: PostActivityModalProps) {
  const [isClaimed, setIsClaimed] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onContinue()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onContinue])

  if (!isOpen) {
    return null
  }

  const handleInstagramShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "BFF Academy",
          text: shareText,
        })
        return
      } catch {
        // User cancelled the sheet; keep the modal open.
      }
    }

    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer")
  }

  const handleLinkedInShare = () => {
    const shareUrl = new URL("https://www.linkedin.com/sharing/share-offsite/")
    shareUrl.searchParams.set("url", "https://bffacademy.com")
    window.open(shareUrl.toString(), "_blank", "noopener,noreferrer")
  }

  return (
    <dialog
      open
      aria-labelledby="post-activity-title"
      aria-describedby="post-activity-subtitle"
      className="fixed inset-0 z-100 flex size-full max-h-none max-w-none items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col items-center gap-5 overflow-y-auto rounded-2xl border-[3px] border-cosmos bg-varden p-5 text-center shadow-[8px_8px_0_0_var(--color-cosmos)] sm:gap-6 sm:p-7">
        <div className="relative">
          <Sparkles
            className="absolute -left-7 -top-3 size-6 fill-crimson text-crimson"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <Sparkles
            className="absolute -right-6 top-1 size-5 fill-marble text-marble"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span className="grid size-20 place-items-center rounded-full border-[3px] border-cosmos bg-crimson shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <Trophy className="size-10 fill-varden text-varden" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="absolute -bottom-2 -right-2 grid size-10 place-items-center rounded-full border-[3px] border-cosmos bg-varden shadow-[2px_2px_0_0_var(--color-cosmos)]">
            <Flame className="size-5 fill-[#F97316] text-[#F97316]" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2
            id="post-activity-title"
            className="font-serif text-3xl leading-tight text-cosmos text-balance sm:text-4xl"
          >
            Lição Concluída!
          </h2>
          <p id="post-activity-subtitle" className="text-base font-bold text-cosmos/75">
            {subtitle}
          </p>
        </div>

        {!isClaimed ? (
          <button
            type="button"
            onClick={() => setIsClaimed(true)}
            className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-[3px] border-cosmos bg-crimson/15 p-6 shadow-[4px_4px_0_0_var(--color-cosmos)] animate-pulse"
          >
            <Gift className="size-12 text-crimson" strokeWidth={2.5} aria-hidden="true" />
            <p className="text-sm font-black text-cosmos">Clique para resgatar sua recompensa!</p>
          </button>
        ) : (
          <div className="flex w-full flex-col gap-4 animate-in fade-in zoom-in duration-500">
            <div className="grid w-full grid-cols-2 gap-3">
              <article className="flex flex-col items-center gap-1 rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)]">
                <Zap className="size-5 fill-[#10B981] text-[#10B981]" strokeWidth={2.5} aria-hidden="true" />
                <p className="font-serif text-2xl font-bold text-[#10B981]">+{xpGained} XP</p>
                <p className="text-xs font-bold uppercase tracking-wide text-cosmos/60">Ganhos</p>
              </article>

              <article className="flex flex-col items-center gap-1 rounded-2xl border-[3px] border-cosmos bg-white p-4 shadow-[4px_4px_0_0_var(--color-cosmos)]">
                <Flame className="size-5 fill-[#F97316] text-[#F97316]" strokeWidth={2.5} aria-hidden="true" />
                <p className="font-serif text-2xl font-bold text-cosmos">{streakDays} Dias 🔥</p>
                <p className="text-xs font-bold uppercase tracking-wide text-cosmos/60">Ofensiva</p>
              </article>
            </div>

            <article className="flex w-full items-center gap-3 rounded-2xl border-[3px] border-emerald-900 bg-emerald-50 p-4 text-left shadow-[4px_4px_0_0_var(--color-cosmos)]">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border-[3px] border-emerald-900 bg-white shadow-[2px_2px_0_0_var(--color-cosmos)]">
                <Lightbulb className="size-6 text-emerald-900" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-900/70">
                  Habilidade Desbloqueada:
                </p>
                <p className="mt-1 text-sm font-black text-cosmos text-balance">{unlockedSkill}</p>
              </div>
            </article>
          </div>
        )}

        <section className="flex w-full flex-col gap-3 pt-1" aria-label="Compartilhar conquista">
          <p className="text-sm font-black text-cosmos">Mostre sua evolução e ganhe +10 XP!</p>

          <button
            type="button"
            onClick={() => void handleInstagramShare()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-cosmos bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-4 py-3.5 text-sm font-black text-white shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none"
          >
            <InstagramGlyph />
            Compartilhar nos Stories
          </button>

          <button
            type="button"
            onClick={handleLinkedInShare}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-cosmos bg-[#0077B5] px-4 py-3.5 text-sm font-black text-white shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-y-1 active:shadow-none"
          >
            <LinkedInGlyph />
            Postar no LinkedIn
          </button>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className="bg-transparent py-1 text-sm font-bold text-cosmos/50 underline decoration-cosmos/25 underline-offset-4 transition-colors hover:text-cosmos"
        >
          Continuar aprendendo
        </button>
      </div>
    </dialog>
  )
}
