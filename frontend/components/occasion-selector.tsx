"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Briefcase, Heart, Coffee, Dumbbell, PartyPopper, Sparkles } from "lucide-react"

interface OccasionSelectorProps {
  selectedOccasion: string
  onOccasionSelect: (occasion: string) => void
}

const occasions = [
  { id: "date night", label: "Date Night", icon: Heart, emoji: "💕" },
  { id: "work", label: "Work", icon: Briefcase, emoji: "💼" },
  { id: "casual", label: "Casual", icon: Coffee, emoji: "☕" },
  { id: "party", label: "Party", icon: PartyPopper, emoji: "🎉" },
  { id: "gym/workout", label: "Gym", icon: Dumbbell, emoji: "💪" },
  { id: "special event", label: "Special Event", icon: Sparkles, emoji: "✨" },
]

export default function OccasionSelector({ selectedOccasion, onOccasionSelect }: OccasionSelectorProps) {
  const [customOccasion, setCustomOccasion] = useState("")
  const [showCustom, setShowCustom] = useState(false)

  const handleOccasionClick = (occasionId: string) => {
    onOccasionSelect(occasionId)
    setShowCustom(false)
    setCustomOccasion("")
  }

  const handleCustomSubmit = () => {
    if (customOccasion.trim()) {
      onOccasionSelect(customOccasion.trim())
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl p-8 border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {occasions.map((occasion) => {
          const isSelected = selectedOccasion === occasion.id

          return (
            <Button
              key={occasion.id}
              onClick={() => handleOccasionClick(occasion.id)}
              variant={isSelected ? "default" : "outline"}
              className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-200 rounded-xl font-medium ${
                isSelected
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105 border-0"
                  : "hover:scale-105 hover:shadow-md bg-white hover:bg-orange-50 border-gray-200"
              }`}
            >
              <span className="text-2xl">{occasion.emoji}</span>
              <span className="text-sm">{occasion.label}</span>
            </Button>
          )
        })}
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setShowCustom(!showCustom)}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium"
        >
          + Something else?
        </Button>
      </div>

      {showCustom && (
        <div className="mt-6 flex space-x-3">
          <Input
            placeholder="e.g., job interview, wedding guest..."
            value={customOccasion}
            onChange={(e) => setCustomOccasion(e.target.value)}
            className="flex-1 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-white"
            onKeyPress={(e) => e.key === "Enter" && handleCustomSubmit()}
          />
          <Button
            onClick={handleCustomSubmit}
            disabled={!customOccasion.trim()}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl px-6"
          >
            Set
          </Button>
        </div>
      )}
    </div>
  )
}
