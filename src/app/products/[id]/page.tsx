import ProductDetails from "@/components/product-details";
import { getFilteredProducts, getProductByID } from "@/sanity/sanity-utils";
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
  const relatedProducts = await getFilteredProducts({
    categorySlug: product.category.slug.current,
    page: 1,
    pageSize: 6,
  })

  return <ProductDetails product={product} relatedProducts={relatedProducts.products} />;
}
