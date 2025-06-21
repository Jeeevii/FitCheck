"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Palette, Target, Shirt } from "lucide-react"

interface RatingBreakdownProps {
  breakdown: {
    color_theory_score: number
    occasion_score: number
    style_flow_score: number
  }
  isVisible: boolean
}

export default function RatingBreakdown({ breakdown, isVisible }: RatingBreakdownProps) {
  const [animatedScores, setAnimatedScores] = useState({
    color_theory_score: 0,
    occasion_score: 0,
    style_flow_score: 0,
  })

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedScores(breakdown)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isVisible, breakdown])

  const categories = [
    {
      icon: Palette,
      label: "Color Theory",
      score: animatedScores.color_theory_score,
      description: "How well your colors work together and with your skin tone",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Target,
      label: "Occasion Fit",
      score: animatedScores.occasion_score,
      description: "How appropriate your outfit is for the occasion",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shirt,
      label: "Style Flow",
      score: animatedScores.style_flow_score,
      description: "Overall coherence, proportions, and styling",
      color: "from-amber-500 to-orange-500",
    },
  ]

  return (
    <div
      className={`transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Breakdown by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={category.label}
                  className={`transition-all duration-700 delay-${(index + 1) * 200} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{category.label}</h4>
                    <div className="text-3xl font-black text-gray-800 mb-3">
                      {Math.round(category.score)}
                      <span className="text-lg text-gray-500">/100</span>
                    </div>
                    <Progress value={category.score} className="mb-3 h-2" />
                    <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
