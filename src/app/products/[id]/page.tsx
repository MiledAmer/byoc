"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getProductById, products } from "@/lib/products";
import { Star, ShoppingCart, Minus, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const product = getProductById(Number.parseInt(resolvedParams.id));

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="text-foreground min-h-screen bg-black">
      <Header />

      {/* Product Detail */}
      <section className="relative px-4 py-16">
        <div className="bg-neon absolute top-1/4 right-1/3 h-96 w-96 rounded-full opacity-5 mix-blend-screen blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="border-neon/30 relative aspect-square overflow-hidden rounded-lg border bg-black/50 backdrop-blur">
              <div className="bg-neon absolute inset-0 opacity-5 mix-blend-screen" />
              <Image
                width={200}
                height={288}
                src={product.image ?? "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm tracking-wider text-white/60 uppercase">
                  {product.category}
                </p>
                <h1 className="mb-4 text-5xl font-black tracking-tighter text-white md:text-6xl">
                  {product.name}
                </h1>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: Number(product.rating) }).map((_, i) => (
                      <Star key={i} size={20} className="fill-neon text-neon" />
                    ))}
                  </div>
                  <span className="text-white/40">({product.rating}/5)</span>
                </div>
                <p className="text-neon glow-text text-4xl font-black">
                  {product.priceFormatted}
                </p>
              </div>

              <p className="text-lg leading-relaxed text-white/80">
                {product.description}
              </p>

              {/* Size Selection */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-white uppercase">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg px-4 py-2 font-bold transition ${
                        selectedSize === size
                          ? "bg-neon shadow-neon/50 text-black shadow-lg"
                          : "border-neon/30 hover:text-neon hover:border-neon border bg-black text-white/70"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-white uppercase">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-lg px-4 py-2 font-bold transition ${
                        selectedColor === color
                          ? "bg-neon shadow-neon/50 text-black shadow-lg"
                          : "border-neon/30 hover:text-neon hover:border-neon border bg-black text-white/70"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-white uppercase">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-neon/30 text-neon hover:border-neon hover:bg-neon/20 rounded-lg border bg-black p-2 transition"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center text-2xl font-black text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-neon/30 text-neon hover:border-neon hover:bg-neon/20 rounded-lg border bg-black p-2 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className={`flex w-full items-center justify-center gap-3 rounded-lg py-4 text-lg font-black tracking-wider uppercase transition ${
                  addedToCart
                    ? "bg-neon text-black"
                    : !selectedSize || !selectedColor
                      ? "cursor-not-allowed bg-white/10 text-white/30"
                      : "bg-neon hover:shadow-neon/50 text-black hover:shadow-2xl"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={24} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    Add to Cart
                  </>
                )}
              </button>

              {(!selectedSize || !selectedColor) && (
                <p className="text-center text-sm text-white/40">
                  Please select size and color
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-neon/20 relative border-t px-4 py-16">
          <div className="relative z-10 mx-auto max-w-7xl">
            <h2 className="mb-8 text-4xl font-black tracking-tighter md:text-5xl">
              <span className="text-white">YOU MIGHT</span>{" "}
              <span className="text-neon glow-text">ALSO LIKE</span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group border-neon/30 hover:border-neon hover:shadow-neon/50 relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
                >
                  <div className="bg-neon absolute inset-0 opacity-0 mix-blend-screen transition group-hover:opacity-10" />

                  <div className="relative h-64 overflow-hidden">
                    <Image
                      width={200}
                      height={288}
                      src={product.image ?? "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition group-hover:scale-110"
                    />
                  </div>

                  <div className="relative p-4">
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {product.name}
                    </h3>
                    <span className="text-neon text-2xl font-black">
                      {product.priceFormatted}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
