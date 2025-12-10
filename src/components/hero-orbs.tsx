"use client";

import { useEffect, useState } from "react";

export default function HeroOrbs() {
  const [orb1Position, setOrb1Position] = useState({ x: 0, y: 20 });
  const [orb2Position, setOrb2Position] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let time = 0;

    const animate = () => {
      time += 0.003;
      const PHI = 1.618; // Golden Ratio

      // Orb 1 (Top Right Origin) -> Center is (-50vw, 50vh)
      // Lissajous figure using Golden Ratio for non-repeating orbital path
      setOrb1Position({
        x: -50 + Math.cos(time) * 40,
        y: 50 + Math.sin(time * PHI) * 40,
      });

      // Orb 2 (Bottom Left Origin) -> Center is (50vw, -50vh)
      setOrb2Position({
        x: 50 + Math.cos(time * PHI) * 40,
        y: -50 + Math.sin(time) * 40,
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  return (
    <>
      <div className="hidden md:block">
        <div
          className="bg-neon absolute top-0 right-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl transition-transform duration-1000 ease-linear"
          style={{
            transform: `translate(${orb1Position.x}vw, ${orb1Position.y}vh)`,
          }}
        />
        <div
          className="bg-neon absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl transition-transform duration-1000 ease-linear"
          style={{
            transform: `translate(${orb2Position.x}vw, ${orb2Position.y}vh)`,
          }}
        />
      </div>
      <div className="md:hidden">
        <div className="bg-neon absolute top-20 right-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl" />
        <div className="bg-neon absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-10 mix-blend-screen blur-3xl" />
      </div>
    </>
  );
}
