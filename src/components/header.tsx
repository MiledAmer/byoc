"use client";

import { useState, Suspense } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store";
import SearchBar from "./search-bar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-neon/20 relative z-50 border-b bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tighter">
            <span className="text-neon glow-text">BYOC</span>
          </div>
        </Link>

        <Suspense>
          <SearchBar />
        </Suspense>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 md:flex">
          <Link
            href="/products"
            className="hover:text-neon text-sm font-medium tracking-wider text-white/70 uppercase transition hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
          >
            Shop
          </Link>
          {["About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-neon text-sm font-medium tracking-wider text-white/70 uppercase transition hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Suspense>
            <SearchBar Mobile={true} />
          </Suspense>
          <button className="relative">
            <Link href="/cart" aria-label="View cart">
              <ShoppingBag size={20} className="text-neon" />
              <span className="bg-neon absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-black">
                {cartCount}
              </span>
            </Link>
          </button>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="border-neon/20 border-t bg-black px-4 py-4 md:hidden">
          <Link
            href="/products"
            className="hover:text-neon block py-2 text-sm font-medium tracking-wider text-white/70 uppercase transition"
          >
            Shop
          </Link>
          {["About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-neon block py-2 text-sm font-medium tracking-wider text-white/70 uppercase transition"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
