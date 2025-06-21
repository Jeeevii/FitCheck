"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Palette, Target, Shirt } from "lucide-react"

interface RatingBreakdownProps {
  breakdown: {
    colorTheory: number
    occasionFit: number
    styleFlow: number
  }
  isVisible: boolean
}

export default function RatingBreakdown({ breakdown, isVisible }: RatingBreakdownProps) {
  const [animatedValues, setAnimatedValues] = useState({
    colorTheory: 0,
    occasionFit: 0,
    styleFlow: 0,
  })

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        // Animate each value with staggered timing
        const animateValue = (key: keyof typeof breakdown, delay: number) => {
          setTimeout(() => {
            const interval = setInterval(() => {
              setAnimatedValues((prev) => {
                const target = breakdown[key]
                const increment = target / 30
                const next = prev[key] + increment
                if (next >= target) {
                  clearInterval(interval)
                  return { ...prev, [key]: target }
                }
                return { ...prev, [key]: next }
              })
            }, 30)
          }, delay)
        }

        animateValue("colorTheory", 0)
        animateValue("occasionFit", 200)
        animateValue("styleFlow", 400)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [isVisible, breakdown])

  const breakdownItems = [
    {
      icon: Palette,
      label: "Color Theory",
      score: animatedValues.colorTheory,
      description: "How colors work with your skin tone",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Target,
      label: "Occasion Fit",
      score: animatedValues.occasionFit,
      description: "Perfect for the event?",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shirt,
      label: "Style Flow",
      score: animatedValues.styleFlow,
      description: "Overall outfit coherence & fit",
      color: "from-amber-500 to-orange-500",
    },
  ]

  return (
    <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <h3
          className={`text-3xl font-bold text-gray-800 mb-8 text-center transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          What contributed to your rating
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {breakdownItems.map((item, index) => {
            const Icon = item.icon
            const delay = index * 200
            return (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${delay + 1000}ms` }}
              >
                <div className="mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-500 hover:scale-110`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">{item.label}</h4>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-gray-800">{Math.round(item.score)}%</span>
                    <span className="text-2xl">
                      {item.score >= 80 ? "🔥" : item.score >= 70 ? "✨" : item.score >= 60 ? "👍" : "🤔"}
                    </span>
                  </div>
                  <Progress value={item.score} className="h-4" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
