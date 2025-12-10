"use client"

import { useEffect, useState } from "react"

export default function NeonLoading() {
  const [glitchText, setGlitchText] = useState("LOADING")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"
    const originalText = "LOADING"
    let iteration = 0

    const interval = setInterval(() => {
      setGlitchText(
        originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index]
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join(""),
      )

      if (iteration >= originalText.length) {
        iteration = 0
      } else {
        iteration += 1 / 3
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        {/* Neon bars animation */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="relative w-2 bg-zinc-900 rounded-full overflow-hidden" style={{ height: "60px" }}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-neon rounded-full transition-all duration-100"
                style={{
                  height: `${Math.min(100, Math.max(0, progress - i * 6.67))}%`,
                  boxShadow: "0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Glitch text */}
        <div className="text-center">
          <div className="relative inline-block">
            <h2
              className="text-4xl font-black tracking-wider text-neon"
              style={{
                textShadow:
                  "0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.3)",
              }}
            >
              {glitchText}
            </h2>
            {/* Glitch layers */}
            <h2
              className="absolute inset-0 text-4xl font-black tracking-wider text-neon opacity-70"
              style={{
                textShadow: "2px 0 rgba(255, 0, 0, 0.8)",
                clipPath: "inset(0 0 0 0)",
                animation: "glitch-1 2s infinite linear alternate-reverse",
              }}
            >
              {glitchText}
            </h2>
            <h2
              className="absolute inset-0 text-4xl font-black tracking-wider text-neon opacity-70"
              style={{
                textShadow: "-2px 0 rgba(0, 255, 255, 0.8)",
                clipPath: "inset(0 0 0 0)",
                animation: "glitch-2 2.5s infinite linear alternate-reverse",
              }}
            >
              {glitchText}
            </h2>
          </div>
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
