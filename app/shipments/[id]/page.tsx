import { notFound } from "next/navigation"
import { ShipmentForm } from "@/components/shipment-form"
import { getShipment } from "@/lib/data"

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const shipment = getShipment(id)
  if (!shipment) notFound()
  return <ShipmentForm shipment={shipment} />
}
