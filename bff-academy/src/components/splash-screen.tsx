"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function SplashScreen({ onComplete }: { readonly onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-varden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 2000)
      }}
    >
      {/* Logo Container com efeito Bento Box */}
      <motion.div
        className="relative rounded-4xl border-4 border-cosmos bg-card p-8 shadow-[8px_8px_0_0_var(--color-cosmos)]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8,
        }}
      >
        {/* Decorative floating sparkles */}
        <motion.div
          className="absolute -left-4 -top-4"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="rounded-full border-[3px] border-cosmos bg-crimson p-2 shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <Sparkles className="size-6 fill-varden text-varden" />
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -right-4"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="rounded-full border-[3px] border-cosmos bg-marble p-2 shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <Sparkles className="size-6 fill-varden text-varden" />
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="relative size-32"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <div className="grid size-full place-items-center rounded-2xl border-[3px] border-cosmos bg-marble shadow-[4px_4px_0_0_var(--color-cosmos)]">
            <Image
              src="/bff-logo.png"
              alt="BFF Academy"
              width={80}
              height={80}
              className="size-20"
              priority
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  const fallback = document.createElement("span")
                  fallback.className = "font-serif text-4xl font-bold text-cosmos"
                  fallback.textContent = "BFF"
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Brand Name */}
      <motion.div
        className="mt-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl font-bold text-cosmos">BFF Academy</h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-cosmos/70">
          Sua jornada começa aqui
        </p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="mt-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-3 rounded-full bg-cosmos"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
