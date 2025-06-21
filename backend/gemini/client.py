# gemini/client.py

import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()  # Load from .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_vision_model():
    return genai.GenerativeModel("gemini-1.5-flash")
