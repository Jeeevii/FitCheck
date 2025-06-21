"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Wand2, Loader2 } from "lucide-react"
import Image from "next/image"
import { generateEdit } from "@/lib/api"

interface ImageComparisonProps {
  originalImage: string
  imagePath: string
  editPrompt: string
  isVisible: boolean
}

export default function ImageComparison({ originalImage, imagePath, editPrompt, isVisible }: ImageComparisonProps) {
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateEdit = async () => {
    setIsGenerating(true)
    try {
      const response = await generateEdit(imagePath, editPrompt)
      setEditedImageUrl(response.edited_image_url)
    } catch (error) {
      console.error("Failed to generate edited image:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Original Image */}
      <div
        className={`text-center transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h4 className="font-bold text-gray-800 mb-6 text-2xl">Original</h4>
        <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            <Image
              src={originalImage || "/placeholder.svg"}
              alt="Original outfit"
              width={300}
              height={400}
              className="rounded-xl object-cover w-full h-96"
            />
          </CardContent>
        </Card>
      </div>

      {/* AI Enhanced Image */}
      <div
        className={`text-center transform transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h4 className="font-bold text-gray-800 mb-6 text-2xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 mr-2 text-orange-500" />
          AI Enhanced
        </h4>
        <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            {editedImageUrl ? (
              <div className="relative">
                <Image
                  src={editedImageUrl || "/placeholder.svg"}
                  alt="AI enhanced outfit"
                  width={300}
                  height={400}
                  className="rounded-xl object-cover w-full h-96"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Enhanced ✨
                </div>
              </div>
            ) : (
              <div className="h-96 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                    <p className="text-gray-600 font-medium mb-2">Generating your enhanced look...</p>
                    <p className="text-sm text-gray-500 text-center px-4">This might take a moment</p>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium mb-4">Ready to see the magic?</p>
                    <div className="bg-white rounded-lg p-4 mb-6 border border-orange-100 max-w-xs">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>What we'll enhance:</strong>
                      </p>
                      <p className="text-sm text-orange-700 italic">"{editPrompt}"</p>
                    </div>
                    <Button
                      onClick={handleGenerateEdit}
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-8 py-3 font-bold shadow-lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Enhanced Look
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
