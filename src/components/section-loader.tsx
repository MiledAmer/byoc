"use client"

import { useEffect, useState } from "react"

interface SectionLoaderProps {
  text?: string
  barCount?: number
  size?: "sm" | "md" | "lg"
}

export default function SectionLoader({ text = "LOADING", barCount = 8, size = "md" }: SectionLoaderProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [progress, setProgress] = useState(0)

  const sizeClasses = {
    sm: { bar: "w-1.5 h-8", text: "text-xl", gap: "gap-1" },
    md: { bar: "w-2 h-12", text: "text-2xl", gap: "gap-2" },
    lg: { bar: "w-3 h-16", text: "text-4xl", gap: "gap-3" },
  }

  const currentSize = sizeClasses[size]

  useEffect(() => {
    const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"
    let iteration = 0

    const interval = setInterval(() => {
      setGlitchText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) {
              return text[index]
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join(""),
      )

      if (iteration >= text.length) {
        iteration = 0
      } else {
        iteration += 1 / 3
      }
    }, 100)

    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1.5
      })
    }, 30)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Neon bars animation */}
      <div className={`flex ${currentSize.gap} mb-6`}>
        {Array.from({ length: barCount }).map((_, i) => (
          <div key={i} className={`relative ${currentSize.bar} bg-zinc-900 rounded-full overflow-hidden`}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-neon rounded-full transition-all duration-100"
              style={{
                height: `${Math.min(100, Math.max(0, progress - i * (100 / barCount)))}%`,
                boxShadow: "0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Glitch text */}
      <div className="text-center">
        <div className="relative inline-block">
          <h3
            className={`${currentSize.text} font-black tracking-wider text-neon`}
            style={{
              textShadow: "0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.3)",
            }}
          >
            {glitchText}
          </h3>
          {/* Glitch layers */}
          <h3
            className={`absolute inset-0 ${currentSize.text} font-black tracking-wider text-neon opacity-70`}
            style={{
              textShadow: "2px 0 rgba(255, 0, 0, 0.8)",
              clipPath: "inset(0 0 0 0)",
              animation: "glitch-1 2s infinite linear alternate-reverse",
            }}
          >
            {glitchText}
          </h3>
          <h3
            className={`absolute inset-0 ${currentSize.text} font-black tracking-wider text-neon opacity-70`}
            style={{
              textShadow: "-2px 0 rgba(0, 255, 255, 0.8)",
              clipPath: "inset(0 0 0 0)",
              animation: "glitch-2 2.5s infinite linear alternate-reverse",
            }}
          >
            {glitchText}
          </h3>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch-1 {
          0% {
            clip-path: inset(40% 0 61% 0);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
          }
        }

        @keyframes glitch-2 {
          0% {
            clip-path: inset(65% 0 15% 0);
          }
          20% {
            clip-path: inset(15% 0 65% 0);
          }
          40% {
            clip-path: inset(61% 0 5% 0);
          }
          60% {
            clip-path: inset(70% 0 15% 0);
          }
          80% {
            clip-path: inset(20% 0 58% 0);
          }
          100% {
            clip-path: inset(45% 0 40% 0);
          }
        }
      `}</style>
    </div>
  )
}
