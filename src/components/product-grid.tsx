import { getFilteredProducts } from "@/sanity/sanity-utils";
import ProductCard from "./product-card";
import { Suspense } from "react";
import SectionLoader from "./section-loader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function FeaturedProducts() {
  const data = await getFilteredProducts({
    pageSize: 6,
  });
  const products = data.products;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < 6}
        />
      ))}
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section className="relative min-h-screen bg-black px-4 py-24">
      {/* Background elements */}
      <div className="bg-neon absolute top-0 left-1/4 h-80 w-80 rounded-full opacity-10 mix-blend-screen blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-5xl font-black tracking-tighter md:text-6xl">
              <span className="text-neon glow-text">FEATURED</span>
              <br />
              <span className="text-white">COLLECTION</span>
            </h2>
            <p className="text-lg text-white/60">Curated chaos for the bold</p>
          </div>

          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-sm text-neon font-bold tracking-wider uppercase transition hover:text-white hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
          >
            See More Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Suspense fallback={<div className="flex justify-center py-20"><SectionLoader /></div>}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </section>
  );
}
