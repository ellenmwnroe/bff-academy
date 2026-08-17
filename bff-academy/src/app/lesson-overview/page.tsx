"use client"

import { useRouter } from "next/navigation"
import { LessonOverviewView } from "../../components/lesson-overview-view"

export default function LessonOverviewPage() {
  const router = useRouter()

  return (
    <LessonOverviewView
      onStartExercise={() => {
        // Navegar para a rota de exercícios quando implementada
        // router.push('/lesson/practice')
        alert("Começando a lição! (Navegação será implementada)")
      }}
      onBack={() => router.back()}
    />
  )
}
