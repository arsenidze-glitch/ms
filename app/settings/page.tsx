"use client"

import { useState } from "react"
import Link from "next/link"
import { Warehouse, Users, MapPin, ChevronRight, Save } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"

const directories = [
  { href: "/settings/warehouses", label: "Склады", desc: "Список складов и ответственных", icon: Warehouse },
  { href: "/settings/users", label: "Пользователи", desc: "Сотрудники и права доступа", icon: Users },
  { href: "/cities", label: "Города доставки", desc: "Справочник городов и тарифов", icon: MapPin },
]

export default function SettingsPage() {
  const [company, setCompany] = useState("ООО «МойСклад Демо»")
  const [inn, setInn] = useState("7701234567")
  const [currencyCode, setCurrencyCode] = useState("RUB")
  const [vat, setVat] = useState("20")

  return (
    <div>
      <PageHeader title="Настройки" subtitle="Общие параметры и справочники" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Company settings */}
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Организация</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="ms-label">Название организации</label>
              <input className="ms-input" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="ms-label">ИНН</label>
              <input className="ms-input" value={inn} onChange={(e) => setInn(e.target.value)} />
            </div>
            <div>
              <label className="ms-label">Валюта учёта</label>
              <select
                className="ms-input"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
              >
                <option value="RUB">Рубль (₽)</option>
                <option value="USD">Доллар ($)</option>
                <option value="EUR">Евро (€)</option>
              </select>
            </div>
            <div>
              <label className="ms-label">Ставка НДС, %</label>
              <input className="ms-input" value={vat} onChange={(e) => setVat(e.target.value)} />
            </div>
          </div>

          <h2 className="mb-3 mt-6 text-sm font-semibold text-foreground">Учёт</h2>
          <div className="flex flex-col gap-3">
            <ToggleRow label="Разрешить отрицательные остатки" defaultChecked={false} />
            <ToggleRow label="Резервировать товар при отгрузке" defaultChecked />
            <ToggleRow label="Автоматическая нумерация документов" defaultChecked />
          </div>

          <div className="mt-6 flex justify-end">
            <Button size="sm">
              <Save className="size-4" />
              Сохранить
            </Button>
          </div>
        </div>

        {/* Directories */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Справочники</h2>
          <div className="flex flex-col gap-2">
            {directories.map((d) => {
              const Icon = d.icon
              return (
                <Link
                  key={d.href}
                  href={d.href}
                  className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/40 hover:bg-accent/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-foreground">{d.label}</span>
                    <span className="truncate text-xs text-muted-foreground">{d.desc}</span>
                  </span>
                  <ChevronRight className="ml-auto size-4 text-muted-foreground group-hover:text-primary" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked ?? false)
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-left text-sm hover:bg-accent/40"
    >
      <span className="text-foreground">{label}</span>
      <span
        className={
          "relative h-5 w-9 shrink-0 rounded-full transition-colors " +
          (on ? "bg-primary" : "bg-muted-foreground/30")
        }
      >
        <span
          className={
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform " +
            (on ? "translate-x-4" : "translate-x-0.5")
          }
        />
      </span>
    </button>
  )
}
