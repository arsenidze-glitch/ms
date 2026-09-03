"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { products, currency, currencySymbol, number } from "@/lib/data"

export default function ProductsPage() {
  const [query, setQuery] = useState("")

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.barcode.includes(query),
  )

  return (
    <div>
      <PageHeader
        title="Товары"
        subtitle={`Всего позиций: ${products.length}`}
        actions={
          <Link href="/products/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="size-4" />
            Товар
          </Link>
        }
      />

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по названию, артикулу, штрихкоду"
          className="ms-input pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Товар</th>
                <th className="px-4 py-3 font-medium">Артикул</th>
                <th className="px-4 py-3 font-medium">Штрихкод</th>
                <th className="px-4 py-3 text-right font-medium">Закупка</th>
                <th className="px-4 py-3 text-right font-medium">Продажа</th>
                <th className="px-4 py-3 text-right font-medium">Остаток</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="group border-b border-border last:border-0 hover:bg-accent/40"
                >
                  <td className="px-4 py-3">
                    <Link href={`/products/${p.id}`} className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
                        <Image
                          src={p.photo || "/placeholder.svg"}
                          alt={p.name}
                          width={44}
                          height={44}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium text-foreground group-hover:text-primary">
                          {p.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{p.category}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.barcode}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {number(p.purchasePrice)} {currencySymbol[p.purchaseCurrency]}
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">
                    {currency(p.salePrice)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        p.stock === 0
                          ? "font-medium text-destructive"
                          : "tabular-nums text-foreground"
                      }
                    >
                      {p.stock} {p.unit}
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
