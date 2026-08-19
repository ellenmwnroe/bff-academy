"use client"

import { useRouter } from "next/navigation"
import { SpeakingView } from "../../components/exercises/speaking-view"

export default function SpeakingPage() {
  const router = useRouter()

  return (
    <SpeakingView
      targetPhrase="How are you doing today?"
      progress={90}
      lives={5}
      onClose={() => router.push("/home")}
      onContinue={() => router.push("/lesson-completed")}
      onRecordStart={() => console.log("Recording started")}
      onRecordStop={() => console.log("Recording stopped")}
    />
  )
}
