import type { ReactNode } from "react"
import { AdminSidebar } from "../../components/admin/admin-sidebar"

export default function AdminLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDF6E3]">
      <AdminSidebar />
      <main className="ml-64 flex flex-col gap-8 p-8">{children}</main>
    </div>
  )
}
