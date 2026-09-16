"use client"

import { Menu, Zap } from "lucide-react"

const MAX_ENERGY = 5
const LEVEL_LABEL = "Flex 1"
const LEVEL_PROGRESS = 80

type EnergyCardProps = {
  readonly energy: number
  readonly maxEnergy?: number
  readonly isPremium?: boolean
}

export function EnergyCard({
  energy,
  maxEnergy = MAX_ENERGY,
  isPremium = false,
}: EnergyCardProps) {
  if (isPremium) {
    return (
      <div
        className="flex items-center gap-1.5 rounded-2xl border-[3px] border-yellow-500 bg-yellow-50 px-3 py-2 shadow-[4px_4px_0_0_#ca8a04]"
        aria-label="Energia infinita de assinante Premium"
      >
        <Zap className="size-5 fill-yellow-500 text-yellow-500" strokeWidth={2.5} aria-hidden="true" />
        <span className="font-serif text-xl font-bold leading-none text-yellow-600">∞</span>
      </div>
    )
  }

  const isEmpty = energy === 0

  let cardTone = "border-cosmos bg-card text-cosmos shadow-[4px_4px_0_0_var(--color-cosmos)]"
  if (isEmpty) {
    cardTone = "animate-pulse border-red-500 bg-red-50 text-red-500 shadow-[4px_4px_0_0_#ef4444]"
  }

  return (
    <div
      className={`flex items-center gap-1.5 rounded-2xl border-[3px] px-3 py-2 ${cardTone}`}
      aria-label={isEmpty ? "Sem energia" : `Energia ${energy} de ${maxEnergy}`}
    >
      <Zap
        className={isEmpty ? "size-5 fill-red-500 text-red-500" : "size-5 fill-yellow-500 text-yellow-500"}
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <div className="leading-tight">
        <p className="font-serif text-base font-bold">
          {energy}/{maxEnergy}
        </p>
        {isEmpty ? <p className="text-[10px] font-bold uppercase tracking-wide">Sem energia!</p> : null}
      </div>
    </div>
  )
}

type StudentHeaderProps = {
  readonly energy?: number
}

export function StudentHeader({ energy = MAX_ENERGY }: StudentHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 bg-varden p-4">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          className="grid size-10 shrink-0 place-items-center rounded-2xl border-[3px] border-cosmos bg-card shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-cosmos)]"
          aria-label="Abrir menu"
        >
          <Menu className="size-5 text-cosmos" strokeWidth={2.5} aria-hidden="true" />
        </button>
        <p className="truncate font-serif text-lg font-bold text-cosmos sm:text-xl">BFF Academy</p>
      </div>

      <div className="flex min-w-0 max-w-38 flex-1 flex-col gap-1 rounded-2xl border-[3px] border-cosmos bg-card px-3 py-2 shadow-[4px_4px_0_0_var(--color-cosmos)] sm:max-w-44">
        <p className="text-center font-serif text-sm font-bold text-cosmos sm:text-base">{LEVEL_LABEL}</p>
        <progress
          value={LEVEL_PROGRESS}
          max={100}
          aria-label={`Progresso do ${LEVEL_LABEL}`}
          className="h-2 w-full overflow-hidden rounded-full border-2 border-cosmos bg-varden [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-varden [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-marble [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-marble"
        />
      </div>

      <EnergyCard energy={energy} />
    </header>
  )
}
