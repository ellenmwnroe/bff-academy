"use client"

import { useRouter } from "next/navigation"
import { LessonOverviewView } from "../../components/lesson-overview-view"

export default function LessonOverviewPage() {
  const router = useRouter()

  return (
    <LessonOverviewView
      onStartExercise={() => router.push("/exercise")}
      onBack={() => router.push("/home")}
    />
  )
}
