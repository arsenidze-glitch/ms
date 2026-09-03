"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { stock, currency, number } from "@/lib/data"

export default function StockPage() {
  const [query, setQuery] = useState("")

  const filtered = stock.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.sku.toLowerCase().includes(query.toLowerCase()),
  )

  const totalCost = filtered.reduce((sum, s) => sum + s.inStock * s.cost, 0)

  return (
    <div>
      <PageHeader title="Остатки" subtitle="Товарные остатки по складам" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по товару или артикулу"
            className="ms-input pl-9"
          />
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-2 text-sm">
          <span className="text-muted-foreground">Себестоимость остатков: </span>
          <span className="font-semibold text-foreground">{currency(totalCost)}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Товар</th>
                <th className="px-4 py-3 font-medium">Артикул</th>
                <th className="px-4 py-3 font-medium">Склад</th>
                <th className="px-4 py-3 text-right font-medium">На складе</th>
                <th className="px-4 py-3 text-right font-medium">Резерв</th>
                <th className="px-4 py-3 text-right font-medium">Доступно</th>
                <th className="px-4 py-3 text-right font-medium">Себестоимость</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id + s.warehouse} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.sku}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.warehouse}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    <span className={s.inStock === 0 ? "font-medium text-destructive" : ""}>
                      {s.inStock} {s.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-amber-600">{s.reserved}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{s.available}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {number(s.inStock * s.cost)} ₽
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
