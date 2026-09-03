import { notFound } from "next/navigation"
import { OrderForm } from "@/components/order-form"
import { getOrder } from "@/lib/data"

export default async function PurchaseOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = getOrder(id)
  if (!order) notFound()
  return <OrderForm order={order} />
}
