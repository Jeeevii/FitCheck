import os
import replicate

os.environ["REPLICATE_API_TOKEN"] = "r8_YAM27zO4HmYe95mwbncPWGx1jGp6dQC4edR8j"

def generate_kontext_image(image_url: str, prompt: str) -> str:
    try:
        output = replicate.run(
            "black-forest-labs/flux-kontext-pro",
            input={
                "image": image_url,  # ✅ Use the URL directly
                "prompt": prompt
            }
        )
        print(output)
        return output
    except Exception as e:
        raise RuntimeError(f"Replicate error: {e}")

if __name__ == "__main__":
    test_url = "uploads\78a0fdfd-a9fe-4684-833a-88c60213a32a.jpg"
    test_prompt = "Make him smile while looking at the camera."
    print(test_url)
    try:
        url = generate_kontext_image(test_url, test_prompt)
        print("Generated image URL:", url)
    except Exception as e:
        print("Error:", e)
