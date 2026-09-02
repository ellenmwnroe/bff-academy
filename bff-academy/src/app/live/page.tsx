"use client"

import { useRouter } from "next/navigation"
import { LiveClassView } from "../../components/live-class-view"

export default function LivePage() {
  const router = useRouter()

  return <LiveClassView teacherName="Prof. Marina" onLeave={() => router.push("/calendar")} />
}
