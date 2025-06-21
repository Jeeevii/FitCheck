"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Wand2, Loader2, Zap, Stars } from "lucide-react"
import Image from "next/image"
import { generateEdit } from "@/lib/api"

interface ImageComparisonProps {
  originalImage: File
  imagePath: string
  editPrompt: string
  isVisible: boolean
}

export default function ImageComparison({ originalImage, imagePath, editPrompt, isVisible }: ImageComparisonProps) {
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("")

  useEffect(() => {
    if (originalImage) {
      const url = URL.createObjectURL(originalImage)
      setOriginalImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [originalImage])

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Original Image */}
      <div className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <h4 className="font-bold text-gray-800 mb-4 text-xl">Original</h4>
        <Card className="shadow-lg bg-white rounded-xl overflow-hidden">
          <CardContent className="p-3">
            <Image
              src={originalImageUrl || "/placeholder.svg"}
              alt="Original outfit"
              width={280}
              height={360}
              className="rounded-xl object-contain bg-gray-100 mx-auto"
            />
          </CardContent>
        </Card>
      </div>

      {/* AI Enhanced Image */}
      <div className={`text-center transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <h4 className="font-bold text-gray-800 mb-4 text-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
          AI Enhanced
        </h4>
        <Card className="shadow-lg bg-white rounded-xl overflow-hidden">
          <CardContent className="p-3">
            {editedImageUrl ? (
              <div className="relative">
                <Image
                  src={editedImageUrl}
                  alt="AI enhanced outfit"
                  width={280}
                  height={360}
                  className="rounded-xl object-contain bg-gray-100 mx-auto"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Enhanced ✨
                </div>
              </div>
            ) : (
              <div className="h-[20rem] bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-orange-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-red-200/30 to-pink-200/30 animate-pulse" />
                {isGenerating ? (
                  <div className="relative z-10 text-sm text-center">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-2" />
                    <p className="font-semibold text-gray-700">🎨 Creating your enhanced look...</p>
                    <p className="text-gray-600 text-xs">AI is working its magic ✨</p>
                  </div>
                ) : (
                  <div className="relative z-10 text-sm text-center">
                    <div className="relative mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Wand2 className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Stars className="w-5 h-5 text-yellow-400 animate-bounce" />
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 mb-2">Ready for the glow-up? 🔥</p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-orange-100 max-w-xs mx-auto shadow-sm">
                      <p className="text-xs text-gray-700 font-semibold mb-1">
                        <Zap className="w-3 h-3 inline mr-1 text-orange-500" />
                        Enhancement Plan:
                      </p>
                      <p className="text-sm text-orange-700 italic">"{editPrompt}"</p>
                    </div>
                    <div className="relative mt-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-md opacity-40 animate-pulse" />
                      <Button
                        onClick={handleGenerateEdit}
                        size="sm"
                        className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:brightness-110 rounded-full px-6 py-2 font-bold text-sm shadow text-white border border-white/20"
                      >
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        Generate AI Magic
                      </Button>
                    </div>
                    <p className="text-gray-600 text-xs font-medium mt-2">Transform your look with AI-powered style ✨</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
