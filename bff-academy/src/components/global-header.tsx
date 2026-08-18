"use client"

import { User, Flame, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type GlobalHeaderProps = {
  readonly streakCount?: number
  readonly livesCount?: number
  readonly avatarUrl?: string
  readonly onAvatarClick?: () => void
  readonly onStreakClick?: () => void
  readonly onLivesClick?: () => void
}

export function GlobalHeader({
  streakCount = 12,
  livesCount = 5,
  avatarUrl,
  onAvatarClick,
  onStreakClick,
  onLivesClick,
}: GlobalHeaderProps) {
  const [avatarError, setAvatarError] = useState(false)

  return (
    <header className="flex items-center justify-between px-4 py-4">
      {/* Avatar - Left Side */}
      <button
        type="button"
        onClick={onAvatarClick}
        className="group relative size-14 overflow-hidden rounded-full border-[3px] border-cosmos bg-marble shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all hover:brightness-95 active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--color-cosmos)]"
        aria-label="Perfil do usuário"
      >
        {avatarUrl && !avatarError ? (
          <Image
            src={avatarUrl}
            alt="Avatar do usuário"
            fill
            className="object-cover"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <User className="size-7 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
          </div>
        )}
      </button>

      {/* Status Area - Right Side */}
      <div className="flex items-center gap-2">
        {/* Streak Badge */}
        <button
          type="button"
          onClick={onStreakClick}
          className="flex items-center gap-1.5 rounded-full border-[3px] border-cosmos bg-card px-3 py-1.5 shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all hover:-translate-y-0.5 hover:shadow-[2px_3px_0_0_var(--color-cosmos)] active:translate-y-0 active:shadow-[1px_1px_0_0_var(--color-cosmos)]"
          aria-label={`Ofensiva de ${streakCount} dias`}
        >
          <Flame 
            className="size-5 fill-gochujang text-gochujang" 
            strokeWidth={2} 
            aria-hidden="true" 
          />
          <span className="font-serif text-base font-bold text-cosmos">
            {streakCount}
          </span>
        </button>

        {/* Lives Badge */}
        <button
          type="button"
          onClick={onLivesClick}
          className="flex items-center gap-1.5 rounded-full border-[3px] border-cosmos bg-card px-3 py-1.5 shadow-[2px_2px_0_0_var(--color-cosmos)] transition-all hover:-translate-y-0.5 hover:shadow-[2px_3px_0_0_var(--color-cosmos)] active:translate-y-0 active:shadow-[1px_1px_0_0_var(--color-cosmos)]"
          aria-label={`${livesCount} vidas restantes`}
        >
          <Heart 
            className="size-5 fill-crimson text-crimson" 
            strokeWidth={2} 
            aria-hidden="true" 
          />
          <span className="font-serif text-base font-bold text-cosmos">
            {livesCount}
          </span>
        </button>
      </div>
    </header>
  )
}
