'use client'

import { useMemo, useState } from 'react'
import { Plus, Trash2, Printer, Save, User, Truck } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

type Line = {
  id: number
  name: string
  qty: number
  price: number
}

const initialLines: Line[] = [
  { id: 1, name: 'Кабель UTP cat.5e, 305 м', qty: 2, price: 4200 },
  { id: 2, name: 'Коннектор RJ-45 (уп. 100 шт.)', qty: 5, price: 650 },
  { id: 3, name: 'Патч-панель 24 порта', qty: 1, price: 3100 },
]

const currency = (n: number) =>
  n.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })

export default function ShipmentsPage() {
  const [lines, setLines] = useState<Line[]>(initialLines)

  const addLine = () =>
    setLines((prev) => [
      ...prev,
      { id: Date.now(), name: '', qty: 1, price: 0 },
    ])

  const removeLine = (id: number) =>
    setLines((prev) => prev.filter((l) => l.id !== id))

  const updateLine = (id: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.price, 0),
    [lines],
  )

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Отгрузка клиенту"
        subtitle="Отгрузка № РН-0042 от 03.09.2026"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
              Печать
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4" />
              Провести
            </Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Customer */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <User className="h-4 w-4 text-primary" />
            Клиент
          </h2>
          <div className="grid gap-3">
            <div>
              <label className="ms-label">ФИО / Организация</label>
              <input className="ms-input" defaultValue="ООО «Ромашка»" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="ms-label">Телефон</label>
                <input className="ms-input" defaultValue="+7 (495) 123-45-67" />
              </div>
              <div>
                <label className="ms-label">Контактное лицо</label>
                <input className="ms-input" defaultValue="Смирнова А. В." />
              </div>
            </div>
            <div>
              <label className="ms-label">E-mail</label>
              <input className="ms-input" defaultValue="sales@romashka.ru" />
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Truck className="h-4 w-4 text-primary" />
            Доставка
          </h2>
          <div className="grid gap-3">
            <div>
              <label className="ms-label">Город</label>
              <select className="ms-input" defaultValue="Москва">
                <option>Москва</option>
                <option>Санкт-Петербург</option>
                <option>Новосибирск</option>
                <option>Екатеринбург</option>
                <option>Казань</option>
              </select>
            </div>
            <div>
              <label className="ms-label">Адрес доставки</label>
              <input
                className="ms-input"
                defaultValue="ул. Тверская, д. 12, офис 305"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="ms-label">Дата отгрузки</label>
                <input type="date" className="ms-input" defaultValue="2026-09-03" />
              </div>
              <div>
                <label className="ms-label">Способ доставки</label>
                <select className="ms-input" defaultValue="Курьер">
                  <option>Курьер</option>
                  <option>Самовывоз</option>
                  <option>Транспортная компания</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Items */}
      <section className="mt-5 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Товары</h2>
          <Button variant="outline" size="sm" onClick={addLine}>
            <Plus className="h-4 w-4" />
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
                      onChange={(e) =>
                        updateLine(l.id, { qty: Number(e.target.value) })
                      }
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <input
                      type="number"
                      min={0}
                      className="ms-input text-right"
                      value={l.price}
                      onChange={(e) =>
                        updateLine(l.id, { price: Number(e.target.value) })
                      }
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
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-8 border-t border-border px-5 py-4">
          <span className="text-sm text-muted-foreground">
            Позиций: {lines.length}
          </span>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Итого к оплате</div>
            <div className="text-xl font-semibold tabular-nums text-foreground">
              {currency(total)}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
