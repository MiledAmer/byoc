"use client"

import { useCart } from "@/lib/store"
import { CartItemRow } from "@/components/cart-item-row"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, getTotal, clearCart} = useCart()
  const total = getTotal()
  const itemCount = items.length

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-neon/30 mb-6" />
            <h1 className="text-4xl font-black text-white mb-4 glow-text">Your Cart is Empty</h1>
            <p className="text-white/50 mb-8">Time to add some chaos to your wardrobe</p>
            <Link href="/products">
              <Button className="bg-neon text-black hover:bg-neon/80 font-bold uppercase tracking-wider">
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-neon mb-2 glow-text">Shopping Cart</h1>
          <p className="text-white/50">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-neon/30 bg-black/50 p-6 backdrop-blur-sm">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>

              {/* Clear Cart */}
              <div className="mt-6 pt-6 border-t border-neon/20">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-neon/30 bg-black/50 p-6 backdrop-blur-sm sticky top-24">
              <h2 className="text-2xl font-black text-white mb-6 glow-text-sm">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
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

              <div className="border-t border-neon/20 pt-4 mb-6">
                <div className="flex justify-between text-xl font-black">
                  <span className="text-white">Total</span>
                  <span className="text-neon glow-text">TND{total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-neon text-black hover:bg-neon/80 font-bold uppercase tracking-wider mb-3 py-6 text-lg">
                {/* Proceed to Checkout */}
                Payment on Delivery
              </Button>

              <Link href="/products">
                <Button variant="outline" className="w-full border-neon/30 text-neon hover:bg-neon/10 bg-transparent">
                  <ArrowLeft size={20} className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
