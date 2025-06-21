// Core data types used throughout the app

export interface FitCheckRequest {
  image: File
  occasion: string
}

export interface FitCheckResponse {
  score: number
  feedback: string
  edit_prompt: string
  image_path: string
  breakdown: {
    colorTheory: number
    occasionFit: number
    styleFlow: number
  }
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
  uploadedImage: string | null
  selectedOccasion: string
  isAnalyzing: boolean
  showResults: boolean
  analysisData: FitCheckResponse | null
}
