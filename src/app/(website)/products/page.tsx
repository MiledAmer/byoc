import { getCategoriesWithSubcategories } from "@/sanity/sanity-utils";
import CategoriesSection from "@/components/categories-section";
import { Suspense } from "react";
import ProductList from "@/components/product-list";
import SectionLoader from "@/components/section-loader";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const { category, search, page } = await searchParams;
  const categories = await getCategoriesWithSubcategories();
  const currentPage = page ? Number(page) : 1;

  return (
    <div className="text-foreground min-h-screen bg-black">
      {/* Hero Section */}
      <section className="border-neon/20 relative border-b bg-black px-4 py-16">
        <div className="bg-neon absolute top-1/2 right-1/4 h-96 w-96 rounded-full opacity-5 mix-blend-screen blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-6xl font-black tracking-tighter md:text-8xl">
            <span className="text-white">ALL</span>{" "}
            <span className="text-neon glow-text">PRODUCTS</span>
          </h1>
          <p className="text-lg text-white/60 md:text-xl">
            Embrace the chaos. Own your style.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <Suspense>
        <CategoriesSection categories={categories} />
      </Suspense>

      {/* Products Grid */}
      <section className="relative min-h-screen bg-black px-4 py-16">
        <div className="bg-neon absolute top-1/3 left-1/4 h-80 w-80 rounded-full opacity-10 mix-blend-screen blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Suspense
            key={`${category}-${search}-${currentPage}`}
            fallback={
              <div className="flex justify-center py-20">
                <SectionLoader />
              </div>
            }
          >
            <ProductList
              category={category}
              search={search}
              page={currentPage}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
