"use client";
import { useCart } from "@/lib/store";
import { urlFor } from "@/sanity/sanity-utils";
import type { Product } from "@/sanity/types/products";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const isOutOfStock = !product.selectedVariant.availability;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem(product, product.selectedVariant, 1);
    toast.success("Added to cart!");
  };
  return (
    <Link
      key={product._id}
      href={`/products/${product._id}`}
      className="relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
    >
      <div
        key={product._id}
        className="group border-neon/30 hover:border-neon hover:shadow-neon/50 relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
      >
        {/* Hover glow */}
        <div className="bg-neon absolute inset-0 opacity-0 mix-blend-screen transition group-hover:opacity-10" />

        <div className="relative h-64 overflow-hidden md:h-72">
          {isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
              <span className="rounded-full bg-red-500/80 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                Out of Stock
              </span>
            </div>
          )}
          <Image
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...(priority ? { fetchPriority: "high" } : {})}
            src={
              product.image?.asset
                ? (urlFor(product.image)?.url() ?? "/placeholder.svg")
                : "/placeholder.svg"
            }
            alt={product.title.en}
            className="object-cover transition group-hover:scale-110"
          />
        </div>

        <div className="relative p-4">
          <h3 className="mb-2 text-lg font-bold text-white">
            {product.title.en}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-neon text-2xl font-black">
              {product.selectedVariant.price.toFixed(2)}TND
            </span>
            <button
              disabled={isOutOfStock}
              className={`rounded-lg border p-2 transition ${
                isOutOfStock
                  ? "cursor-not-allowed border-gray-600 bg-gray-800 text-gray-500"
                  : "bg-neon/20 hover:bg-neon text-neon border-neon hover:text-black"
              }`}
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
