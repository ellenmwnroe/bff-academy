"use client"

import { SpeakingView } from "../../components/exercises/speaking-view"

export default function SpeakingPage() {
  return (
    <SpeakingView
      targetPhrase="How are you doing today?"
      progress={75}
      lives={5}
      onClose={() => window.history.back()}
      onContinue={() => alert("Próximo exercício! (Será implementado)")}
      onRecordStart={() => console.log("Recording started")}
      onRecordStop={() => console.log("Recording stopped")}
    />
  )
}
