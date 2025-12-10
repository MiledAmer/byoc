"use client";
import { ShoppingCart, Minus, Plus } from "lucide-react";

import { useState } from "react";
import Image from "next/image";
import type { Product, ProductVariant } from "@/sanity/types/products";
import { useCart } from "@/lib/store";
import { urlFor } from "@/sanity/sanity-utils";
import { toast } from "sonner";
import ProductCard from "./product-card";

export default function ProductDetails({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.selectedVariant ?? product.variants?.[0],
  );
  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(product, selectedVariant, quantity);
      toast.success("Added to cart!");
    }
  };

  return (
    <div className="text-foreground min-h-screen bg-black">
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
                src={
                  product.image?.asset
                    ? (urlFor(product.image)?.url() ??
                      "/black-baseball-cap-neon-trim.jpg")
                    : "/black-baseball-cap-neon-trim.jpg"
                }
                alt={product.title.en}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm tracking-wider text-white/60 uppercase">
                  {product.category.name.en}
                </p>
                <h1 className="mb-4 text-5xl font-black tracking-tighter text-white md:text-6xl">
                  {product.title.en}
                </h1>
                <p className="text-neon glow-text text-4xl font-black">
                  {selectedVariant.price.toFixed(2)} TND
                </p>
              </div>

              <p className="text-lg leading-relaxed text-white/80">
                {product.description.en}
              </p>

              {/* Size Selection */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-wider text-white uppercase">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._key}
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-lg px-4 py-2 font-bold transition ${
                        selectedVariant === variant
                          ? "bg-neon shadow-neon/50 text-black shadow-lg"
                          : "border-neon/30 hover:text-neon hover:border-neon border bg-black text-white/70"
                      }`}
                    >
                      {variant.weight}
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
                disabled={!selectedVariant}
                className={`bg-neon flex w-full items-center justify-center gap-3 rounded-lg py-4 text-lg font-black tracking-wider text-black uppercase transition ${
                  !selectedVariant
                    ? "cursor-not-allowed bg-white/10 text-white/30"
                    : "bg-neon hover:shadow-neon/50 text-black hover:shadow-2xl"
                }`}
              >
                <>
                  <ShoppingCart size={24} />
                  Add to Cart
                </>
              </button>
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
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
