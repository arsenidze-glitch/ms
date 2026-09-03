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

/* ---------------- Products (Товары) ---------------- */

export type Currency = "RUB" | "USD" | "EUR"

export const currencySymbol: Record<Currency, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
}

export type Product = {
  id: string
  name: string
  sku: string
  barcode: string
  purchasePrice: number
  purchaseCurrency: Currency
  salePrice: number
  stock: number
  unit: string
  category: string
  photo: string
}

export const products: Product[] = [
  {
    id: "P-001",
    name: "Кабель UTP cat.5e, 305 м",
    sku: "CBL-5E-305",
    barcode: "4820000010015",
    purchasePrice: 2150,
    purchaseCurrency: "RUB",
    salePrice: 4200,
    stock: 42,
    unit: "шт",
    category: "Сетевое оборудование",
    photo: "/network-cable-spool.png",
  },
  {
    id: "P-002",
    name: "Коннектор RJ-45 (уп. 100 шт.)",
    sku: "RJ45-100",
    barcode: "4820000010022",
    purchasePrice: 320,
    purchaseCurrency: "RUB",
    salePrice: 650,
    stock: 180,
    unit: "уп",
    category: "Сетевое оборудование",
    photo: "/rj45-connectors.png",
  },
  {
    id: "P-003",
    name: "Патч-панель 24 порта 1U",
    sku: "PP-24-1U",
    barcode: "4820000010039",
    purchasePrice: 3900,
    purchaseCurrency: "RUB",
    salePrice: 6300,
    stock: 15,
    unit: "шт",
    category: "Сетевое оборудование",
    photo: "/patch-panel.png",
  },
  {
    id: "P-004",
    name: 'Ноутбук 15.6" Core i5',
    sku: "NB-156",
    barcode: "4820000010046",
    purchasePrice: 240,
    purchaseCurrency: "USD",
    salePrice: 25990,
    stock: 6,
    unit: "шт",
    category: "Компьютеры",
    photo: "/laptop-computer.png",
  },
  {
    id: "P-005",
    name: 'Монитор 24" IPS',
    sku: "MON-24",
    barcode: "4820000010053",
    purchasePrice: 7800,
    purchaseCurrency: "RUB",
    salePrice: 12400,
    stock: 21,
    unit: "шт",
    category: "Периферия",
    photo: "/computer-monitor.png",
  },
  {
    id: "P-006",
    name: "Мышь беспроводная",
    sku: "MS-WL",
    barcode: "4820000010060",
    purchasePrice: 12,
    purchaseCurrency: "EUR",
    salePrice: 1985,
    stock: 96,
    unit: "шт",
    category: "Периферия",
    photo: "/wireless-mouse.png",
  },
  {
    id: "P-007",
    name: "Клавиатура механическая",
    sku: "KB-MECH",
    barcode: "4820000010077",
    purchasePrice: 780,
    purchaseCurrency: "RUB",
    salePrice: 1339,
    stock: 34,
    unit: "шт",
    category: "Периферия",
    photo: "/mechanical-keyboard.png",
  },
  {
    id: "P-008",
    name: "SSD 1 ТБ NVMe",
    sku: "SSD-1TB",
    barcode: "4820000010084",
    purchasePrice: 4300,
    purchaseCurrency: "RUB",
    salePrice: 7300,
    stock: 0,
    unit: "шт",
    category: "Комплектующие",
    photo: "/ssd-drive.png",
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

/* ---------------- Customers (Клиенты) ---------------- */

export type Customer = {
  id: string
  name: string
  type: "individual" | "company"
  phone: string
  email: string
  city: string
  address: string
  orders: number
  balance: number
  createdAt: string
  comment: string
}

export const customers: Customer[] = [
  {
    id: "C-001",
    name: "Мизнікова Лілія Борисівна",
    type: "individual",
    phone: "0975251032",
    email: "liliya@example.com",
    city: "Сміла (Черкаська обл.)",
    address: "вул. Незалежності, 5",
    orders: 12,
    balance: 16182,
    createdAt: "12.01.2025",
    comment: "Постоянный клиент",
  },
  {
    id: "C-002",
    name: "Боярские Дмитрий",
    type: "individual",
    phone: "0955542577",
    email: "boyarskie@example.com",
    city: "Гребёнки (Киевская обл.)",
    address: "ул. Шевченко, 1",
    orders: 3,
    balance: 0,
    createdAt: "03.03.2025",
    comment: "",
  },
  {
    id: "C-003",
    name: 'ООО «Ромашка»',
    type: "company",
    phone: "0442223344",
    email: "info@romashka.ua",
    city: "Київ (Київська обл.)",
    address: "пр. Перемоги, 40",
    orders: 48,
    balance: -12400,
    createdAt: "20.11.2024",
    comment: "Оптовый покупатель, отсрочка 14 дней",
  },
  {
    id: "C-004",
    name: "Коханюк Марія",
    type: "individual",
    phone: "0507156876",
    email: "kohanyuk@example.com",
    city: "Луцьк (Волинська обл.)",
    address: "вул. Липинського, 2",
    orders: 5,
    balance: 0,
    createdAt: "18.06.2025",
    comment: "",
  },
  {
    id: "C-005",
    name: 'АО «ТехноТрейд»',
    type: "company",
    phone: "0322556677",
    email: "sales@technotrade.ua",
    city: "Львів (Львівська обл.)",
    address: "вул. Городоцька, 120",
    orders: 27,
    balance: 34500,
    createdAt: "05.09.2024",
    comment: "",
  },
  {
    id: "C-006",
    name: "Семенова Лариса",
    type: "individual",
    phone: "0982108762",
    email: "semenova@example.com",
    city: "Одеса (Одеська обл.)",
    address: "вул. Дерибасівська, 84",
    orders: 9,
    balance: 924,
    createdAt: "29.04.2025",
    comment: "",
  },
]

export function getCustomer(id: string) {
  return customers.find((c) => c.id === id)
}

/* ---------------- Warehouse (Склад) ---------------- */

export type StockRow = {
  id: string
  name: string
  sku: string
  warehouse: string
  inStock: number
  reserved: number
  available: number
  cost: number
  unit: string
}

export const stock: StockRow[] = [
  { id: "P-001", name: "Кабель UTP cat.5e, 305 м", sku: "CBL-5E-305", warehouse: "Основной склад", inStock: 42, reserved: 8, available: 34, cost: 2150, unit: "шт" },
  { id: "P-002", name: "Коннектор RJ-45 (уп. 100 шт.)", sku: "RJ45-100", warehouse: "Основной склад", inStock: 180, reserved: 25, available: 155, cost: 320, unit: "уп" },
  { id: "P-003", name: "Патч-панель 24 порта 1U", sku: "PP-24-1U", warehouse: "Основной склад", inStock: 15, reserved: 1, available: 14, cost: 3900, unit: "шт" },
  { id: "P-004", name: 'Ноутбук 15.6" Core i5', sku: "NB-156", warehouse: "Склад №2 (Юг)", inStock: 6, reserved: 2, available: 4, cost: 21400, unit: "шт" },
  { id: "P-005", name: 'Монитор 24" IPS', sku: "MON-24", warehouse: "Основной склад", inStock: 21, reserved: 7, available: 14, cost: 7800, unit: "шт" },
  { id: "P-006", name: "Мышь беспроводная", sku: "MS-WL", warehouse: "Основной склад", inStock: 96, reserved: 0, available: 96, cost: 1180, unit: "шт" },
  { id: "P-007", name: "Клавиатура механическая", sku: "KB-MECH", warehouse: "Склад №2 (Юг)", inStock: 34, reserved: 3, available: 31, cost: 780, unit: "шт" },
  { id: "P-008", name: "SSD 1 ТБ NVMe", sku: "SSD-1TB", warehouse: "Основной склад", inStock: 0, reserved: 0, available: 0, cost: 4300, unit: "шт" },
]

export type StockDoc = {
  id: string
  number: string
  date: string
  warehouse: string
  positions: number
  total: number
  owner: string
  comment: string
}

export const receipts: StockDoc[] = [
  { id: "IN-0051", number: "0051", date: "03.09.2026", warehouse: "Основной склад", positions: 3, total: 39250, owner: "Иван Петров", comment: "Приёмка по заказу 1043" },
  { id: "IN-0050", number: "0050", date: "02.09.2026", warehouse: "Склад №2 (Юг)", positions: 1, total: 128400, owner: "Ольга Кузьмина", comment: "" },
  { id: "IN-0049", number: "0049", date: "31.08.2026", warehouse: "Основной склад", positions: 5, total: 21600, owner: "Иван Петров", comment: "Излишки инвентаризации" },
  { id: "IN-0048", number: "0048", date: "28.08.2026", warehouse: "Основной склад", positions: 2, total: 9800, owner: "Иван Петров", comment: "" },
]

export const writeoffs: StockDoc[] = [
  { id: "OUT-0033", number: "0033", date: "02.09.2026", warehouse: "Основной склад", positions: 2, total: 4300, owner: "Иван Петров", comment: "Брак" },
  { id: "OUT-0032", number: "0032", date: "30.08.2026", warehouse: "Склад №2 (Юг)", positions: 1, total: 1180, owner: "Ольга Кузьмина", comment: "Повреждение при хранении" },
  { id: "OUT-0031", number: "0031", date: "27.08.2026", warehouse: "Основной склад", positions: 3, total: 7650, owner: "Иван Петров", comment: "Списание по инвентаризации" },
]

/* ---------------- Analytics (Аналитика — Обороты) ---------------- */

export type TurnoverRow = {
  id: string
  name: string
  sku: string
  opening: number
  incoming: number
  outgoing: number
  closing: number
  revenue: number
}

export const turnover: TurnoverRow[] = [
  { id: "P-001", name: "Кабель UTP cat.5e, 305 м", sku: "CBL-5E-305", opening: 30, incoming: 20, outgoing: 8, closing: 42, revenue: 33600 },
  { id: "P-002", name: "Коннектор RJ-45 (уп. 100 шт.)", sku: "RJ45-100", opening: 150, incoming: 60, outgoing: 30, closing: 180, revenue: 19500 },
  { id: "P-004", name: 'Ноутбук 15.6" Core i5', sku: "NB-156", opening: 2, incoming: 6, outgoing: 2, closing: 6, revenue: 51980 },
  { id: "P-005", name: 'Монитор 24" IPS', sku: "MON-24", opening: 18, incoming: 10, outgoing: 7, closing: 21, revenue: 86800 },
  { id: "P-006", name: "Мышь беспроводная", sku: "MS-WL", opening: 80, incoming: 40, outgoing: 24, closing: 96, revenue: 47640 },
  { id: "P-007", name: "Клавиатура механическая", sku: "KB-MECH", opening: 30, incoming: 15, outgoing: 11, closing: 34, revenue: 14729 },
]

/* ---------------- Payments (Платежи) ---------------- */

export type CashFlow = {
  id: string
  date: string
  direction: "in" | "out"
  category: string
  counterparty: string
  account: string
  amount: number
}

export const cashFlows: CashFlow[] = [
  { id: "CF-201", date: "03.09.2026", direction: "in", category: "Оплата от клиента", counterparty: "ООО «Ромашка»", account: "Расчётный счёт", amount: 45000 },
  { id: "CF-200", date: "03.09.2026", direction: "out", category: "Оплата поставщику", counterparty: "ООО «Поставка-Сервис»", account: "Расчётный счёт", amount: 39250 },
  { id: "CF-199", date: "02.09.2026", direction: "in", category: "Оплата от клиента", counterparty: "АО «ТехноТрейд»", account: "Касса", amount: 12400 },
  { id: "CF-198", date: "02.09.2026", direction: "out", category: "Аренда", counterparty: "Арендодатель", account: "Расчётный счёт", amount: 60000 },
  { id: "CF-197", date: "01.09.2026", direction: "out", category: "Зарплата", counterparty: "Сотрудники", account: "Расчётный счёт", amount: 185000 },
  { id: "CF-196", date: "01.09.2026", direction: "in", category: "Оплата от клиента", counterparty: "Семенова Лариса", account: "Касса", amount: 924 },
  { id: "CF-195", date: "31.08.2026", direction: "out", category: "Логистика", counterparty: "Нова Пошта", account: "Расчётный счёт", amount: 8600 },
  { id: "CF-194", date: "30.08.2026", direction: "in", category: "Оплата от клиента", counterparty: "Мизнікова Лілія", account: "Касса", amount: 16182 },
]

export type PnlRow = {
  label: string
  amount: number
  kind: "revenue" | "expense" | "total"
}

export const pnl: PnlRow[] = [
  { label: "Выручка от продаж", amount: 1284500, kind: "revenue" },
  { label: "Себестоимость товаров", amount: -712300, kind: "expense" },
  { label: "Валовая прибыль", amount: 572200, kind: "total" },
  { label: "Зарплата", amount: -185000, kind: "expense" },
  { label: "Аренда", amount: -60000, kind: "expense" },
  { label: "Логистика", amount: -34200, kind: "expense" },
  { label: "Прочие расходы", amount: -18600, kind: "expense" },
  { label: "Чистая прибыль", amount: 274400, kind: "total" },
]

/* ---------------- Settings (Настройки) ---------------- */

export type WarehouseRow = {
  id: string
  name: string
  address: string
  responsible: string
  isDefault: boolean
}

export const warehouses: WarehouseRow[] = [
  { id: "W-1", name: "Основной склад", address: "г. Москва, ул. Складская, 10", responsible: "Иван Петров", isDefault: true },
  { id: "W-2", name: "Склад №2 (Юг)", address: "г. Ростов-на-Дону, пр. Промышленный, 5", responsible: "Ольга Кузьмина", isDefault: false },
  { id: "W-3", name: "Транзитный склад", address: "г. Москва, Логистический центр «Восток»", responsible: "Иван Петров", isDefault: false },
]

export type UserRow = {
  id: string
  name: string
  email: string
  role: string
  active: boolean
}

export const users: UserRow[] = [
  { id: "U-1", name: "Иван Петров", email: "ivan@company.ru", role: "Администратор", active: true },
  { id: "U-2", name: "Ольга Кузьмина", email: "olga@company.ru", role: "Менеджер", active: true },
  { id: "U-3", name: "Егор Соколов", email: "egor@company.ru", role: "Кладовщик", active: true },
  { id: "U-4", name: "Анна Лебедева", email: "anna@company.ru", role: "Бухгалтер", active: false },
]
