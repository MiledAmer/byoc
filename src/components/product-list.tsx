import ProductCard from "@/components/product-card";
import { getFilteredProducts } from "@/sanity/sanity-utils";
import PaginationComponent from "./pagination-component";

export default async function ProductList({
  category,
  search,
  page = 1,
}: {
  category?: string;
  search?: string;
  page?: number;
}) {

  console.log("Category:", category, "Search:", search, "Page:", page);
  const PAGESIZE = 9;
  const { products, totalPages, total } = await getFilteredProducts({
    categorySlug: category,
    search,
    page,
    pageSize: PAGESIZE,
  });

  const start = (page - 1) * PAGESIZE + 1;
  const end = Math.min(page * PAGESIZE, total);
  return (
    <>
      <div className="mb-8">
        <p className="text-white/60">
          Showing {start}-{end} of {total} products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            priority={index < 6}
          />
        ))}
      </div>

      <PaginationComponent totalPages={totalPages} />
    </>
  );
}
