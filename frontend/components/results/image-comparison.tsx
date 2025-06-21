"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"
import { generateEdit } from "@/lib/api"

interface ImageComparisonProps {
  originalImage: File
  imagePath: string
  editPrompt: string
  isVisible: boolean
}

export default function ImageComparison({ originalImage, imagePath, editPrompt, isVisible }: ImageComparisonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null)

  const handleGenerateEnhanced = async () => {
    setIsGenerating(true)
    try {
      const response = await generateEdit(imagePath, editPrompt)
      setEnhancedImageUrl(response.edited_image_url)
    } catch (error) {
      console.error("Image generation failed:", error)
      alert("Image generation failed. Please try again!")
    } finally {
      setIsGenerating(false)
    }
  }

  // Create preview URL for original image
  const originalImageUrl = URL.createObjectURL(originalImage)

  return (
    <div
      className={`transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Style Enhancement</h3>
            {!enhancedImageUrl && (
              <Button
                onClick={handleGenerateEnhanced}
                disabled={isGenerating}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Enhance My Fit!
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Enhancement Plan:</p>
            <p className="text-gray-600 italic">"{editPrompt}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Original Image */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-700 mb-4">Your Original Fit</h4>
              <div className="relative">
                <Image
                  src={originalImageUrl || "/placeholder.svg"}
                  alt="Original outfit"
                  width={300}
                  height={400}
                  className="rounded-2xl object-cover w-full h-96 shadow-lg"
                />
              </div>
            </div>

            {/* Arrow or Enhanced Image */}
            <div className="text-center">
              {enhancedImageUrl ? (
                <>
                  <h4 className="text-lg font-bold text-gray-700 mb-4">AI Enhanced Version</h4>
                  <div className="relative">
                    <Image
                      src={enhancedImageUrl || "/placeholder.svg"}
                      alt="Enhanced outfit"
                      width={300}
                      height={400}
                      className="rounded-2xl object-cover w-full h-96 shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      Enhanced! ✨
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <ArrowRight className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Click "Enhance My Fit!" to see the improved version</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {enhancedImageUrl && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleGenerateEnhanced}
                disabled={isGenerating}
                variant="outline"
                className="bg-white hover:bg-orange-50 border-orange-200 text-orange-600 hover:text-orange-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Another Version
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
