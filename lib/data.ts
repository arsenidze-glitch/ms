export const currency = (n: number) =>
  n.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })

export const number = (n: number) => n.toLocaleString("ru-RU")

/* ---------------- Shipments (Отгрузки клиентам) ---------------- */

export type ShipmentStatus = "new" | "awaiting_payment" | "assembled" | "assembled_paid" | "shipped"

export const shipmentStatusMeta: Record<ShipmentStatus, { label: string; tone: string }> = {
  new: { label: "Новый", tone: "bg-emerald-500 text-white" },
  awaiting_payment: { label: "Новый ждёт оплаты", tone: "bg-emerald-600 text-white" },
  assembled: { label: "Собран", tone: "bg-pink-500 text-white" },
  assembled_paid: { label: "Собран+$", tone: "bg-violet-500 text-white" },
  shipped: { label: "Отгружен", tone: "bg-sky-500 text-white" },
}

export type Shipment = {
  id: string
  number: string
  createdAt: string
  counterparty: string
  contactPerson: string
  email: string
  total: number
  paid: number
  overhead: number
  owner: string
  status: ShipmentStatus
  comment: string
  updatedAt: string
  updatedBy: string
  phone: string
  delivery: string
  city: string
  address: string
  track: string
  items: Line[]
}

export type Line = { id: number; name: string; qty: number; price: number }

export const shipments: Shipment[] = [
  {
    id: "202375",
    number: "202375",
    createdAt: "03.09.2026 08:01",
    counterparty: "Мизнікова Лілія Борисівна",
    contactPerson: "Мизнікова Л. Б.",
    email: "liliya@example.com",
    total: 16182,
    paid: 0,
    overhead: 0,
    owner: "Егор",
    status: "awaiting_payment",
    comment: "",
    updatedAt: "03.09.2026 08:01",
    updatedBy: "API A.",
    phone: "0975251032",
    delivery: "Почта",
    city: "Сміла (Черкаська обл.)",
    address: "5",
    track: "",
    items: [
      { id: 1, name: "Кабель UTP cat.5e, 305 м", qty: 3, price: 4200 },
      { id: 2, name: "Коннектор RJ-45 (уп. 100 шт.)", qty: 5, price: 650 },
      { id: 3, name: "Патч-панель 24 порта", qty: 1, price: 300 },
    ],
  },
  {
    id: "202374",
    number: "202374",
    createdAt: "03.09.2026 08:01",
    counterparty: "Боярские Дмитрий",
    contactPerson: "Боярские Д.",
    email: "boyarskie@example.com",
    total: 1985,
    paid: 0,
    overhead: 0,
    owner: "Егор",
    status: "new",
    comment: "",
    updatedAt: "03.09.2026 08:01",
    updatedBy: "API A.",
    phone: "0955542577",
    delivery: "Почта",
    city: "Гребёнки (Киевская обл.)",
    address: "1",
    track: "",
    items: [{ id: 1, name: "Мышь беспроводная", qty: 1, price: 1985 }],
  },
  {
    id: "202373",
    number: "202373",
    createdAt: "02.09.2026 19:46",
    counterparty: "Коханюк Марія",
    contactPerson: "Коханюк М.",
    email: "kohanyuk@example.com",
    total: 1145,
    paid: 1145,
    overhead: 0,
    owner: "Егор",
    status: "assembled",
    comment: "",
    updatedAt: "02.09.2026 23:11",
    updatedBy: "API A.",
    phone: "0507156876",
    delivery: "Почта",
    city: "Луцьк (Волинська обл.)",
    address: "2",
    track: "20451",
    items: [{ id: 1, name: "Кабель HDMI 2 м", qty: 2, price: 572 }],
  },
  {
    id: "202372",
    number: "202372",
    createdAt: "02.09.2026 19:16",
    counterparty: "Семенова Лариса",
    contactPerson: "Семенова Л.",
    email: "semenova@example.com",
    total: 924,
    paid: 924,
    overhead: 0,
    owner: "Егор",
    status: "assembled",
    comment: "",
    updatedAt: "02.09.2026 23:13",
    updatedBy: "API A.",
    phone: "0982108762",
    delivery: "Почта",
    city: "Одеса (Одеська обл.)",
    address: "84",
    track: "20451",
    items: [{ id: 1, name: "Флешка USB 64 ГБ", qty: 2, price: 462 }],
  },
  {
    id: "202371",
    number: "202371",
    createdAt: "02.09.2026 19:16",
    counterparty: "Атрашкевич Виталий",
    contactPerson: "Атрашкевич В.",
    email: "atrashkevich@example.com",
    total: 914,
    paid: 0,
    overhead: 0,
    owner: "Егор",
    status: "assembled_paid",
    comment: "Позвонить перед отправкой",
    updatedAt: "02.09.2026 23:13",
    updatedBy: "API A.",
    phone: "0667187687",
    delivery: "Почта",
    city: "Миколаїв (Миколаївська обл.)",
    address: "26",
    track: "20451",
    items: [{ id: 1, name: "Переходник USB-C", qty: 2, price: 457 }],
  },
  {
    id: "202370",
    number: "202370",
    createdAt: "02.09.2026 16:31",
    counterparty: "Богомаз Любомир",
    contactPerson: "Богомаз Л.",
    email: "bogomaz@example.com",
    total: 1666,
    paid: 1666,
    overhead: 0,
    owner: "Егор",
    status: "assembled",
    comment: "",
    updatedAt: "02.09.2026 21:47",
    updatedBy: "API A.",
    phone: "0637182141",
    delivery: "Почта",
    city: "Остер (Чернігівська обл.)",
    address: "1",
    track: "20451",
    items: [{ id: 1, name: "Роутер Wi-Fi", qty: 1, price: 1666 }],
  },
  {
    id: "202369",
    number: "202369",
    createdAt: "02.09.2026 15:01",
    counterparty: "Шкурлей Юлия",
    contactPerson: "Шкурлей Ю.",
    email: "shkurley@example.com",
    total: 1339,
    paid: 1339,
    overhead: 0,
    owner: "Егор",
    status: "assembled",
    comment: "",
    updatedAt: "02.09.2026 21:49",
    updatedBy: "API A.",
    phone: "0987775816",
    delivery: "Почта",
    city: "Київ (Київська обл.)",
    address: "25150",
    track: "20451",
    items: [{ id: 1, name: "Клавиатура механическая", qty: 1, price: 1339 }],
  },
  {
    id: "202368",
    number: "202368",
    createdAt: "02.09.2026 14:03",
    counterparty: "Любов Любов",
    contactPerson: "Любов Л.",
    email: "lyubov@example.com",
    total: 895,
    paid: 895,
    overhead: 0,
    owner: "Егор",
    status: "assembled",
    comment: "",
    updatedAt: "02.09.2026 23:13",
    updatedBy: "API A.",
    phone: "0981171819",
    delivery: "Почта",
    city: "Одеса (Одеська обл.)",
    address: "132",
    track: "20451",
    items: [{ id: 1, name: "Наушники проводные", qty: 1, price: 895 }],
  },
]

export function getShipment(id: string) {
  return shipments.find((s) => s.id === id)
}

/* ---------------- Purchase orders (Заказы поставщикам) ---------------- */

export type OrderStatus = "draft" | "sent" | "partially" | "received" | "canceled"

export const orderStatusMeta: Record<OrderStatus, { label: string; tone: string }> = {
  draft: { label: "Черновик", tone: "bg-slate-400 text-white" },
  sent: { label: "Отправлен", tone: "bg-sky-500 text-white" },
  partially: { label: "Частично получен", tone: "bg-amber-500 text-white" },
  received: { label: "Получен", tone: "bg-emerald-500 text-white" },
  canceled: { label: "Отменён", tone: "bg-rose-500 text-white" },
}

export type PurchaseOrder = {
  id: string
  number: string
  createdAt: string
  supplier: string
  warehouse: string
  deliveryDate: string
  total: number
  paid: number
  status: OrderStatus
  owner: string
  comment: string
  items: OrderLine[]
}

export type OrderLine = { id: number; name: string; sku: string; qty: number; price: number }

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-1043",
    number: "1043",
    createdAt: "03.09.2026 09:12",
    supplier: "ООО «Поставка-Сервис»",
    warehouse: "Основной склад",
    deliveryDate: "2026-09-10",
    total: 39250,
    paid: 0,
    status: "draft",
    owner: "Иван Петров",
    comment: "Плановая закупка",
    items: [
      { id: 1, name: "Кабель UTP cat.5e", sku: "CBL-5E-305", qty: 10, price: 2150 },
      { id: 2, name: "Коннектор RJ-45", sku: "RJ45-100", qty: 25, price: 320 },
      { id: 3, name: "Патч-панель 24 порта", sku: "PP-24-1U", qty: 4, price: 3900 },
    ],
  },
  {
    id: "PO-1042",
    number: "1042",
    createdAt: "02.09.2026 15:40",
    supplier: "ООО «ТехноОпт»",
    warehouse: "Склад №2 (Юг)",
    deliveryDate: "2026-09-08",
    total: 128400,
    paid: 128400,
    status: "received",
    owner: "Иван Петров",
    comment: "",
    items: [
      { id: 1, name: "Ноутбук 15.6\"", sku: "NB-156", qty: 6, price: 21400 },
    ],
  },
  {
    id: "PO-1041",
    number: "1041",
    createdAt: "01.09.2026 11:05",
    supplier: "АО «ГлавСнаб»",
    warehouse: "Основной склад",
    deliveryDate: "2026-09-05",
    total: 54600,
    paid: 20000,
    status: "sent",
    owner: "Ольга Кузьмина",
    comment: "Ожидаем счёт",
    items: [
      { id: 1, name: "Монитор 24\"", sku: "MON-24", qty: 7, price: 7800 },
    ],
  },
  {
    id: "PO-1040",
    number: "1040",
    createdAt: "30.08.2026 16:22",
    supplier: "ИП Смирнов А.В.",
    warehouse: "Транзитный склад",
    deliveryDate: "2026-09-03",
    total: 18700,
    paid: 9000,
    status: "partially",
    owner: "Иван Петров",
    comment: "",
    items: [
      { id: 1, name: "Источник питания 500Вт", sku: "PSU-500", qty: 11, price: 1700 },
    ],
  },
  {
    id: "PO-1039",
    number: "1039",
    createdAt: "28.08.2026 10:14",
    supplier: "ООО «ТехноОпт»",
    warehouse: "Основной склад",
    deliveryDate: "2026-08-31",
    total: 7300,
    paid: 0,
    status: "canceled",
    owner: "Ольга Кузьмина",
    comment: "Отказ поставщика",
    items: [{ id: 1, name: "SSD 1 ТБ", sku: "SSD-1TB", qty: 1, price: 7300 }],
  },
]

export function getOrder(id: string) {
  return purchaseOrders.find((o) => o.id === id)
}
