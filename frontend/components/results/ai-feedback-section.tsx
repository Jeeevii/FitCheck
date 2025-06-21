"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, MessageSquare } from "lucide-react"
import { generateVoice } from "@/lib/api"

interface AIFeedbackSectionProps {
  feedback: string
  isVisible: boolean
}

export default function AIFeedbackSection({ feedback, isVisible }: AIFeedbackSectionProps) {
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleGenerateVoice = async () => {
    if (audioUrl) {
      // Play existing audio
      const audio = new Audio(audioUrl)
      setIsPlaying(true)
      audio.play()
      audio.onended = () => setIsPlaying(false)
      return
    }

    setIsGeneratingVoice(true)
    try {
      const response = await generateVoice(feedback)
      setAudioUrl(response.audio_url)

      // Auto-play the generated audio
      const audio = new Audio(response.audio_url)
      setIsPlaying(true)
      audio.play()
      audio.onended = () => setIsPlaying(false)
    } catch (error) {
      console.error("Voice generation failed:", error)
      alert("Voice generation failed. Please try again!")
    } finally {
      setIsGeneratingVoice(false)
    }
  }

  return (
    <div
      className={`transition-all duration-1000 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">AI Feedback & Suggestions</h3>
            </div>
            <Button
              onClick={handleGenerateVoice}
              disabled={isGeneratingVoice}
              variant="outline"
              size="sm"
              className="bg-white hover:bg-orange-50 border-orange-200 text-orange-600 hover:text-orange-700"
            >
              {isGeneratingVoice ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                  Generating...
                </>
              ) : isPlaying ? (
                <>
                  <VolumeX className="w-4 h-4 mr-2" />
                  Playing...
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  {audioUrl ? "Play Again" : "Hear It"}
                </>
              )}
            </Button>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 border border-orange-100">
            <p className="text-lg leading-relaxed text-gray-700 font-medium">{feedback}</p>
          </div>

          {isPlaying && (
            <div className="mt-4 flex items-center justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-orange-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
