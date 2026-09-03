import { StockDocTable } from "@/components/stock-doc-table"
import { receipts } from "@/lib/data"

export default function ReceiptsPage() {
  return (
    <StockDocTable
      title="Оприходования"
      subtitle="Поступление товаров на склад"
      docs={receipts}
      addLabel="Оприходование"
      accent="in"
    />
  )
}
