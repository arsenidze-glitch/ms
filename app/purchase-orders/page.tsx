"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { purchaseOrders, orderStatusMeta, currency, number } from "@/lib/data"

export default function PurchaseOrdersListPage() {
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return purchaseOrders
    return purchaseOrders.filter(
      (o) =>
        o.number.toLowerCase().includes(q) ||
        o.supplier.toLowerCase().includes(q) ||
        o.warehouse.toLowerCase().includes(q),
    )
  }, [query])

  const totalSum = rows.reduce((acc, o) => acc + o.total, 0)

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Заказы поставщикам"
        subtitle={`Всего документов: ${purchaseOrders.length}`}
        actions={
          <Link href="/purchase-orders/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-4" />
            Заказ
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-64 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: №, поставщик, склад…"
            className="ms-input pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Фильтр
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">№</th>
              <th className="px-4 py-2.5 font-medium">Дата</th>
              <th className="px-4 py-2.5 font-medium">Поставщик</th>
              <th className="px-4 py-2.5 font-medium">Склад</th>
              <th className="px-4 py-2.5 text-right font-medium">Сумма</th>
              <th className="px-4 py-2.5 text-right font-medium">Оплачено</th>
              <th className="px-4 py-2.5 font-medium">Статус</th>
              <th className="px-4 py-2.5 font-medium">Ответственный</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => {
              const meta = orderStatusMeta[o.status]
              return (
                <tr
                  key={o.id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                >
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/purchase-orders/${o.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {o.number}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">{o.createdAt}</td>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/purchase-orders/${o.id}`}
                      className="text-foreground hover:text-primary"
                    >
                      {o.supplier}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{o.warehouse}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium tabular-nums text-foreground">
                    {number(o.total)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                    {number(o.paid)}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge label={meta.label} tone={meta.tone} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">{o.owner}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-muted/40 text-sm">
              <td className="px-4 py-2.5 font-medium text-foreground" colSpan={4}>
                Итого по {rows.length} заказам
              </td>
              <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-foreground">
                {currency(totalSum)}
              </td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
