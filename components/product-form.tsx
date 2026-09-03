"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import type { Product, Currency } from "@/lib/data"

const currencies: Currency[] = ["RUB", "USD", "EUR"]

const emptyProduct: Product = {
  id: "",
  name: "",
  sku: "",
  barcode: "",
  purchasePrice: 0,
  purchaseCurrency: "RUB",
  salePrice: 0,
  stock: 0,
  unit: "шт",
  category: "",
  photo: "/placeholder.svg",
}

export function ProductForm({ product }: { product?: Product }) {
  const [form, setForm] = useState<Product>(product ?? emptyProduct)
  const isNew = !product

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <div>
      <PageHeader
        title={isNew ? "Новый товар" : form.name}
        subtitle={isNew ? "Карточка товара" : `Артикул: ${form.sku}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/products"
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
        {/* Photo */}
        <div className="rounded-xl border border-border bg-card p-5">
          <span className="ms-label">Фото товара</span>
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={form.photo || "/placeholder.svg"}
              alt={form.name || "Товар"}
              width={320}
              height={320}
              className="h-full w-full object-cover"
            />
          </div>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border py-2 text-sm text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          >
            <Upload className="size-4" />
            Загрузить фото
          </button>
        </div>

        {/* Main fields */}
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="ms-label">Наименование</label>
              <input
                className="ms-input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Название товара"
              />
            </div>
            <div>
              <label className="ms-label">Артикул</label>
              <input
                className="ms-input"
                value={form.sku}
                onChange={(e) => set("sku", e.target.value)}
                placeholder="SKU"
              />
            </div>
            <div>
              <label className="ms-label">Штрихкод</label>
              <input
                className="ms-input"
                value={form.barcode}
                onChange={(e) => set("barcode", e.target.value)}
                placeholder="EAN-13"
              />
            </div>
            <div>
              <label className="ms-label">Категория</label>
              <input
                className="ms-input"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Категория"
              />
            </div>
            <div>
              <label className="ms-label">Единица измерения</label>
              <input
                className="ms-input"
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                placeholder="шт"
              />
            </div>

            <div>
              <label className="ms-label">Цена закупки</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="ms-input"
                  value={form.purchasePrice}
                  onChange={(e) => set("purchasePrice", Number(e.target.value))}
                />
                <select
                  className="ms-input w-24"
                  value={form.purchaseCurrency}
                  onChange={(e) => set("purchaseCurrency", e.target.value as Currency)}
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="ms-label">Цена продажи, ₽</label>
              <input
                type="number"
                className="ms-input"
                value={form.salePrice}
                onChange={(e) => set("salePrice", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="ms-label">Остаток</label>
              <input
                type="number"
                className="ms-input"
                value={form.stock}
                onChange={(e) => set("stock", Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
