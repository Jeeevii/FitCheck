"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Palette, Target, Shirt, Volume2, Camera } from "lucide-react"
import Header from "@/components/layout/header"
import PhotoUpload from "@/components/photo-upload"
import OccasionSelector from "@/components/occasion-selector"
import ResultsDisplay from "@/components/results/results-display"
import { submitFitCheck } from "@/lib/api"
import type { AppState } from "@/lib/types"

export default function FitCheckAI() {
  const [state, setState] = useState<AppState>({
    uploadedImage: null,
    selectedOccasion: "",
    isAnalyzing: false,
    showResults: false,
    analysisData: null,
  })

  const handleAnalyze = async () => {
    if (!state.uploadedImage || !state.selectedOccasion) return

    setState((prev) => ({ ...prev, isAnalyzing: true }))

    try {
      // Submit the actual file and occasion to backend
      const response = await submitFitCheck(state.uploadedImage, state.selectedOccasion)

      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        showResults: true,
        analysisData: response,
      }))
    } catch (error) {
      console.error("Analysis failed:", error)
      setState((prev) => ({ ...prev, isAnalyzing: false }))
      // TODO: Add error toast/notification
      alert("Analysis failed. Please try again!")
    }
  }

  const resetApp = () => {
    setState({
      uploadedImage: null,
      selectedOccasion: "",
      isAnalyzing: false,
      showResults: false,
      analysisData: null,
    })
  }

  const features = [
    { icon: Camera, title: "Photo Analysis", description: "AI analyzes your outfit, colors, and style" },
    { icon: Zap, title: "AI Recommendations", description: "Get personalized styling suggestions" },
    { icon: Volume2, title: "Style Rating", description: "Hear your feedback with voice commentary" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {!state.showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                Your AI Style Assistant
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Upload your photo, tell us the occasion, and get personalized style ratings with AI-powered outfit
                recommendations
              </p>

              {/* Feature Icons */}
              <div className="flex items-center justify-center space-x-8 mb-12 text-gray-500">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{feature.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Main Upload Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  {!state.uploadedImage ? (
                    <>
                      <div className="flex items-center mb-6">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Upload Your Photo</h3>
                      </div>
                      <PhotoUpload
                        onImageUpload={(image) => setState((prev) => ({ ...prev, uploadedImage: image }))}
                        uploadedImage={state.uploadedImage}
                      />
                    </>
                  ) : (
                    <div className="space-y-8">
                      {/* Uploaded Image Display */}
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                            <Camera className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Your Photo</h3>
                        </div>
                        <PhotoUpload
                          onImageUpload={(image) => setState((prev) => ({ ...prev, uploadedImage: image }))}
                          uploadedImage={state.uploadedImage}
                        />
                      </div>

                      {/* Occasion Selection */}
                      <div>
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                            <Target className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Select Occasion</h3>
                        </div>
                        <OccasionSelector
                          selectedOccasion={state.selectedOccasion}
                          onOccasionSelect={(occasion) => setState((prev) => ({ ...prev, selectedOccasion: occasion }))}
                        />
                      </div>

                      {/* Analyze Button */}
                      {state.selectedOccasion && (
                        <div className="text-center pt-4">
                          <Button
                            onClick={handleAnalyze}
                            disabled={state.isAnalyzing}
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-200 rounded-full"
                          >
                            {state.isAnalyzing ? (
                              <>
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                Analyzing your style...
                              </>
                            ) : (
                              <>
                                <Zap className="w-6 h-6 mr-3" />
                                Rate My Fit!
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Feature Details - Only show when no image uploaded */}
            {!state.uploadedImage && (
              <div className="mt-16">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  What makes our AI stylist special?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Color Theory Analysis</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        AI analyzes how colors work with your skin tone and overall harmony
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Occasion Matching</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Perfect fit assessment based on where you're going and what's appropriate
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Shirt className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Style Flow & Fit</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Complete outfit coherence including accessories, proportions, and overall vibe
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Volume2 className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Voice Feedback</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Get your style critique delivered with personality - like having a friend roast your fit
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </>
        ) : (
          <ResultsDisplay
            originalImage={state.uploadedImage!}
            occasion={state.selectedOccasion}
            analysisData={state.analysisData!}
            onReset={resetApp}
          />
        )}
      </main>
    </div>
  )
}
