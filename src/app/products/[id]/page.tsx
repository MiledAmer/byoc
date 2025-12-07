import ProductDetails from "@/components/product-details";
import { getProductByID } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByID(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
