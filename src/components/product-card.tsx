"use client";
import { useCart } from "@/lib/store";
import { urlFor } from "@/sanity/sanity-utils";
import type { Product } from "@/sanity/types/products";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem(product, product.selectedVariant, 1);
    toast.success("Added to cart!");
  };
  return (
    <Link
      key={product._id}
      href={`/products/${product._id}`}
      className="group border-neon/30 hover:border-neon hover:shadow-neon/50 relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
    >
      <div
        key={product._id}
        className="group border-neon/30 hover:border-neon hover:shadow-neon/50 relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
      >
        {/* Hover glow */}
        <div className="bg-neon absolute inset-0 opacity-0 mix-blend-screen transition group-hover:opacity-10" />

        <div className="relative h-64 overflow-hidden md:h-72">
          <Image
            width={200}
            height={200}
            src={
              product.image?.asset
                ? (urlFor(product.image)?.url() ??
                  "/black-baseball-cap-neon-trim.jpg")
                : "/black-baseball-cap-neon-trim.jpg"
            }
            alt={product.title.en}
            className="h-full w-full object-cover transition group-hover:scale-110"
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
              className="bg-neon/20 hover:bg-neon text-neon border-neon rounded-lg border p-2 transition hover:text-black"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
