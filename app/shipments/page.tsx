"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { shipments, shipmentStatusMeta, currency, number } from "@/lib/data"

export default function ShipmentsListPage() {
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return shipments
    return shipments.filter(
      (s) =>
        s.number.toLowerCase().includes(q) ||
        s.counterparty.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q),
    )
  }, [query])

  const totalSum = rows.reduce((acc, s) => acc + s.total, 0)

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Отгрузки клиентам"
        subtitle={`Всего документов: ${shipments.length}`}
        actions={
          <Link href="/shipments/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-4" />
            Отгрузка
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-64 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: №, контрагент, телефон, город…"
            className="ms-input pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Фильтр
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[1100px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2.5 font-medium">№</th>
              <th className="px-3 py-2.5 font-medium">Время</th>
              <th className="px-3 py-2.5 font-medium">Контрагент</th>
              <th className="px-3 py-2.5 text-right font-medium">Сумма</th>
              <th className="px-3 py-2.5 text-right font-medium">Оплачено</th>
              <th className="px-3 py-2.5 font-medium">Статус</th>
              <th className="px-3 py-2.5 font-medium">Комментарий</th>
              <th className="px-3 py-2.5 font-medium">Телефон</th>
              <th className="px-3 py-2.5 font-medium">Доставка</th>
              <th className="px-3 py-2.5 font-medium">Город НП</th>
              <th className="px-3 py-2.5 font-medium">Трек</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => {
              const meta = shipmentStatusMeta[s.status]
              return (
                <tr
                  key={s.id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                >
                  <td className="px-3 py-2.5">
                    <Link
                      href={`/shipments/${s.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {s.number}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{s.createdAt}</td>
                  <td className="px-3 py-2.5">
                    <Link href={`/shipments/${s.id}`} className="text-foreground hover:text-primary">
                      {s.counterparty}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right font-medium tabular-nums text-foreground">
                    {number(s.total)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                    {number(s.paid)}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge label={meta.label} tone={meta.tone} />
                  </td>
                  <td className="max-w-40 truncate px-3 py-2.5 text-muted-foreground">{s.comment || "—"}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 tabular-nums text-foreground">{s.phone}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{s.delivery}</td>
                  <td className="max-w-56 truncate px-3 py-2.5 text-foreground">{s.city}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{s.track || "—"}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-muted/40 text-sm">
              <td className="px-3 py-2.5 font-medium text-foreground" colSpan={3}>
                Итого по {rows.length} документам
              </td>
              <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-foreground">
                {currency(totalSum)}
              </td>
              <td colSpan={7} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
