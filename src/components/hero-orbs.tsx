"use client";

import { useEffect, useRef } from "react";

export default function HeroOrbs() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId = 0;
    let time = 0;

    // Define the animation loop
    const animate = () => {
      time += 0.003;
      const PHI = 1.618; // Golden Ratio

      const x1 = -50 + Math.cos(time) * 40;
      const y1 = 50 + Math.sin(time * PHI) * 40;

      const x2 = 50 + Math.cos(time * PHI) * 40;
      const y2 = -50 + Math.sin(time) * 40;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${x1}vw, ${y1}vh)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${x2}vw, ${y2}vh)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    // Use matchMedia to handle screen size changes dynamically
    // This is more robust than window.innerWidth and handles resizing
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleVisibility = (e?: MediaQueryListEvent) => {
      const isDesktop = e ? e.matches : mediaQuery.matches;

      if (isDesktop) {
        // Start animation if not already running
        if (!animationId) {
          animate();
        }
      } else {
        // Stop animation immediately on mobile
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      }
    };

    // Initial check
    handleVisibility();

    // Listen for resize/changes
    mediaQuery.addEventListener("change", handleVisibility);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      mediaQuery.removeEventListener("change", handleVisibility);
    };
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <div
          ref={orb1Ref}
          className="bg-neon absolute top-0 right-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl will-change-transform"
        />
        <div
          ref={orb2Ref}
          className="bg-neon absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl will-change-transform"
        />
      </div>
      <div className="md:hidden">
        <div className="bg-neon absolute top-20 right-0 h-96 w-96 rounded-full opacity-20 mix-blend-screen blur-3xl" />
        <div className="bg-neon absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-10 mix-blend-screen blur-3xl" />
      </div>
    </>
  );
}
