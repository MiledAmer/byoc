"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/store";
import { urlFor } from "@/sanity/sanity-utils";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const subtotal = item.variant.price * item.quantity;

  return (
    <div className="border-neon/20 flex gap-4 border-b pb-4 last:border-b-0">
      {/* Product Image */}
      <Link href={`/products/${item.product._id}`}>
        <div className="border-neon/30 relative h-24 w-24 overflow-hidden rounded-lg border bg-black/50">
          <Image
            src={
              item.product.image?.asset
                ? (urlFor(item.product.image)?.url() ??
                  "/organic-acacia-honey.jpg")
                : "/organic-acacia-honey.jpg"
            }
            alt={item.product.title.en}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/products/${item.product._id}`}>
            <h3 className="hover:text-neon glow-text-sm font-semibold text-white transition-colors">
              {item.product.title.en}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-white/50">{item.variant.weight}</p>
          <p className="text-neon mt-1 text-sm font-bold">
            TND {item.variant.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="text-neon hover:bg-neon/20 border-neon/30 rounded border bg-black/50 px-3 py-1 text-sm font-medium transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-semibold text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="text-neon hover:bg-neon/20 border-neon/30 rounded border bg-black/50 px-3 py-1 text-sm font-medium transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="mb-1 text-xs text-white/50">Subtotal</p>
          <p className="text-neon glow-text-sm text-lg font-bold">
            TND {subtotal.toFixed(2)}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
