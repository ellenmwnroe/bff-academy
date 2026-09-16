"use client"

import { useRouter } from "next/navigation"
import { PostActivityModal } from "../../components/gamification/PostActivityModal"

export default function LessonCompletedPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-varden">
      <PostActivityModal isOpen onContinue={() => router.push("/home")} />
    </main>
  )
}
