import { notFound } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { getProduct } from "@/lib/data"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()
  return <ProductForm product={product} />
}
