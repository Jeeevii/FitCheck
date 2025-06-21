"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, MessageSquare, Mic, Sparkles } from "lucide-react"
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

          {/* Voice Feedback - Enhanced */}
          <div
            className={`transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-center shadow-2xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-3xl blur-xl opacity-30 -z-10 animate-pulse"></div>

              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-white text-xl">🎤 Voice Feedback</h4>
              </div>

              <div className="mb-8">
                <div className="relative w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/30">
                  {/* Pulsing rings */}
                  {(isGeneratingVoice || isPlaying) && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
                      <div className="absolute inset-2 rounded-full border-2 border-white/30 animate-ping animation-delay-200"></div>
                    </>
                  )}

                  {isGeneratingVoice ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                  ) : isPlaying ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-12 bg-white rounded animate-pulse"></div>
                      <div className="w-2 h-8 bg-white rounded animate-pulse delay-75"></div>
                      <div className="w-2 h-16 bg-white rounded animate-pulse delay-150"></div>
                      <div className="w-2 h-6 bg-white rounded animate-pulse delay-300"></div>
                      <div className="w-2 h-10 bg-white rounded animate-pulse delay-500"></div>
                    </div>
                  ) : (
                    <Volume2 className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>

              <Button
                onClick={handleGenerateVoice}
                disabled={isGeneratingVoice}
                size="lg"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full px-10 py-4 shadow-2xl text-lg font-bold text-white hover:text-white transition-all duration-300 hover:scale-105"
              >
                {isGeneratingVoice ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generating voice...
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause Voice
                  </>
                ) : audioUrl ? (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Play Again
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />🔥 Hear the Tea!
                  </>
                )}
              </Button>

              <p className="text-white/90 mt-6 text-sm font-medium">
                Get your style critique delivered with AI personality! 🎭
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
