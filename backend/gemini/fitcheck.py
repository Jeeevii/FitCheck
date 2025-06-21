# gemini/fitcheck.py

import re
from gemini.client import get_gemini_vision_model

def analyze_outfit(image_bytes: bytes, occasion: str) -> tuple[str, float, str]:
    model = get_gemini_vision_model()

    # prompt = f"Rate this outfit for a {occasion}. Give fashion feedback and a styling suggestion. Rate from 1 to 10."
    prompt = (
        f"You are a fashion evaluation assistant. Given an outfit image and the occasion ({occasion}), return a structured analysis in the following format, separated by ^:\n\n"
        "Fit Score (1–10)^Color Theory Score (0–100)^Occasion Appropriateness Score (0–100)^Style Flow Score (0–100)^AI Feedback^Edit Prompt\n\n"
        "Example: 7.9^85.0^90.0^78.5^Nice layering and color balance. Consider adding a statement accessory to elevate the fit.^add a bold accessory for a casual event"
    )

    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    text = response.text.strip()
    parts = text.split("^")

    if len(parts) != 6:
        raise ValueError("Gemini response format invalid or incomplete")

    fit_score = float(parts[0])
    color_theory_score = float(parts[1])
    occasion_score = float(parts[2])
    style_flow_score = float(parts[3])
    ai_feedback = parts[4].strip()
    edit_prompt = parts[5].strip()

    return fit_score, color_theory_score, occasion_score, style_flow_score, ai_feedback, edit_prompt

    # text = response.text or ""
    # print("Gemini Response: " + text)
    # # Score extraction
    # score_match = re.search(r"(\d+(\.\d+)?)/?10", text)
    # score = float(score_match.group(1)) if score_match else 7.5

    # # Simple edit suggestion extraction
    # edit_prompt = "Try adding a small accessory."
    # if "edit" in text.lower():
    #     edit_prompt = text.split("edit", 1)[-1].strip().strip(".")
    # elif "try" in text.lower():
    #     edit_prompt = text.split("try", 1)[-1].strip().strip(".")

    # return text, score, edit_prompt
