"use client"

import { useRouter } from "next/navigation"
import { FillInTheBlankView } from "../../components/exercises/fill-in-the-blank-view"

export default function FillInTheBlankPage() {
  const router = useRouter()

  const sampleExercise = {
    sentence: "I usually ___ up early at 7 AM.",
    blankPosition: 10,
    correctAnswer: "wake",
    wordBank: ["wake", "woke", "waking", "sleep"],
  }

  return (
    <FillInTheBlankView
      sentence={sampleExercise.sentence}
      blankPosition={sampleExercise.blankPosition}
      correctAnswer={sampleExercise.correctAnswer}
      wordBank={sampleExercise.wordBank}
      progress={60}
      lives={4}
      onClose={() => router.push("/home")}
      onContinue={() => router.push("/speaking")}
    />
  )
}
