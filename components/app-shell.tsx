'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  PackagePlus,
  Truck,
  MapPin,
  Search,
  Bell,
  Menu,
  X,
  Boxes,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Показатели', icon: LayoutDashboard },
  { href: '/purchase-orders', label: 'Заказы поставщикам', icon: PackagePlus },
  { href: '/shipments', label: 'Отгрузки клиентам', icon: Truck },
  { href: '/cities', label: 'Города доставки', icon: MapPin },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Boxes className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-sidebar-foreground">
              МойСклад
            </span>
            <span className="text-xs text-muted-foreground">Учёт товаров</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60',
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
              ИП
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-sidebar-foreground">
                Иван Петров
              </span>
              <span className="text-xs text-muted-foreground">Менеджер</span>
            </div>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur lg:px-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Поиск по товарам, заказам, клиентам…"
              className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              className="relative rounded-md p-2 text-muted-foreground hover:bg-accent"
              aria-label="Уведомления"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
