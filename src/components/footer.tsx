"use client"

import { Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-neon/20 bg-black py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black text-neon mb-4">BYOC</h3>
            <p className="text-white/60 text-sm">Buy Your Own Clothes. Express the chaos.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-neon transition">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon transition">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon transition">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Help</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-neon transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon transition">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neon transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-neon transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-neon transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-neon transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neon/20 pt-8">
          <p className="text-center text-sm text-white/40">© 2025 BYOC. All rights reserved. Express yourself.</p>
        </div>
      </div>
    </footer>
  )
}
