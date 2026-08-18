"use client"

import { LessonCompletedView } from "../../components/lesson-completed-view"

export default function LessonCompletedPage() {
  return (
    <LessonCompletedView
      xpGained={75}
      accuracy={92}
      timeSpent="5:45"
      onContinue={() => {
        alert("Voltando para o dashboard! (Será implementado)")
        window.history.back()
      }}
    />
  )
}
