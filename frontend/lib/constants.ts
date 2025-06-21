import type { OccasionOption } from "./types"

export const OCCASION_OPTIONS: OccasionOption[] = [
  { id: "date night", label: "Date Night", emoji: "💕" },
  { id: "work", label: "Work", emoji: "💼" },
  { id: "casual", label: "Casual", emoji: "☕" },
  { id: "party", label: "Party", emoji: "🎉" },
  { id: "gym/workout", label: "Gym", emoji: "💪" },
  { id: "special", label: "Special Event", emoji: "✨" },
]

export const SUPPORTED_FILE_TYPES = {
  "image/*": [".jpeg", ".jpg", ".png", ".webp"],
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ANIMATION_DELAYS = {
  SCORE: 300,
  BREAKDOWN: 800,
  FEEDBACK: 1300,
  IMAGES: 1800,
}
