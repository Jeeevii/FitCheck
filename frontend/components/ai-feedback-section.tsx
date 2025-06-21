"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, MessageSquare } from "lucide-react"
import { generateVoice } from "@/lib/api"

interface AIFeedbackSectionProps {
  feedback: string
  isVisible: boolean
}

export default function AIFeedbackSection({ feedback, isVisible }: AIFeedbackSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const handleGenerateVoice = async () => {
    if (audioUrl) {
      togglePlayback()
      return
    }

    setIsGeneratingVoice(true)
    try {
      const response = await generateVoice(feedback)
      setAudioUrl(response.audio_url)

      // Create audio element
      const audioElement = new Audio(response.audio_url)
      audioElement.onended = () => setIsPlaying(false)
      setAudio(audioElement)

      // Auto-play after generation
      audioElement.play()
      setIsPlaying(true)
    } catch (error) {
      console.error("Failed to generate voice:", error)
    } finally {
      setIsGeneratingVoice(false)
    }
  }

  const togglePlayback = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Text Feedback */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-orange-600 mr-3" />
              <h4 className="font-bold text-gray-800 text-xl">AI Style Analysis</h4>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <p className="text-gray-700 leading-relaxed text-lg">{feedback}</p>
            </div>
          </div>

          {/* Voice Feedback */}
          <div
            className={`transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 rounded-2xl p-8 border-2 border-orange-200 text-center">
              <div className="flex items-center justify-center mb-6">
                <Volume2 className="w-8 h-8 text-orange-600 mr-3" />
                <h4 className="font-bold text-orange-800 text-xl">Voice Feedback</h4>
              </div>

              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {isGeneratingVoice ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  ) : isPlaying ? (
                    <div className="flex space-x-1">
                      <div className="w-1 h-8 bg-white rounded animate-pulse"></div>
                      <div className="w-1 h-6 bg-white rounded animate-pulse delay-75"></div>
                      <div className="w-1 h-10 bg-white rounded animate-pulse delay-150"></div>
                      <div className="w-1 h-4 bg-white rounded animate-pulse delay-300"></div>
                    </div>
                  ) : (
                    <Volume2 className="w-10 h-10 text-white" />
                  )}
                </div>
              </div>

              <Button
                onClick={handleGenerateVoice}
                disabled={isGeneratingVoice}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-8 py-4 shadow-lg text-lg font-bold"
              >
                {isGeneratingVoice ? (
                  "Generating voice..."
                ) : isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : audioUrl ? (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Play Again
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Hear the tea ☕
                  </>
                )}
              </Button>

              <p className="text-sm text-orange-700 mt-4 italic">Get your style critique delivered with personality!</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
