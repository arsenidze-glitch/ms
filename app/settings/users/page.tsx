import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { users } from "@/lib/data"

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Пользователи"
        subtitle="Сотрудники и права доступа"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Настройки
            </Link>
            <button className={buttonVariants({ size: "sm" })} type="button">
              <Plus className="size-4" />
              Пользователь
            </button>
          </div>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Сотрудник</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Роль</th>
                <th className="px-4 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {u.name
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <span className="font-medium text-foreground">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 text-foreground">{u.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium " +
                        (u.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground")
                      }
                    >
                      <span
                        className={
                          "h-1.5 w-1.5 rounded-full " + (u.active ? "bg-emerald-500" : "bg-muted-foreground")
                        }
                      />
                      {u.active ? "Активен" : "Заблокирован"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
