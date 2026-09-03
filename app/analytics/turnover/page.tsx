import { PageHeader } from "@/components/page-header"
import { turnover, currency, number } from "@/lib/data"

export default function TurnoverPage() {
  const totalRevenue = turnover.reduce((sum, r) => sum + r.revenue, 0)
  const totalIncoming = turnover.reduce((sum, r) => sum + r.incoming, 0)
  const totalOutgoing = turnover.reduce((sum, r) => sum + r.outgoing, 0)

  const cards = [
    { label: "Выручка за период", value: currency(totalRevenue) },
    { label: "Поступило, шт", value: number(totalIncoming) },
    { label: "Продано / отгружено, шт", value: number(totalOutgoing) },
  ]

  return (
    <div>
      <PageHeader title="Обороты" subtitle="Движение товаров за период: 01.09 — 03.09.2026" />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Товар</th>
                <th className="px-4 py-3 font-medium">Артикул</th>
                <th className="px-4 py-3 text-right font-medium">Нач. остаток</th>
                <th className="px-4 py-3 text-right font-medium">Приход</th>
                <th className="px-4 py-3 text-right font-medium">Расход</th>
                <th className="px-4 py-3 text-right font-medium">Кон. остаток</th>
                <th className="px-4 py-3 text-right font-medium">Выручка</th>
              </tr>
            </thead>
            <tbody>
              {turnover.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.sku}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{r.opening}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-emerald-600">+{r.incoming}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-destructive">−{r.outgoing}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{r.closing}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{currency(r.revenue)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-muted/30 font-semibold">
                <td className="px-4 py-3" colSpan={6}>
                  Итого выручка
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{currency(totalRevenue)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
