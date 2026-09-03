"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { currency, type StockDoc } from "@/lib/data"

export function StockDocTable({
  title,
  subtitle,
  docs,
  addLabel,
  accent,
}: {
  title: string
  subtitle: string
  docs: StockDoc[]
  addLabel: string
  accent: "in" | "out"
}) {
  const [query, setQuery] = useState("")

  const filtered = docs.filter(
    (d) =>
      d.number.includes(query) ||
      d.warehouse.toLowerCase().includes(query.toLowerCase()) ||
      d.comment.toLowerCase().includes(query.toLowerCase()),
  )

  const total = filtered.reduce((sum, d) => sum + d.total, 0)

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <button className={buttonVariants({ size: "sm" })} type="button">
            <Plus className="size-4" />
            {addLabel}
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по номеру, складу, комментарию"
            className="ms-input pl-9"
          />
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-2 text-sm">
          <span className="text-muted-foreground">Сумма за период: </span>
          <span className={"font-semibold " + (accent === "in" ? "text-emerald-600" : "text-destructive")}>
            {accent === "out" ? "−" : ""}
            {currency(total)}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">№</th>
                <th className="px-4 py-3 font-medium">Дата</th>
                <th className="px-4 py-3 font-medium">Склад</th>
                <th className="px-4 py-3 text-right font-medium">Позиций</th>
                <th className="px-4 py-3 text-right font-medium">Сумма</th>
                <th className="px-4 py-3 font-medium">Ответственный</th>
                <th className="px-4 py-3 font-medium">Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium text-primary">{d.number}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{d.date}</td>
                  <td className="px-4 py-3 text-foreground">{d.warehouse}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{d.positions}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{currency(d.total)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.owner}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.comment || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
