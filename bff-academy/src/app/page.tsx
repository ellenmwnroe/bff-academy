"use client"

import { useState } from "react"
import { SplashScreen } from "../components/splash-screen"
import { LoginScreen } from "../components/login-screen"

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return <LoginScreen />
}
