import replicate

def generate_chatterbox_voice(prompt: str) -> str | None:
    try:
        output = replicate.run(
            "resemble-ai/chatterbox",
            input={
                "seed": 0,
                "prompt": prompt,
                "cfg_weight": 0.5,
                "temperature": 0.85,
                "exaggeration": 0.85
            }
        )
        print(f"Raw output from replicate: {output} ({type(output)})")

        if isinstance(output, list):
            return output[0]  # usually the audio URL
        elif isinstance(output, str):
            return output
        else:
            return str(output)

    except Exception as e:
        print(f"❌ Error generating voice: {e}")
        return None
