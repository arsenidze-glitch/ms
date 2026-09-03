"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Building2, User } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { customers, currency } from "@/lib/data"

export default function CustomersPage() {
  const [query, setQuery] = useState("")

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query) ||
      c.email.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        title="Клиенты"
        subtitle={`Всего клиентов: ${customers.length}`}
        actions={
          <Link href="/customers/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-4" />
            Клиент
          </Link>
        }
      />

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по имени, телефону, email"
          className="ms-input pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Клиент</th>
                <th className="px-4 py-3 font-medium">Телефон</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Город</th>
                <th className="px-4 py-3 text-right font-medium">Заказов</th>
                <th className="px-4 py-3 text-right font-medium">Баланс</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="group border-b border-border last:border-0 hover:bg-accent/40"
                >
                  <td className="px-4 py-3">
                    <Link href={`/customers/${c.id}`} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {c.type === "company" ? (
                          <Building2 className="size-4" />
                        ) : (
                          <User className="size-4" />
                        )}
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium text-foreground group-hover:text-primary">
                          {c.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {c.type === "company" ? "Юр. лицо" : "Физ. лицо"}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.city}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{c.orders}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        c.balance < 0
                          ? "font-medium text-destructive"
                          : c.balance > 0
                            ? "font-medium text-emerald-600"
                            : "text-muted-foreground"
                      }
                    >
                      {currency(c.balance)}
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
