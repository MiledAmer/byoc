import { getFilteredProducts } from "@/sanity/sanity-utils";
import ProductCard from "./product-card";


export default async function ProductGrid() {
  const data = await getFilteredProducts({
    pageSize: 6,
  });
  const products = data.products;
  return (
    <section className="relative min-h-screen bg-black px-4 py-24">
      {/* Background elements */}
      <div className="bg-neon absolute top-0 left-1/4 h-80 w-80 rounded-full opacity-10 mix-blend-screen blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black tracking-tighter md:text-6xl">
            <span className="text-neon glow-text">FEATURED</span>
            <br />
            <span className="text-white">COLLECTION</span>
          </h2>
          <p className="text-lg text-white/60">Curated chaos for the bold</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
