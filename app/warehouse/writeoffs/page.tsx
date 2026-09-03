import { StockDocTable } from "@/components/stock-doc-table"
import { writeoffs } from "@/lib/data"

export default function WriteoffsPage() {
  return (
    <StockDocTable
      title="Списания"
      subtitle="Списание товаров со склада"
      docs={writeoffs}
      addLabel="Списание"
      accent="out"
    />
  )
}
