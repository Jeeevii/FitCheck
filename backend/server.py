from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os
import uvicorn

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# -----------------------------
# Models
# -----------------------------
class FitCheckResponse(BaseModel):
    fit_score: float
    color_theory_score: float
    occasion_score: float
    style_flow_score: float
    ai_feedback: str
    edit_prompt: str
    image_path: str

class EditRequest(BaseModel):
    image_path: str
    edit_prompt: str

class VoiceRequest(BaseModel):
    feedback: str

# -----------------------------
# Helpers
# -----------------------------
def save_image(image: UploadFile) -> str:
    ext = os.path.splitext(image.filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(image.file.read())
    return filepath

# -----------------------------
# Endpoints
# -----------------------------
@app.post("/fit-check")
async def fit_check(image: UploadFile = File(...), occasion: str = Form(...)):
    print(f"Received image: {image.filename}, occasion: {occasion}")
    filepath = save_image(image)

    # --- TODO: Call Gemini Vision for analysis ---
    return FitCheckResponse(
        fit_score=7.9,
        color_theory_score=85.0,
        occasion_score=90.0,
        style_flow_score=78.5,
        ai_feedback="Nice layering and color balance. Consider adding a statement accessory to elevate the fit.",
        edit_prompt=f"add a bold accessory for a {occasion}",
        image_path=filepath
    )

@app.post("/generate-image")
async def generate_image(request: EditRequest):
    if not os.path.exists(request.image_path):
        raise HTTPException(status_code=404, detail="Image not found")

    # --- TODO: Call Replicate Kontext ---
    return {
        "edited_image_url": "https://replicate.delivery/pb/fake-edited-image.jpg"
    }

@app.post("/generate-voice")
async def generate_voice(request: VoiceRequest):
    # --- TODO: Call Resemble AI or another TTS service ---
    return {
        "audio_url": "https://example.com/voice-feedback.mp3"
    }

@app.get("/")
def root():
    return {"message": "FitCheck.AI backend is running!"}

# -----------------------------
# Entry point for running directly
# -----------------------------
if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=8000, reload=True)

