"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface FitScoreDisplayProps {
  score: number
  isVisible: boolean
}

export default function FitScoreDisplay({ score, isVisible }: FitScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayScore((prev) => {
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
    if (score >= 8) return "from-green-500 to-emerald-500"
    if (score >= 6) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-500"
  }

  const getScoreText = (score: number) => {
    if (score >= 9) return "Fire! 🔥"
    if (score >= 8) return "Looking Good! ✨"
    if (score >= 7) return "Pretty Solid! 👌"
    if (score >= 6) return "Not Bad! 👍"
    if (score >= 5) return "Room to Improve 📈"
    return "Let's Work on This! 💪"
  }

  return (
    <div
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Your Fit Score</h3>
          </div>

          <div className="relative mb-8">
            <div
              className={`text-8xl font-black bg-gradient-to-r ${getScoreColor(
                score,
              )} bg-clip-text text-transparent mb-4`}
            >
              {displayScore.toFixed(1)}
              <span className="text-4xl text-gray-400">/10</span>
            </div>
            <p className="text-2xl font-bold text-gray-700">{getScoreText(score)}</p>
          </div>

          {/* Score visualization */}
          <div className="w-full max-w-md mx-auto">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-2000 ease-out`}
                style={{ width: `${(displayScore / 10) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
