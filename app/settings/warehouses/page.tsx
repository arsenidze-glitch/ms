import Link from "next/link"
import { Plus, ArrowLeft, Star } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { warehouses } from "@/lib/data"

export default function WarehousesPage() {
  return (
    <div>
      <PageHeader
        title="Склады"
        subtitle="Справочник складов"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Настройки
            </Link>
            <button className={buttonVariants({ size: "sm" })} type="button">
              <Plus className="size-4" />
              Склад
            </button>
          </div>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Адрес</th>
                <th className="px-4 py-3 font-medium">Ответственный</th>
                <th className="px-4 py-3 font-medium">По умолчанию</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w) => (
                <tr key={w.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-3 font-medium text-foreground">{w.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{w.address}</td>
                  <td className="px-4 py-3 text-muted-foreground">{w.responsible}</td>
                  <td className="px-4 py-3">
                    {w.isDefault ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        <Star className="size-3.5 fill-primary" />
                        Основной
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
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
