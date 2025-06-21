import type { FitCheckResponse, GenerateEditResponse, GenerateVoiceResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"
const USE_MOCK_DATA = process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_API_URL

// Mock data for development
const MOCK_RESPONSES = {
  fitCheck: {
    score: 7.9,
    feedback:
      "Okay, I see you! 👀 This fit has serious potential but let's make it pop! The colors work beautifully with your skin tone - that's some solid color theory right there. For a date night, you're almost perfect, just needs a tiny bit more polish. The overall flow and proportions are on point, but adding a red accessory would really make this outfit sing. Maybe try rolling up those sleeves for a more relaxed vibe. You're 90% there - just needs that final touch! 🔥",
    edit_prompt: "add a bold red necklace and enhance outfit colors for a date night look",
    image_path: "uploads/user_12345_1703123456.jpg",
    breakdown: {
      colorTheory: 85,
      occasionFit: 72,
      styleFlow: 81,
    },
  },
  editedImage: {
    edited_image_url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop",
  },
  voiceAudio: {
    audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder audio
  },
}

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "APIError"
  }
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new APIError(`API Error: ${errorText}`, response.status)
  }
  return response.json()
}

// Mock API functions with realistic delays
async function mockSubmitFitCheck(image: File, occasion: string): Promise<FitCheckResponse> {
  console.log("🔄 Mock API: Analyzing fit...", { fileName: image.name, occasion })

  // Simulate AI processing time (2-4 seconds)
  await delay(2000 + Math.random() * 2000)

  // Vary the response based on occasion for more realistic feel
  const occasionModifiers = {
    work: { scoreBonus: 0.2, colorTheory: 5, occasionFit: 10 },
    date: { scoreBonus: 0.5, colorTheory: 10, occasionFit: 5 },
    casual: { scoreBonus: 0.3, colorTheory: 0, occasionFit: 8 },
    party: { scoreBonus: 0.8, colorTheory: 15, occasionFit: -5 },
    gym: { scoreBonus: -0.5, colorTheory: -10, occasionFit: 15 },
    special: { scoreBonus: 1.0, colorTheory: 12, occasionFit: 8 },
  }

  const modifier = occasionModifiers[occasion as keyof typeof occasionModifiers] || occasionModifiers.casual

  const response: FitCheckResponse = {
    ...MOCK_RESPONSES.fitCheck,
    score: Math.min(10, Math.max(1, MOCK_RESPONSES.fitCheck.score + modifier.scoreBonus)),
    breakdown: {
      colorTheory: Math.min(100, Math.max(0, MOCK_RESPONSES.fitCheck.breakdown.colorTheory + modifier.colorTheory)),
      occasionFit: Math.min(100, Math.max(0, MOCK_RESPONSES.fitCheck.breakdown.occasionFit + modifier.occasionFit)),
      styleFlow: MOCK_RESPONSES.fitCheck.breakdown.styleFlow,
    },
    edit_prompt: `enhance outfit for ${occasion} with better color coordination and style improvements`,
  }

  console.log("✅ Mock API: Fit analysis complete", response)
  return response
}

async function mockGenerateEdit(imagePath: string, editPrompt: string): Promise<GenerateEditResponse> {
  console.log("🔄 Mock API: Generating enhanced image...", { imagePath, editPrompt })

  // Simulate image generation time (3-6 seconds)
  await delay(3000 + Math.random() * 3000)

  // Use different placeholder images for variety
  const placeholderImages = [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop",
  ]

  const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)]

  const response: GenerateEditResponse = {
    edited_image_url: randomImage,
  }

  console.log("✅ Mock API: Enhanced image generated", response)
  return response
}

async function mockGenerateVoice(feedback: string): Promise<GenerateVoiceResponse> {
  console.log("🔄 Mock API: Generating voice feedback...", { feedbackLength: feedback.length })

  // Simulate voice generation time (1-3 seconds)
  await delay(1000 + Math.random() * 2000)

  const response: GenerateVoiceResponse = {
    audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
  }

  console.log("✅ Mock API: Voice generated", response)
  return response
}

// Real API functions (for production)
async function realSubmitFitCheck(image: File, occasion: string): Promise<FitCheckResponse> {
  const formData = new FormData()
  formData.append("image", image)
  formData.append("occasion", occasion)

  const response = await fetch(`${API_BASE_URL}/fit-check`, {
    method: "POST",
    body: formData,
  })

  return handleResponse<FitCheckResponse>(response)
}

async function realGenerateEdit(imagePath: string, editPrompt: string): Promise<GenerateEditResponse> {
  const response = await fetch(`${API_BASE_URL}/generate-edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_path: imagePath,
      edit_prompt: editPrompt,
    }),
  })

  return handleResponse<GenerateEditResponse>(response)
}

async function realGenerateVoice(feedback: string): Promise<GenerateVoiceResponse> {
  const response = await fetch(`${API_BASE_URL}/generate-voice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feedback,
    }),
  })

  return handleResponse<GenerateVoiceResponse>(response)
}

// Exported functions that switch between mock and real APIs
export async function submitFitCheck(image: File, occasion: string): Promise<FitCheckResponse> {
  if (USE_MOCK_DATA) {
    return mockSubmitFitCheck(image, occasion)
  }
  return realSubmitFitCheck(image, occasion)
}

export async function generateEdit(imagePath: string, editPrompt: string): Promise<GenerateEditResponse> {
  if (USE_MOCK_DATA) {
    return mockGenerateEdit(imagePath, editPrompt)
  }
  return realGenerateEdit(imagePath, editPrompt)
}

export async function generateVoice(feedback: string): Promise<GenerateVoiceResponse> {
  if (USE_MOCK_DATA) {
    return mockGenerateVoice(feedback)
  }
  return realGenerateVoice(feedback, feedback)
}

// Utility function to convert data URL to File (for mock API)
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",")
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
