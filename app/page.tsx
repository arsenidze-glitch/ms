import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ShoppingCart,
  Truck,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'

const stats = [
  {
    label: 'Выручка за месяц',
    value: '4 285 600 ₽',
    delta: '+12,4%',
    up: true,
    icon: Wallet,
  },
  {
    label: 'Заказы поставщикам',
    value: '38',
    delta: '+6,1%',
    up: true,
    icon: ShoppingCart,
  },
  {
    label: 'Отгрузки клиентам',
    value: '124',
    delta: '+18,9%',
    up: true,
    icon: Truck,
  },
  {
    label: 'Товаров на складе',
    value: '9 512',
    delta: '-3,2%',
    up: false,
    icon: Package,
  },
]

const revenue = [
  { m: 'Янв', v: 62 },
  { m: 'Фев', v: 48 },
  { m: 'Мар', v: 71 },
  { m: 'Апр', v: 55 },
  { m: 'Май', v: 83 },
  { m: 'Июн', v: 68 },
  { m: 'Июл', v: 92 },
  { m: 'Авг', v: 100 },
]

const topProducts = [
  { name: 'Смеситель Grohe Eurosmart', sold: 342, sum: '1 197 000 ₽' },
  { name: 'Ламинат Quick-Step Impressive', sold: 1280, sum: '892 480 ₽' },
  { name: 'Радиатор Rifar Monolit 500', sold: 210, sum: '651 000 ₽' },
  { name: 'Дверь межкомнатная Profil Doors', sold: 96, sum: '528 000 ₽' },
  { name: 'Плитка Kerama Marazzi Метро', sold: 4300, sum: '473 000 ₽' },
]

const recent = [
  {
    type: 'Отгрузка',
    doc: 'ОТГ-001284',
    party: 'ООО «СтройДом»',
    city: 'Москва',
    sum: '184 200 ₽',
    status: 'Отгружено',
  },
  {
    type: 'Заказ',
    doc: 'ЗП-000512',
    party: 'ТД «Аквасервис»',
    city: 'Санкт-Петербург',
    sum: '512 400 ₽',
    status: 'Ожидается',
  },
  {
    type: 'Отгрузка',
    doc: 'ОТГ-001283',
    party: 'ИП Смирнов А.В.',
    city: 'Казань',
    sum: '46 800 ₽',
    status: 'В сборке',
  },
  {
    type: 'Отгрузка',
    doc: 'ОТГ-001282',
    party: 'ООО «Ремонт+»',
    city: 'Екатеринбург',
    sum: '97 500 ₽',
    status: 'Отгружено',
  },
  {
    type: 'Заказ',
    doc: 'ЗП-000511',
    party: 'ООО «КерамТорг»',
    city: 'Новосибирск',
    sum: '268 000 ₽',
    status: 'Принят',
  },
]

const statusStyles: Record<string, string> = {
  Отгружено: 'bg-success/15 text-success',
  'В сборке': 'bg-warning/20 text-warning-foreground',
  Ожидается: 'bg-accent text-accent-foreground',
  Принят: 'bg-secondary text-secondary-foreground',
}

export default function DashboardPage() {
  const max = Math.max(...revenue.map((r) => r.v))
  return (
    <div>
      <PageHeader
        title="Показатели"
        subtitle="Сводка по закупкам, продажам и складу за август 2026"
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${
                    s.up ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {s.up ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {s.delta}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Chart + top products */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Динамика выручки
              </h2>
              <p className="text-sm text-muted-foreground">
                Тысяч рублей по месяцам
              </p>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-success">
              <TrendingUp className="h-4 w-4" />
              +12,4%
            </span>
          </div>
          <div className="flex h-56 items-stretch gap-2 sm:gap-3">
            {revenue.map((r) => (
              <div
                key={r.m}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-primary/85 transition-all hover:bg-primary"
                    style={{ height: `${(r.v / max) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{r.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Топ товаров
          </h2>
          <ul className="flex flex-col gap-4">
            {topProducts.map((p, i) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Продано: {p.sold} шт.
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-foreground">
                  {p.sum}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent documents */}
      <div className="mt-4 rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">
            Последние документы
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Тип</th>
                <th className="px-5 py-3 font-medium">Документ</th>
                <th className="px-5 py-3 font-medium">Контрагент</th>
                <th className="px-5 py-3 font-medium">Город</th>
                <th className="px-5 py-3 text-right font-medium">Сумма</th>
                <th className="px-5 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr
                  key={r.doc}
                  className="border-b border-border last:border-0 hover:bg-muted/50"
                >
                  <td className="px-5 py-3 text-muted-foreground">{r.type}</td>
                  <td className="px-5 py-3 font-medium text-foreground">
                    {r.doc}
                  </td>
                  <td className="px-5 py-3 text-foreground">{r.party}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.city}</td>
                  <td className="px-5 py-3 text-right font-medium text-foreground">
                    {r.sum}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[r.status] ??
                        'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {r.status}
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
