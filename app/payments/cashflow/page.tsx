import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { cashFlows, currency } from "@/lib/data"

export default function CashflowPage() {
  const income = cashFlows.filter((c) => c.direction === "in").reduce((s, c) => s + c.amount, 0)
  const outcome = cashFlows.filter((c) => c.direction === "out").reduce((s, c) => s + c.amount, 0)
  const balance = income - outcome

  const cards = [
    { label: "Поступления", value: currency(income), tone: "text-emerald-600" },
    { label: "Списания", value: currency(outcome), tone: "text-destructive" },
    {
      label: "Чистый поток",
      value: currency(balance),
      tone: balance >= 0 ? "text-emerald-600" : "text-destructive",
    },
  ]

  return (
    <div>
      <PageHeader
        title="Движение денежных средств"
        subtitle="Поступления и списания по счетам и кассе"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className={"mt-1 text-2xl font-semibold tabular-nums " + c.tone}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Дата</th>
                <th className="px-4 py-3 font-medium">Операция</th>
                <th className="px-4 py-3 font-medium">Статья</th>
                <th className="px-4 py-3 font-medium">Контрагент</th>
                <th className="px-4 py-3 font-medium">Счёт</th>
                <th className="px-4 py-3 text-right font-medium">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {cashFlows.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{c.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium " +
                        (c.direction === "in"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700")
                      }
                    >
                      {c.direction === "in" ? (
                        <ArrowDownLeft className="size-3" />
                      ) : (
                        <ArrowUpRight className="size-3" />
                      )}
                      {c.direction === "in" ? "Приход" : "Расход"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{c.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.counterparty}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.account}</td>
                  <td
                    className={
                      "px-4 py-3 text-right font-medium tabular-nums " +
                      (c.direction === "in" ? "text-emerald-600" : "text-destructive")
                    }
                  >
                    {c.direction === "in" ? "+" : "−"}
                    {currency(c.amount)}
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
