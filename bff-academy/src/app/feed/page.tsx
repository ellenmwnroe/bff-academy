"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageSquare, User } from "lucide-react"
import { BottomNav } from "../../components/bottom-nav"

type PostBadge = {
  readonly text: string
  readonly className: string
}

type Post = {
  readonly id: string
  readonly author: string
  readonly avatarUrl?: string
  readonly timeAgo: string
  readonly content: string
  readonly badge?: PostBadge
  readonly likes: number
  readonly comments: number
}

const mockPosts: ReadonlyArray<Post> = [
  {
    id: "1",
    author: "BFF Academy",
    avatarUrl: "/bff-logo.png",
    timeAgo: "há 1 hora",
    content:
      "Galera, na próxima sexta teremos Speaking Club aberto às 19h com a Teacher Sarah! Tema: viagens e aeroporto. Não precisa se inscrever, é só entrar pelo app.",
    badge: {
      text: "📢 Aviso oficial",
      className: "border-[#083344] bg-[#E8F1F5] text-[#083344]",
    },
    likes: 42,
    comments: 8,
  },
  {
    id: "2",
    author: "Marina Prado",
    timeAgo: "há 3 horas",
    content:
      "Finalmente cheguei no Nível 4! Confesso que o Present Perfect me quebrou por umas duas semanas, mas depois que caiu a ficha ficou tranquilo. Insistam, gente!",
    badge: {
      text: "🚀 Subiu para o Nível 4",
      className: "border-[#083344] bg-[#FDECEC] text-[#BE1622]",
    },
    likes: 27,
    comments: 12,
  },
  {
    id: "3",
    author: "Rafael Lima",
    timeAgo: "há 5 horas",
    content:
      "Alguém mais teve dificuldade com o exercício de pronúncia do TH? A IA nunca aceita meu 'think'. Alguma dica de como posicionar a língua?",
    likes: 15,
    comments: 23,
  },
  {
    id: "4",
    author: "Beatriz Alves",
    timeAgo: "ontem",
    content:
      "10 dias seguidos estudando sem falhar nenhum! Coloquei o app pra tocar às 8h da manhã e virou parte da rotina do café.",
    badge: {
      text: "🔥 Completou 10 dias de ofensiva!",
      className: "border-[#083344] bg-[#FDECEC] text-[#BE1622]",
    },
    likes: 58,
    comments: 6,
  },
]

function PostAvatar({ src, author }: { readonly src?: string; readonly author: string }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-[#083344] bg-[#5F9EA0]/20">
        <User className="size-6 text-[#083344]" strokeWidth={2.5} aria-hidden="true" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`Avatar de ${author}`}
      width={48}
      height={48}
      className="size-12 shrink-0 rounded-full border-[3px] border-[#083344] bg-white object-cover"
      onError={() => setHasError(true)}
    />
  )
}

function PostCard({ post }: { readonly post: Post }) {
  const [isLiked, setIsLiked] = useState(false)

  const likeCount = isLiked ? post.likes + 1 : post.likes

  return (
    <article className="mb-6 rounded-3xl border-[3px] border-[#083344] bg-white p-5 shadow-[4px_4px_0_0_#083344]">
      {/* Cabeçalho */}
      <header className="flex items-center gap-3">
        <PostAvatar src={post.avatarUrl} author={post.author} />
        <div className="min-w-0">
          <p className="truncate font-bold text-[#083344]">{post.author}</p>
          <p className="text-xs text-[#083344]/60">{post.timeAgo}</p>
        </div>
      </header>

      {/* Corpo */}
      {post.badge && (
        <span
          className={`mt-3 inline-block rounded-full border-2 px-3 py-1 text-xs font-bold ${post.badge.className}`}
        >
          {post.badge.text}
        </span>
      )}

      <p className="mt-3 text-[#083344]">{post.content}</p>

      {/* Rodapé de ações */}
      <div className="my-3 border-t-2 border-[#083344]/10" />

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => setIsLiked((liked) => !liked)}
          aria-pressed={isLiked}
          className={`flex items-center gap-2 font-bold transition-all active:scale-95 hover:text-[#BE1622] ${
            isLiked ? "text-[#BE1622]" : "text-[#083344]"
          }`}
        >
          <Heart
            className={`size-5 ${isLiked ? "fill-[#BE1622]" : ""}`}
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span className="text-sm">{likeCount}</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 font-bold text-[#083344] transition-all hover:text-[#5F9EA0] active:scale-95"
        >
          <MessageSquare className="size-5" strokeWidth={2.5} aria-hidden="true" />
          <span className="text-sm">{post.comments}</span>
        </button>
      </div>
    </article>
  )
}

export default function FeedPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FDF6E3] px-4 pb-28 pt-8">
      <h1 className="mb-6 text-2xl font-black text-[#083344]">Comunidade</h1>

      <section aria-label="Publicações da comunidade">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <BottomNav />
    </main>
  )
}
