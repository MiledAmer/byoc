"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") ?? "UNKNOWN"

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center py-16 rounded-lg border border-neon/30 bg-black/50 backdrop-blur-sm">
          <CheckCircle2 size={80} className="mx-auto text-neon mb-6 glow-icon" />
          <h1 className="text-5xl font-black text-neon mb-4 glow-text">Order Placed!</h1>
          <p className="text-xl text-white/70 mb-2">Your order has been confirmed</p>
          <p className="text-sm text-white/50 mb-8">
            Order ID: <span className="text-neon font-mono">{orderId}</span>
          </p>

          <div className="bg-neon/10 border border-neon/30 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-white mb-2">What&apos;s Next?</h2>
            <ul className="text-sm text-white/70 text-left space-y-2">
              <li>✓ Order confirmation email sent</li>
              <li>✓ We&apos;ll prepare your items for shipping</li>
              <li>✓ Track your order via email updates</li>
              <li>✓ Estimated delivery: 3-5 business days</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-neon text-black hover:bg-neon/80 font-bold uppercase tracking-wider">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-neon/30 text-neon hover:bg-neon/10 bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black pt-24 pb-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-white">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
