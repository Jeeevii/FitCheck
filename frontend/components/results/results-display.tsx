"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Sparkles } from "lucide-react"
import FitScoreDisplay from "../fit-score-display"
import RatingBreakdown from "../rating-breakdown"
import AIFeedbackSection from "./ai-feedback-section"
import ImageComparison from "./image-comparison"
import type { FitCheckResponse } from "@/lib/types"
import { ANIMATION_DELAYS } from "@/lib/constants"

interface ResultsDisplayProps {
  originalImage: File
  occasion: string
  analysisData: FitCheckResponse
  onReset: () => void
}

export default function ResultsDisplay({ originalImage, occasion, analysisData, onReset }: ResultsDisplayProps) {
  const [visibleSections, setVisibleSections] = useState({
    score: false,
    breakdown: false,
    feedback: false,
    images: false,
  })

  useEffect(() => {
    // Staggered animation entrance
    const timers = [
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, score: true })), ANIMATION_DELAYS.SCORE),
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, breakdown: true })), ANIMATION_DELAYS.BREAKDOWN),
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, feedback: true })), ANIMATION_DELAYS.FEEDBACK),
      setTimeout(() => setVisibleSections((prev) => ({ ...prev, images: true })), ANIMATION_DELAYS.IMAGES),
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
      <FitScoreDisplay score={analysisData.fit_score} isVisible={visibleSections.score} />

      {/* Rating Breakdown */}
      <RatingBreakdown
        breakdown={{
          color_theory_score: analysisData.color_theory_score,
          occasion_score: analysisData.occasion_score,
          style_flow_score: analysisData.style_flow_score,
        }}
        isVisible={visibleSections.breakdown}
      />

      {/* AI Feedback */}
      <AIFeedbackSection feedback={analysisData.ai_feedback} isVisible={visibleSections.feedback} />

      {/* Image Comparison */}
      <ImageComparison
        originalImage={originalImage}
        imagePath="user_uploaded_image" // Backend will handle this
        editPrompt={analysisData.edit_prompt}
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
