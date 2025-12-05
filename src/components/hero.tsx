"use client";

import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#00ff00"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Neon glow background elements */}
      <div className="bg-neon absolute top-20 right-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl" />
      <div className="bg-neon absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-10 mix-blend-screen blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="space-y-6">
          <h1 className="text-6xl leading-tight font-black tracking-tighter md:text-8xl">
            <span className="text-neon glow-text ">
              BUY YOUR
            </span>
            <br />
            <span className="text-white drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">
              OWN CLOTHES
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
            Express yourself. Break the mold. BYOC is where chaotic style meets
            bold fashion.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button className="bg-neon hover:bg-neon/90 glow-text rounded-lg px-8 py-3 font-bold tracking-wider text-black uppercase transition">
              Shop Now
            </button>
            <button className="text-neon border-neon hover:bg-neon/10 rounded-lg border-2 px-8 py-3 font-bold tracking-wider uppercase transition">
              Explore
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} className="text-neon" />
        </div>
      </div>
    </div>
  );
}
