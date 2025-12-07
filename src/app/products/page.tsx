
import Header from "@/components/header";
import Footer from "@/components/footer";

import ProductCard from "@/components/product-card";
import { getFilteredProducts } from "@/sanity/sanity-utils";

export default async function ProductsPage() {
  // const [selectedCategory, setSelectedCategory] = useState("All");

  const data = await getFilteredProducts();
  const filteredProducts = data.products;

  return (
    <div className="text-foreground min-h-screen bg-black">
      <Header />

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
      {/* <section className="border-neon/20 sticky top-0 z-40 border-b bg-black/90 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-6 py-2 text-sm font-bold tracking-wider whitespace-nowrap uppercase transition ${
                  selectedCategory === category
                    ? "bg-neon shadow-neon/50 text-black shadow-lg"
                    : "border-neon/30 hover:text-neon hover:border-neon border bg-black text-white/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Grid */}
      <section className="relative min-h-screen bg-black px-4 py-16">
        <div className="bg-neon absolute top-1/3 left-1/4 h-80 w-80 rounded-full opacity-10 mix-blend-screen blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
