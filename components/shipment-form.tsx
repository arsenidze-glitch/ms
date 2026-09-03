"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plus, Trash2, Printer, Save, User, Truck, ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { currency, shipmentStatusMeta, type Shipment, type Line } from "@/lib/data"

const emptyLines: Line[] = [{ id: 1, name: "", qty: 1, price: 0 }]

export function ShipmentForm({ shipment }: { shipment?: Shipment }) {
  const [lines, setLines] = useState<Line[]>(shipment?.items ?? emptyLines)

  const addLine = () => setLines((prev) => [...prev, { id: Date.now(), name: "", qty: 1, price: 0 }])
  const removeLine = (id: number) => setLines((prev) => prev.filter((l) => l.id !== id))
  const updateLine = (id: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  const total = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.price, 0), [lines])
  const meta = shipment ? shipmentStatusMeta[shipment.status] : null

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/shipments"
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        К списку отгрузок
      </Link>

      <PageHeader
        title={shipment ? `Отгрузка № ${shipment.number}` : "Новая отгрузка"}
        subtitle={shipment ? `от ${shipment.createdAt}` : "Черновик · не проведён"}
        actions={
          <>
            {meta && <StatusBadge label={meta.label} tone={meta.tone} />}
            <Button variant="outline" size="sm">
              <Printer className="size-4" />
              Печать
            </Button>
            <Button size="sm">
              <Save className="size-4" />
              Провести
            </Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <User className="size-4 text-primary" />
            Клиент
          </h2>
          <div className="grid gap-3">
            <div>
              <label className="ms-label">ФИО / Организация</label>
              <input className="ms-input" defaultValue={shipment?.counterparty ?? ""} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="ms-label">Телефон</label>
                <input className="ms-input" defaultValue={shipment?.phone ?? ""} />
              </div>
              <div>
                <label className="ms-label">Контактное лицо</label>
                <input className="ms-input" defaultValue={shipment?.contactPerson ?? ""} />
              </div>
            </div>
            <div>
              <label className="ms-label">E-mail</label>
              <input className="ms-input" defaultValue={shipment?.email ?? ""} />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Truck className="size-4 text-primary" />
            Доставка
          </h2>
          <div className="grid gap-3">
            <div>
              <label className="ms-label">Город</label>
              <input className="ms-input" defaultValue={shipment?.city ?? ""} placeholder="Город доставки" />
            </div>
            <div>
              <label className="ms-label">Адрес доставки</label>
              <input className="ms-input" defaultValue={shipment?.address ?? ""} placeholder="Улица, дом, отделение" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="ms-label">Способ доставки</label>
                <select className="ms-input" defaultValue={shipment?.delivery ?? "Почта"}>
                  <option>Почта</option>
                  <option>Курьер</option>
                  <option>Самовывоз</option>
                  <option>Транспортная компания</option>
                </select>
              </div>
              <div>
                <label className="ms-label">Трек-номер</label>
                <input className="ms-input" defaultValue={shipment?.track ?? ""} placeholder="—" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Товары</h2>
          <Button variant="outline" size="sm" onClick={addLine}>
            <Plus className="size-4" />
            Добавить позицию
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Наименование</th>
                <th className="w-24 px-3 py-3 text-right font-medium">Кол-во</th>
                <th className="w-32 px-3 py-3 text-right font-medium">Цена</th>
                <th className="w-36 px-3 py-3 text-right font-medium">Сумма</th>
                <th className="w-12 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id} className="border-b border-border/60 last:border-0">
                  <td className="px-5 py-2.5">
                    <input
                      className="ms-input"
                      value={l.name}
                      placeholder="Название товара"
                      onChange={(e) => updateLine(l.id, { name: e.target.value })}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <input
                      type="number"
                      min={0}
                      className="ms-input text-right"
                      value={l.qty}
                      onChange={(e) => updateLine(l.id, { qty: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <input
                      type="number"
                      min={0}
                      className="ms-input text-right"
                      value={l.price}
                      onChange={(e) => updateLine(l.id, { price: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-3 py-2.5 text-right font-medium tabular-nums text-foreground">
                    {currency(l.qty * l.price)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <button
                      onClick={() => removeLine(l.id)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Удалить позицию"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-8 border-t border-border px-5 py-4">
          <span className="text-sm text-muted-foreground">Позиций: {lines.length}</span>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Итого к оплате</div>
            <div className="text-xl font-semibold tabular-nums text-foreground">{currency(total)}</div>
          </div>
        </div>
      </section>
    </div>
  )
}
