// Core data types used throughout the app

export interface FitCheckRequest {
  image: File
  occasion: string
}

export interface FitCheckResponse {
  fit_score: number // Overall fit score (0-10)
  color_theory_score: number // Color theory score (0-100)
  occasion_score: number // Occasion appropriateness (0-100)
  style_flow_score: number // Style flow score (0-100)
  ai_feedback: string // AI feedback and suggestions
  edit_prompt: string // Edit prompt for image enhancement
}

export interface GenerateEditRequest {
  image_path: string
  edit_prompt: string
}

export interface GenerateEditResponse {
  edited_image_url: string
}

export interface GenerateVoiceRequest {
  feedback: string
}

export interface GenerateVoiceResponse {
  audio_url: string
}

export interface OccasionOption {
  id: string
  label: string
  emoji: string
}

export interface BreakdownItem {
  icon: any // Lucide icon component
  label: string
  score: number
  description: string
  color: string
}

export interface AppState {
  uploadedImage: File | null
  selectedOccasion: string
  isAnalyzing: boolean
  showResults: boolean
  analysisData: FitCheckResponse | null
}
