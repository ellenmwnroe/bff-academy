/**
 * Camada de dados dos horários de reposição.
 *
 * Hoje os dados são mockados, mas o formato já é o que a API deve devolver:
 * datas em ISO (e não strings formatadas) e vagas explícitas. Quando o backend
 * existir, basta trocar o corpo de `fetchMakeupSlots` — a interface não muda.
 */

export type MakeupSlot = {
  readonly id: string
  /** ISO 8601. A formatação é responsabilidade da camada de UI. */
  readonly startsAt: string
  readonly endsAt: string
  readonly title: string
  readonly teacherName: string
  /** `null` quando a reposição é individual (sem limite de turma). */
  readonly spotsLeft: number | null
}

const MOCK_LATENCY_MS = 400

function slotDate(dayOffset: number, hour: number, minute = 0) {
  const now = new Date()
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dayOffset,
    hour,
    minute,
  )
}

function buildMockSlots(): ReadonlyArray<MakeupSlot> {
  return [
    {
      id: "slot-1",
      startsAt: slotDate(3, 10).toISOString(),
      endsAt: slotDate(3, 11).toISOString(),
      title: "Reposição · Conversação",
      teacherName: "Prof. Marina",
      spotsLeft: 2,
    },
    {
      id: "slot-2",
      startsAt: slotDate(4, 18).toISOString(),
      endsAt: slotDate(4, 19).toISOString(),
      title: "Reposição · Gramática",
      teacherName: "Prof. Lucas",
      spotsLeft: null,
    },
    {
      id: "slot-3",
      startsAt: slotDate(7, 14).toISOString(),
      endsAt: slotDate(7, 15).toISOString(),
      title: "Reposição · Speaking",
      teacherName: "Prof. Kate",
      spotsLeft: 1,
    },
  ]
}

/**
 * Busca os horários que o professor abriu e que ainda têm vaga.
 *
 * A disponibilidade real virá do cadastro do professor cruzado com as aulas já
 * ocupadas. A confirmação precisa revalidar a vaga no servidor: dois alunos
 * podem escolher o mesmo horário ao mesmo tempo.
 */
export async function fetchMakeupSlots(): Promise<ReadonlyArray<MakeupSlot>> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
  return buildMockSlots()
}

const MONTH_NAMES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

function formatHour(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

export function formatSlotDate(slot: MakeupSlot) {
  const date = new Date(slot.startsAt)
  return `${date.getDate()} de ${MONTH_NAMES[date.getMonth()]}`
}

export function formatSlotTimeRange(slot: MakeupSlot) {
  return `${formatHour(new Date(slot.startsAt))} - ${formatHour(new Date(slot.endsAt))}`
}
