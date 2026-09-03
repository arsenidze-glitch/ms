"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { currency, type Customer } from "@/lib/data"

const emptyCustomer: Customer = {
  id: "",
  name: "",
  type: "individual",
  phone: "",
  email: "",
  city: "",
  address: "",
  orders: 0,
  balance: 0,
  createdAt: "",
  comment: "",
}

export function CustomerForm({ customer }: { customer?: Customer }) {
  const [form, setForm] = useState<Customer>(customer ?? emptyCustomer)
  const isNew = !customer

  const set = <K extends keyof Customer>(key: K, value: Customer[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <div>
      <PageHeader
        title={isNew ? "Новый клиент" : form.name}
        subtitle={isNew ? "Карточка клиента" : `Клиент с ${form.createdAt || "—"}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/customers"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              К списку
            </Link>
            <Button size="sm">
              <Save className="size-4" />
              Сохранить
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Основные данные</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="ms-label">ФИО / Наименование</label>
              <input
                className="ms-input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div>
              <label className="ms-label">Тип</label>
              <select
                className="ms-input"
                value={form.type}
                onChange={(e) => set("type", e.target.value as Customer["type"])}
              >
                <option value="individual">Физ. лицо</option>
                <option value="company">Юр. лицо</option>
              </select>
            </div>
            <div>
              <label className="ms-label">Телефон</label>
              <input
                className="ms-input"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+7 900 000-00-00"
              />
            </div>
            <div>
              <label className="ms-label">Email</label>
              <input
                type="email"
                className="ms-input"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label className="ms-label">Город</label>
              <input
                className="ms-input"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Город"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="ms-label">Адрес</label>
              <input
                className="ms-input"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="Улица, дом, квартира"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="ms-label">Комментарий</label>
              <textarea
                className="ms-input min-h-20 py-2"
                value={form.comment}
                onChange={(e) => set("comment", e.target.value)}
                placeholder="Заметки о клиенте"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="ms-label">Заказов</span>
            <p className="text-2xl font-semibold text-foreground tabular-nums">{form.orders}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="ms-label">Баланс</span>
            <p
              className={
                "text-2xl font-semibold tabular-nums " +
                (form.balance < 0
                  ? "text-destructive"
                  : form.balance > 0
                    ? "text-emerald-600"
                    : "text-foreground")
              }
            >
              {currency(form.balance)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {form.balance < 0 ? "Задолженность клиента" : "Переплата / аванс"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
