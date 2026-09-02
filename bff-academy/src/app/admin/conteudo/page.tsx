"use client"

import { Plus, Headphones, UploadCloud, Play, Pencil, Trash2 } from "lucide-react"

type Lesson = {
  readonly id: string
  readonly fileName: string
  readonly duration: string
}

type CourseLevel = {
  readonly id: string
  readonly name: string
  readonly lessons: ReadonlyArray<Lesson>
}

const courseLevels: ReadonlyArray<CourseLevel> = [
  {
    id: "flex-1",
    name: "Flex 1 - Iniciante",
    lessons: [
      {
        id: "f1-l1",
        fileName: "Diálogo: Apresentações Pessoais.mp3",
        duration: "3:24",
      },
      {
        id: "f1-l2",
        fileName: "Diálogo: Números e Idade.mp3",
        duration: "2:51",
      },
    ],
  },
  {
    id: "flex-2",
    name: "Flex 2 - Básico",
    lessons: [
      {
        id: "f2-l1",
        fileName: "Diálogo: Rotina Diária.mp3",
        duration: "4:07",
      },
    ],
  },
  { id: "flex-3", name: "Flex 3 - Pré Intermediário", lessons: [] },
  { id: "flex-4", name: "Flex 4 - Intermediário 1", lessons: [] },
  { id: "flex-5", name: "Flex 5 - Intermediário 2", lessons: [] },
]

export default function AdminContentPage() {
  return (
    <>
        {/* Cabeçalho */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#083344]">
              Gestão de Conteúdo e Turmas
            </h1>
            <p className="mt-1 text-sm font-medium text-[#083344]/60">
              Materiais de áudio organizados por nível do curso
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border-[3px] border-[#083344] bg-[#083344] px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
          >
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
            Novo Material
          </button>
        </header>

        {/* Níveis */}
        <div className="flex flex-col gap-6">
          {courseLevels.map((level) => (
            <section
              key={level.id}
              aria-labelledby={`${level.id}-title`}
              className="rounded-2xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]"
            >
              {/* Cabeçalho do nível */}
              <div className="flex items-center justify-between gap-4">
                <h2 id={`${level.id}-title`} className="text-xl font-black text-[#083344]">
                  {level.name}
                </h2>

                <span className="rounded-full border-2 border-[#083344] bg-[#FDF6E3] px-3 py-1 text-xs font-bold text-[#083344]">
                  {level.lessons.length}{" "}
                  {level.lessons.length === 1 ? "conteúdo" : "conteúdos"}
                </span>
              </div>

              <h3 className="mb-3 mt-5 text-sm font-black uppercase tracking-wide text-[#083344]/60">
                Conteúdos Cadastrados
              </h3>

              {/* Lições */}
              {level.lessons.length === 0 ? (
                <p className="mb-4 text-sm font-medium text-[#083344]/50">
                  Nenhum material cadastrado neste nível ainda.
                </p>
              ) : (
                <ul className="mb-4 flex flex-col gap-3">
                  {level.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between gap-4 rounded-xl border-2 border-[#083344] bg-[#FDF6E3] p-3"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Headphones
                          className="size-5 shrink-0 text-[#083344]"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-bold text-[#083344]">
                            {lesson.fileName}
                          </span>
                          <span className="text-xs font-medium text-[#083344]/60">
                            {lesson.duration}
                          </span>
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-lg border-2 border-[#083344] bg-white px-3 py-1.5 text-xs font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                        >
                          <Play className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                          Ouvir
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-lg border-2 border-[#083344] bg-white px-3 py-1.5 text-xs font-bold text-[#083344] shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                        >
                          <Pencil className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                          Editar
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-lg border-2 border-[#083344] bg-[#BE1622] px-3 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0_0_#083344] transition-all active:translate-y-0.5 active:shadow-none"
                        >
                          <Trash2 className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                          Excluir
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Upload rápido */}
              <button
                type="button"
                className="flex w-full flex-col items-center gap-2 rounded-xl border-[3px] border-dashed border-[#083344]/50 bg-white p-6 text-center transition-all hover:border-[#083344] hover:bg-[#FDF6E3]"
              >
                <UploadCloud
                  className="size-7 text-[#083344]/60"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-[#083344]/70">
                  Arraste arquivos de áudio (.mp3) ou clique para fazer upload para{" "}
                  {level.name}
                </span>
              </button>
            </section>
          ))}
        </div>
    </>
  )
}
