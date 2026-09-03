"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Save, FileDown } from "lucide-react"

type LineItem = {
  id: number
  name: string
  sku: string
  qty: number
  price: number
}

const suppliers = ["ООО «Поставка-Сервис»", "ИП Смирнов А.В.", "ООО «ТехноОпт»", "АО «ГлавСнаб»"]
const warehouses = ["Основной склад", "Склад №2 (Юг)", "Транзитный склад"]

export default function PurchasePage() {
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, name: "Кабель UTP cat.5e", sku: "CBL-5E-305", qty: 10, price: 2150 },
    { id: 2, name: "Коннектор RJ-45", sku: "RJ45-100", qty: 25, price: 320 },
    { id: 3, name: "Патч-панель 24 порта", sku: "PP-24-1U", qty: 4, price: 3900 },
  ])

  function updateItem(id: number, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function addItem() {
    setItems((prev) => [...prev, { id: Date.now(), name: "", sku: "", qty: 1, price: 0 }])
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0)
  const totalQty = items.reduce((sum, it) => sum + it.qty, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Заказ поставщику"
        subtitle="Новый заказ · черновик"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="size-4" />
              Экспорт
            </Button>
            <Button size="sm">
              <Save className="size-4" />
              Провести
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Поставщик">
          <select className="ms-input" defaultValue={suppliers[0]}>
            {suppliers.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Склад приёмки">
          <select className="ms-input" defaultValue={warehouses[0]}>
            {warehouses.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </Field>
        <Field label="Дата поставки">
          <input type="date" className="ms-input" defaultValue="2026-09-10" />
        </Field>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Товары</h2>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="size-4" />
            Добавить товар
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2 font-medium">Наименование</th>
                <th className="px-4 py-2 font-medium">Артикул</th>
                <th className="px-4 py-2 font-medium text-right">Кол-во</th>
                <th className="px-4 py-2 font-medium text-right">Цена, ₽</th>
                <th className="px-4 py-2 font-medium text-right">Сумма, ₽</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2">
                    <input
                      className="ms-input"
                      value={it.name}
                      placeholder="Название товара"
                      onChange={(e) => updateItem(it.id, { name: e.target.value })}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      className="ms-input"
                      value={it.sku}
                      placeholder="Артикул"
                      onChange={(e) => updateItem(it.id, { sku: e.target.value })}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min={0}
                      className="ms-input text-right"
                      value={it.qty}
                      onChange={(e) => updateItem(it.id, { qty: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min={0}
                      className="ms-input text-right"
                      value={it.price}
                      onChange={(e) => updateItem(it.id, { price: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-4 py-2 text-right font-medium tabular-nums text-foreground">
                    {(it.qty * it.price).toLocaleString("ru-RU")}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => removeItem(it.id)}
                      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Удалить строку"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-6 border-t border-border px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            Позиций: <span className="font-medium text-foreground">{items.length}</span>
          </span>
          <span className="text-muted-foreground">
            Всего единиц: <span className="font-medium text-foreground">{totalQty}</span>
          </span>
          <span className="text-base font-semibold text-foreground">
            Итого: {total.toLocaleString("ru-RU")} ₽
          </span>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
