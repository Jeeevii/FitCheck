# gemini/fitcheck.py

import re
from gemini.client import get_gemini_vision_model

def analyze_outfit(image_bytes: bytes, occasion: str) -> tuple[str, float, str]:
    model = get_gemini_vision_model()

    # prompt = f"Rate this outfit for a {occasion}. Give fashion feedback and a styling suggestion. Rate from 1 to 10."
    prompt = (
        f"Hey Bestie 👀✨ You're a fashion-savvy Gen Z stylist rating an outfit for the occasion: {occasion} 🎯💃\n"
        "Look at the outfit image and give real but hype feedback — think slay, not slander. Be kind, honest, and always helpful.\n\n"
        "Reply in this exact format using the ^ symbol to separate each part:\n"
        "Fit Score (1–10)^Color Theory Score (0–100)^Occasion Appropriateness Score (0–100)^Style Flow Score (0–100)^AI Feedback (5-7 sentences max, use Gen Z slang and vibe-based descriptions)^Edit Prompt (1–2 short sentences, written to guide an image-to-image AI model. Be concise, visual, and actionable.)\n\n"
        "Example: 9.0^92.0^95.0^89.5^Okayyy this fit is giving 🔥 The colors are totally vibing and the silhouette is clean. Shoes are doing their thing but maybe a chunkier option would elevate the whole mood. It’s serving casual slay but could push into main character with a small pop. You're def on the right track.^add chunky sneakers or a bold jacket to make the look hit harder 💥🧥"
    )


    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes}
    ])

    text = response.text.strip()
    print(text)
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
