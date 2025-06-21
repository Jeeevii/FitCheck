import type { FitCheckResponse, GenerateEditResponse, GenerateVoiceResponse } from "./types"

const API_BASE_URL = "http://localhost:8000"

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "APIError"
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new APIError(`API Error: ${errorText}`, response.status)
  }
  return response.json()
}

// Real API functions for hackathon backend
export async function submitFitCheck(image: File, occasion: string): Promise<FitCheckResponse> {
  console.log("🔄 API: Submitting fit check...", { fileName: image.name, occasion })

  const formData = new FormData()
  formData.append("image", image)
  formData.append("occasion", occasion)

  const response = await fetch(`${API_BASE_URL}/fit-check`, {
    method: "POST",
    body: formData,
  })

  const result = await handleResponse<FitCheckResponse>(response)
  console.log("✅ API: Fit check complete", result)
  return result
}

export async function generateEdit(imagePath: string, editPrompt: string): Promise<GenerateEditResponse> {
  console.log("🔄 API: Generating enhanced image...", { imagePath, editPrompt })

  const response = await fetch(`${API_BASE_URL}/api/generate-edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_path: imagePath,
      edit_prompt: editPrompt,
    }),
  })

  const result = await handleResponse<GenerateEditResponse>(response)
  console.log("✅ API: Enhanced image generated", result)
  return result
}

export async function generateVoice(feedback: string): Promise<GenerateVoiceResponse> {
  console.log("🔄 API: Generating voice feedback...", { feedbackLength: feedback.length })

  const response = await fetch(`${API_BASE_URL}/api/generate-voice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feedback,
    }),
  })

  const result = await handleResponse<GenerateVoiceResponse>(response)
  console.log("✅ API: Voice generated", result)
  return result
}
