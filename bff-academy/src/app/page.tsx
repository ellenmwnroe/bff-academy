"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "../components/splash-screen"
import { LoginScreen } from "../components/login-screen"

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash")
    if (hasSeenSplash) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem("hasSeenSplash", "true")
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return <LoginScreen />
}
