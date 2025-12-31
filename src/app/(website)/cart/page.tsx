"use client";

import { useCart } from "@/lib/store";
import { CartItemRow } from "@/components/cart-item-row";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, getTotal, clearCart } = useCart();
  const total = getTotal();
  const itemCount = items.length;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-16 text-center">
            <ShoppingBag size={64} className="text-neon/30 mx-auto mb-6" />
            <h1 className="glow-text mb-4 text-4xl font-black text-white">
              Your Cart is Empty
            </h1>
            <p className="mb-8 text-white/50">
              Time to add some chaos to your wardrobe
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
          <h1 className="text-neon glow-text mb-2 text-4xl font-black">
            Shopping Cart
          </h1>
          <p className="text-white/50">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border-neon/30 rounded-lg border bg-black/50 p-6 backdrop-blur-sm">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>

              {/* Clear Cart */}
              <div className="border-neon/20 mt-6 border-t pt-6">
                <Button
                  onClick={clearCart}
                  variant="destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-neon/30 sticky top-24 rounded-lg border bg-black/50 p-6 backdrop-blur-sm">
              <h2 className="glow-text-sm mb-6 text-2xl font-black text-white">
                Order Summary
              </h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-semibold">TND {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-neon/20 mb-6 border-t pt-4">
                <div className="flex justify-between text-xl font-black">
                  <span className="text-white">Total</span>
                  <span className="text-neon glow-text">
                    TND {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="bg-neon hover:bg-neon/80 mb-3 w-full py-6 text-lg font-bold tracking-wider text-black uppercase">
                <Link href="/checkout">
                  {/* Proceed to Checkout */}
                  Payment on Delivery
                </Link>
              </Button>

              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-neon/30 text-neon hover:bg-neon/10 w-full hover:text-white bg-transparent"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
