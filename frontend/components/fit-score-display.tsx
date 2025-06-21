"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FitScoreDisplayProps {
  score: number
  isVisible: boolean
}

export default function FitScoreDisplay({ score, isVisible }: FitScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedScore((prev) => {
            const increment = score / 50 // Animate over ~50 steps
            const next = prev + increment
            if (next >= score) {
              clearInterval(interval)
              return score
            }
            return next
          })
        }, 20)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isVisible, score])

  const getScoreColor = (score: number) => {
    if (score >= 8) return "from-green-400 to-emerald-500"
    if (score >= 6) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-pink-500"
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 8.5) return "🔥"
    if (score >= 7.5) return "✨"
    if (score >= 6) return "👍"
    return "🤔"
  }

  const getScoreText = (score: number) => {
    if (score >= 8) return "Fire fit!"
    if (score >= 6) return "Pretty good!"
    return "Needs work!"
  }

  return (
    <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <div
            className={`inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-r ${getScoreColor(score)} text-white shadow-2xl mb-6 transform transition-all duration-1000 ${
              isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
            }`}
          >
            <div className="text-center">
              <div className="text-5xl font-bold">{animatedScore.toFixed(1)}</div>
              <div className="text-sm opacity-90">/ 10</div>
            </div>
          </div>
          <div
            className={`text-6xl mb-4 transform transition-all duration-700 delay-500 ${
              isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            {getScoreEmoji(score)}
          </div>
          <h3
            className={`text-3xl font-bold text-gray-800 transform transition-all duration-700 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {getScoreText(score)}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}
