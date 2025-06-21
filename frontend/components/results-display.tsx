"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Sparkles } from "lucide-react"
import FitScoreDisplay from "@/components/fit-score-display"
import RatingBreakdown from "@/components/rating-breakdown"
import AIFeedbackSection from "@/components/ai-feedback-section"
import ImageComparison from "@/components/image-comparison"

interface ResultsDisplayProps {
  originalImage: string
  occasion: string
  onReset: () => void
}

export default function ResultsDisplay({ originalImage, occasion, onReset }: ResultsDisplayProps) {
  const [visibleSections, setVisibleSections] = useState({
    score: false,
    breakdown: false,
    feedback: false,
    images: false,
  })

  // Mock data - in real app this would come from API
  const analysis = {
    overallScore: 7.9,
    breakdown: {
      colorTheory: 85,
      occasionFit: 72,
      styleFlow: 81,
    },
    feedback:
      "Okay, I see you! 👀 This fit has serious potential but let's make it pop! The colors work beautifully with your skin tone - that's some solid color theory right there. For a date night, you're almost perfect, just needs a tiny bit more polish. The overall flow and proportions are on point, but adding a red accessory would really make this outfit sing. Maybe try rolling up those sleeves for a more relaxed vibe. You're 90% there - just needs that final touch! 🔥",
    editPrompt: "add a bold red necklace and enhance outfit colors for a date night look",
    imagePath: "uploads/user123.jpg",
  }

  useEffect(() => {
    // Staggered animation entrance
    const timers = [
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, score: true })), 300),
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, breakdown: true })), 800),
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, feedback: true })), 1300),
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, images: true })), 1800),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Your Fit Check Results
        </h2>
        <p className="text-gray-600 text-lg">For your {occasion} look</p>
      </div>

      {/* Fit Score */}
      <FitScoreDisplay score={analysis.overallScore} isVisible={visibleSections.score} />

      {/* Rating Breakdown */}
      <RatingBreakdown breakdown={analysis.breakdown} isVisible={visibleSections.breakdown} />

      {/* AI Feedback */}
      <AIFeedbackSection feedback={analysis.feedback} isVisible={visibleSections.feedback} />

      {/* Image Comparison */}
      <ImageComparison
        originalImage={originalImage}
        imagePath={analysis.imagePath}
        editPrompt={analysis.editPrompt}
        isVisible={visibleSections.images}
      />

      {/* Action Buttons */}
      <div className="flex justify-center space-x-6 pt-8">
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="bg-white hover:bg-gray-50 rounded-full px-8 py-4 font-bold text-lg border-2"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Another Fit
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-8 py-4 font-bold text-lg shadow-xl"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  )
}
