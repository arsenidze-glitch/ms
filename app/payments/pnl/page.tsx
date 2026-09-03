import { PageHeader } from "@/components/page-header"
import { pnl, currency } from "@/lib/data"

export default function PnlPage() {
  const net = pnl.find((r) => r.label === "Чистая прибыль")?.amount ?? 0
  const revenue = pnl.find((r) => r.kind === "revenue")?.amount ?? 0
  const margin = revenue ? Math.round((net / revenue) * 100) : 0

  return (
    <div>
      <PageHeader title="Прибыли и убытки" subtitle="Отчёт P&L за сентябрь 2026" />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Выручка</p>
          <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">
            {currency(revenue)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Чистая прибыль</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600 tabular-nums">
            {currency(net)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Рентабельность</p>
          <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{margin}%</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <tbody>
            {pnl.map((r) => {
              const isTotal = r.kind === "total"
              return (
                <tr
                  key={r.label}
                  className={
                    "border-b border-border last:border-0 " +
                    (isTotal ? "bg-muted/40 font-semibold" : "")
                  }
                >
                  <td className={"px-5 py-3 " + (isTotal ? "text-foreground" : "text-muted-foreground")}>
                    {r.label}
                  </td>
                  <td
                    className={
                      "px-5 py-3 text-right tabular-nums " +
                      (r.amount < 0
                        ? "text-destructive"
                        : isTotal
                          ? "text-emerald-600"
                          : "text-foreground")
                    }
                  >
                    {r.amount < 0 ? "−" : ""}
                    {currency(Math.abs(r.amount))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
