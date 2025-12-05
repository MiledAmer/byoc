"use client";

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Neon Chaos Hoodie",
    price: "$89",
    image: "/neon-green-hoodie-streetwear.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Grid Tee",
    price: "$39",
    image: "/black-graphic-t-shirt-geometric.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Electric Cargo Pants",
    price: "$129",
    image: "/black-cargo-pants-neon-details.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Void Jacket",
    price: "$199",
    image: "/black-jacket-neon-accents.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Pulse Cap",
    price: "$45",
    image: "/black-baseball-cap-neon-trim.jpg",
    rating: 4,
  },
  {
    id: 6,
    name: "Circuit Socks",
    price: "$15",
    image: "/neon-green-socks-pattern.jpg",
    rating: 5,
  },
];

export default function ProductGrid() {
  return (
    <section className="relative min-h-screen bg-black px-4 py-24">
      {/* Background elements */}
      <div className="bg-neon absolute top-0 left-1/4 h-80 w-80 rounded-full opacity-10 mix-blend-screen blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black tracking-tighter md:text-6xl">
            <span className="text-neon glow-text">FEATURED</span>
            <br />
            <span className="text-white">COLLECTION</span>
          </h2>
          <p className="text-lg text-white/60">Curated chaos for the bold</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group border-neon/30 hover:border-neon hover:shadow-neon/50 relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
            >
              <div
                key={product.id}
                className="group border-neon/30 hover:border-neon hover:shadow-neon/50 relative overflow-hidden rounded-lg border bg-black/50 backdrop-blur transition hover:shadow-lg"
              >
                {/* Hover glow */}
                <div className="bg-neon absolute inset-0 opacity-0 mix-blend-screen transition group-hover:opacity-10" />

                <div className="relative h-64 overflow-hidden md:h-72">
                  <Image
                    width={200}
                    height={200}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition group-hover:scale-110"
                  />
                </div>

                <div className="relative p-4">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {product.name}
                  </h3>

                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: product.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-neon text-neon"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/40">
                      ({product.rating}/5)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neon text-2xl font-black">
                      {product.price}
                    </span>
                    <button className="bg-neon/20 hover:bg-neon text-neon border-neon rounded-lg border p-2 transition hover:text-black">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
