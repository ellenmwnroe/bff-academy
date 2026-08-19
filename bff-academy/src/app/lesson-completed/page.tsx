"use client"

import { useRouter } from "next/navigation"
import { LessonCompletedView } from "../../components/lesson-completed-view"

export default function LessonCompletedPage() {
  const router = useRouter()

  return (
    <LessonCompletedView
      xpGained={75}
      accuracy={92}
      timeSpent="5:45"
      onContinue={() => router.push("/home")}
    />
  )
}
