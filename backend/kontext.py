import os
import time
from dotenv import load_dotenv
import requests
import base64
from PIL import Image
from io import BytesIO

load_dotenv()

def encode_image_to_base64(image_path: str) -> str:
    image = Image.open(image_path)
    buffered = BytesIO()
    image.save(buffered, format="JPEG")  # Or PNG if you want
    return base64.b64encode(buffered.getvalue()).decode()

def poll_for_result(polling_url: str, api_key: str, timeout=120, interval=5) -> dict:
    elapsed = 0
    headers = {
        'accept': 'application/json',
        'x-key': api_key,
    }
    while elapsed < timeout:
        resp = requests.get(polling_url, headers=headers)
        data = resp.json()
        status = data.get("status", "").lower()
        if status == "ready":
            return data
        elif status == "failed":
            raise Exception(f"Processing failed: {data}")
        time.sleep(interval)
        elapsed += interval
    raise TimeoutError("Polling timed out waiting for result.")

def edit_image_with_kontext(prompt: str, image_path: str) -> str:
    api_key = os.environ.get("BFL_API_KEY")
    if not api_key:
        raise EnvironmentError("BFL_API_KEY not set in environment variables")

    img_str = encode_image_to_base64(image_path)

    # Start the job
    response = requests.post(
        'https://api.bfl.ai/v1/flux-kontext-pro',
        headers={
            'accept': 'application/json',
            'x-key': api_key,
            'Content-Type': 'application/json',
        },
        json={
            'prompt': prompt,
            'input_image': img_str,
        },
    )

    try:
        data = response.json()
    except Exception as e:
        raise RuntimeError(f"Failed to parse JSON from API response: {e}")

    request_id = data.get("id")
    polling_url = data.get("polling_url")

    if not polling_url:
        raise RuntimeError(f"No polling URL returned from API: {data}")

    # Poll until done
    print(f"Started edit job {request_id}. Polling for result...")
    result_data = poll_for_result(polling_url, api_key)

    # Extract final edited image URL
    if result_data.get("status") == "Ready":
        result = result_data.get("result", {})
        image_url = result.get("sample")
        if image_url:
            print("Edit complete!")
            return image_url
        else:
            raise RuntimeError("No edited image URL found in the result.")
    else:
        raise RuntimeError(f"Unexpected status: {result_data.get('status')}")

# Example usage
if __name__ == "__main__":
    prompt = "Make the jacket blue and add sunglasses"
    image_path = r"uploads\randomfit2.jpg"

    try:
        edited_image_url = edit_image_with_kontext(prompt, image_path)
        print("Edited Image URL:", edited_image_url)
    except Exception as e:
        print("Error:", e)
