# gemini/fitcheck.py

import re
from gemini.client import get_gemini_vision_model

def analyze_outfit(image_bytes: bytes, occasion: str) -> tuple[str, float, str]:
    model = get_gemini_vision_model()

    prompt = f"Rate this outfit for a {occasion}. Give fashion feedback and a styling suggestion. Rate from 1 to 10."

    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    text = response.text or ""

    # Score extraction
    score_match = re.search(r"(\d+(\.\d+)?)/?10", text)
    score = float(score_match.group(1)) if score_match else 7.5

    # Simple edit suggestion extraction
    edit_prompt = "Try adding a small accessory."
    if "edit" in text.lower():
        edit_prompt = text.split("edit", 1)[-1].strip().strip(".")
    elif "try" in text.lower():
        edit_prompt = text.split("try", 1)[-1].strip().strip(".")

    return text, score, edit_prompt
