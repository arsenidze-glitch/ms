import { notFound } from "next/navigation"
import { CustomerForm } from "@/components/customer-form"
import { getCustomer } from "@/lib/data"

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = getCustomer(id)
  if (!customer) notFound()
  return <CustomerForm customer={customer} />
}
