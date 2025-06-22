from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os
import uvicorn
from fastapi.staticfiles import StaticFiles
from gemini.fitcheck import analyze_outfit
from kontext import edit_image_with_kontext
from chatterbox import generate_chatterbox_voice

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Full valid URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
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
    print(f"Image saved to: {filepath}")

    try:
        with open(filepath, "rb") as f:
            image_bytes = f.read()

        fit_score, color_theory_score, occasion_score, style_flow_score, ai_feedback, edit_prompt = analyze_outfit(image_bytes, occasion)
        payload = {
            "fit_score": fit_score,
            "color_theory_score": color_theory_score,
            "occasion_score": occasion_score,
            "style_flow_score": style_flow_score,
            "ai_feedback": ai_feedback,
            "edit_prompt": edit_prompt,
            "image_path": filepath
        }
        print(f"(Debugging) FitCheck response: {payload}")
        
        return payload
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini Vision error: {e}")
    
@app.post("/generate-image")
async def generate_image(request: EditRequest):
    print(f"Received edit request: {request.edit_prompt} for image: {request.image_path}")
    try:
        if not os.path.exists(request.image_path):
            raise HTTPException(status_code=404, detail="Image not found")

        edited_image_url = edit_image_with_kontext(request.edit_prompt, request.image_path)
        print(f"Edited image URL: {edited_image_url}")
        return {"edited_image_url": edited_image_url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@app.post("/generate-voice")
async def generate_voice(request: VoiceRequest):
    try:
        print(f"🎙️ Received voice request: {request.feedback}")
        voice_url = generate_chatterbox_voice(request.feedback)

        if not voice_url:
            raise HTTPException(status_code=500, detail="Failed to generate audio.")
        print(f"Raw output: {voice_url} ({type(voice_url)})")

        return {"audio_url": voice_url}

    except Exception as e:
        print(f"❌ Error generating voice: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "FitCheck.AI backend is running!"}

# -----------------------------
# Entry point for running directly
# -----------------------------
if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=8000, reload=True)

