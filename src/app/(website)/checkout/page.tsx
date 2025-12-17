"use client";

import { useCart } from "@/lib/store";
import { CheckoutForm } from "@/components/checkout-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity-utils";

export default function CheckoutPage() {
  const { items, getTotal } = useCart();
  const total = getTotal();
  const itemCount = items.length;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-16 text-center">
            <h1 className="glow-text mb-4 text-4xl font-black text-white">
              Your Cart is Empty
            </h1>
            <p className="mb-8 text-white/50">
              Add some items before checking out
            </p>
            <Link href="/products">
              <Button className="bg-neon hover:bg-neon/80 font-bold tracking-wider text-black uppercase">
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="text-neon hover:text-neon/80 mb-4 inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-neon glow-text mb-2 text-4xl font-black">
            Checkout
          </h1>
          <p className="text-white/50">Complete your order</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="border-neon/30 rounded-lg border bg-black/50 p-6 backdrop-blur-sm">
              <h2 className="glow-text-sm mb-6 text-2xl font-black text-white">
                Shipping Information
              </h2>
              <CheckoutForm />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-neon/30 sticky top-24 rounded-lg border bg-black/50 p-6 backdrop-blur-sm">
              <h2 className="glow-text-sm mb-6 text-2xl font-black text-white">
                Order Summary
              </h2>

              {/* Items */}
              <div className="mb-6 max-h-[400px] space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-neon/20 flex gap-4 border-b pb-4"
                  >
                    <Image
                      src={
                        item.product.image?.asset
                          ? (urlFor(item.product.image)?.url() ??
                            "/organic-acacia-honey.jpg")
                          : "/organic-acacia-honey.jpg"
                      }
                      width={200}
                      height={200}
                      alt={item.product.title.en}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-white">
                        {item.product.title.en}
                      </h3>
                      <p className="text-xs text-white/50">
                        {item.variant.weight}
                      </p>
                      <p className="text-xs text-white/50">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-neon text-sm font-bold">
                        TND {(item.variant.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">TND {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span className="font-semibold">TND 0.00</span>
                </div>
              </div>

              <div className="border-neon/20 border-t pt-4">
                <div className="flex justify-between text-xl font-black">
                  <span className="text-white">Total</span>
                  <span className="text-neon glow-text">
                    TND {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
