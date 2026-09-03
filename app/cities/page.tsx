'use client'

import { useMemo, useState } from 'react'
import { Plus, Search, Pencil, Trash2, MapPin } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

type City = {
  id: number
  name: string
  region: string
  days: number
  cost: number
  active: boolean
}

const data: City[] = [
  { id: 1, name: 'Москва', region: 'Московская область', days: 1, cost: 350, active: true },
  { id: 2, name: 'Санкт-Петербург', region: 'Ленинградская область', days: 2, cost: 450, active: true },
  { id: 3, name: 'Новосибирск', region: 'Новосибирская область', days: 4, cost: 890, active: true },
  { id: 4, name: 'Екатеринбург', region: 'Свердловская область', days: 3, cost: 720, active: true },
  { id: 5, name: 'Казань', region: 'Республика Татарстан', days: 3, cost: 680, active: true },
  { id: 6, name: 'Нижний Новгород', region: 'Нижегородская область', days: 2, cost: 520, active: true },
  { id: 7, name: 'Челябинск', region: 'Челябинская область', days: 4, cost: 760, active: false },
  { id: 8, name: 'Самара', region: 'Самарская область', days: 3, cost: 640, active: true },
  { id: 9, name: 'Омск', region: 'Омская область', days: 5, cost: 950, active: false },
  { id: 10, name: 'Ростов-на-Дону', region: 'Ростовская область', days: 4, cost: 810, active: true },
]

const currency = (n: number) =>
  n.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })

export default function CitiesPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Справочник: города доставки"
        subtitle={`Всего городов: ${data.length}`}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Добавить город
          </Button>
        }
      />

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по городу или региону…"
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Город</th>
                <th className="px-3 py-3 font-medium">Регион</th>
                <th className="w-28 px-3 py-3 text-right font-medium">Срок, дн.</th>
                <th className="w-36 px-3 py-3 text-right font-medium">Стоимость</th>
                <th className="w-28 px-3 py-3 text-center font-medium">Статус</th>
                <th className="w-20 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border/60 last:border-0 hover:bg-accent/40"
                >
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {c.name}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{c.region}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{c.days}</td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {currency(c.cost)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={
                        c.active
                          ? 'inline-flex rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success'
                          : 'inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground'
                      }
                    >
                      {c.active ? 'Активен' : 'Отключён'}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                        aria-label={`Редактировать ${c.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Удалить ${c.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-muted-foreground"
                  >
                    Ничего не найдено по запросу «{query}»
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
