"use client"

import { useState } from "react"
import { ShoppingBag, Menu, X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/store"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="relative z-50 border-b border-neon/20 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tighter">
            <span className="text-neon glow-text">BYOC</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 md:flex">
          <Link
            href="/products"
            className="text-sm font-medium uppercase tracking-wider text-white/70 transition hover:text-neon hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
          >
            Shop
          </Link>
          {["About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium uppercase tracking-wider text-white/70 transition hover:text-neon hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative">
            <ShoppingBag size={20} className="text-neon" />
            <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-neon text-xs font-bold text-black flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="border-t border-neon/20 bg-black px-4 py-4 md:hidden">
          <Link
            href="/products"
            className="block py-2 text-sm font-medium uppercase tracking-wider text-white/70 transition hover:text-neon"
          >
            Shop
          </Link>
          {["About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="block py-2 text-sm font-medium uppercase tracking-wider text-white/70 transition hover:text-neon"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
