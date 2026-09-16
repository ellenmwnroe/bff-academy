"use client"

import { useRouter } from "next/navigation"
import { ErrorClinicFlow } from "../../components/gamification/ErrorClinicFlow"

export default function ErrorClinicPage() {
  const router = useRouter()

  return <ErrorClinicFlow onComplete={() => router.push("/home")} />
}
