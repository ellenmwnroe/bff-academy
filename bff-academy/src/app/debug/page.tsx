"use client"

import Link from "next/link"
import { Home, BookOpen, Play, Sparkles } from "lucide-react"

export default function DebugMenu() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-varden p-8">
      <div className="text-center">
        <div className="mb-4 inline-flex size-20 items-center justify-center rounded-2xl border-[3px] border-cosmos bg-marble shadow-[4px_4px_0_0_var(--color-cosmos)]">
          <Sparkles className="size-10 fill-varden text-varden" />
        </div>
        <h1 className="font-serif text-4xl text-cosmos">Menu de Testes</h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-cosmos/70">
          Navegue entre as telas do app
        </p>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl border-[3px] border-cosmos bg-card px-6 py-4 font-bold text-cosmos shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-cosmos)]"
        >
          <Play className="size-6" />
          <div className="flex-1 text-left">
            <div>Splash + Login</div>
            <div className="text-xs font-normal text-cosmos/70">Tela inicial do app</div>
          </div>
        </Link>

        <Link
          href="/dev"
          className="flex items-center gap-3 rounded-2xl border-[3px] border-gochujang bg-crimson px-6 py-4 font-bold text-varden shadow-[4px_4px_0_0_var(--color-gochujang)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-gochujang)]"
        >
          <Home className="size-6" />
          <div className="flex-1 text-left">
            <div>Home View</div>
            <div className="text-xs font-normal text-varden/90">Dashboard principal</div>
          </div>
        </Link>

        <Link
          href="/lesson-overview"
          className="flex items-center gap-3 rounded-2xl border-[3px] border-cosmos bg-marble px-6 py-4 font-bold text-varden shadow-[4px_4px_0_0_var(--color-cosmos)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-cosmos)]"
        >
          <BookOpen className="size-6" />
          <div className="flex-1 text-left">
            <div>Lesson Overview</div>
            <div className="text-xs font-normal text-varden/90">Visão geral da lição</div>
          </div>
        </Link>
      </div>

      <div className="mt-4 rounded-2xl border-[3px] border-cosmos bg-varden p-4 text-center">
        <p className="text-xs font-bold text-cosmos">
          💡 Este menu é apenas para desenvolvimento
        </p>
      </div>
    </div>
  )
}
