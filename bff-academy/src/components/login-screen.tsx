"use client"

import { ArrowRight, Sparkles, Mail, Lock } from "lucide-react"

export function LoginScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-varden p-5">
      <div className="w-full max-w-md rounded-[28px] border-[3px] border-cosmos bg-card p-6 shadow-[6px_6px_0_0_var(--color-cosmos)] md:p-8">
        {/* Header Gamificado */}
        <div className="mb-8 space-y-3 text-center">
          <div className="mb-4 mx-auto flex size-16 items-center justify-center rounded-2xl border-[3px] border-cosmos bg-marble shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <Sparkles className="size-8 fill-varden text-varden" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-3xl tracking-tight text-cosmos">Welcome Back!</h1>
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Pronto para continuar sua jornada?
          </p>
        </div>

        <div className="space-y-6">
          {/* Botão Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-cosmos border-b-[5px] bg-card px-6 py-3.5 text-base font-extrabold text-cosmos transition-all hover:bg-muted active:translate-y-1 active:border-b-2"
          >
            {/* Ícone customizado do Google */}
            <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar com Google
          </button>

          {/* Divisor */}
          <div className="relative flex items-center py-2">
            <div className="grow border-t-2 border-muted"></div>
            <span className="shrink-0 px-4 text-xs font-bold uppercase text-muted-foreground">
              Ou use seu email
            </span>
            <div className="grow border-t-2 border-muted"></div>
          </div>

          {/* Formulário */}
          <div className="space-y-4">
            {/* Input E-mail */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="ml-1 font-bold text-cosmos">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cosmos"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="student@bffacademy.com"
                  className="h-14 w-full rounded-2xl border-[3px] border-cosmos bg-card pl-12 pr-4 font-bold text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)] placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-marble/30 transition-all"
                />
              </div>
            </div>

            {/* Input Senha */}
            <div className="space-y-1.5">
              <div className="ml-1 flex items-center justify-between">
                <label htmlFor="password" className="font-bold text-cosmos">
                  Senha
                </label>
                <button
                  type="button"
                  className="text-sm font-bold text-marble transition-colors hover:text-cosmos focus:outline-none"
                >
                  Esqueci a senha
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cosmos"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-14 w-full rounded-2xl border-[3px] border-cosmos bg-card pl-12 pr-4 font-bold tracking-widest text-cosmos shadow-[3px_3px_0_0_var(--color-cosmos)] placeholder:tracking-normal placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-marble/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Botão de Entrar */}
          <button
            type="button"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gochujang border-b-[6px] bg-crimson px-6 py-4 text-lg font-extrabold text-varden transition-all hover:brightness-110 active:translate-y-1 active:border-b-2"
          >
            Entrar no Portal
            <ArrowRight className="size-6" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
