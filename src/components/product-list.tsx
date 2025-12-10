import ProductCard from "@/components/product-card";
import { getFilteredProducts } from "@/sanity/sanity-utils";

export default async function ProductList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const data = await getFilteredProducts({ categorySlug: category, search });
  const filteredProducts = data.products;

  return (
    <>
      <div className="mb-8">
        <p className="text-white/60">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
