## Create a Python Virtual environment for dependencies/libraries

#### Windows
```python -m venv env```

#### macOS/Linux/Bash 

```python3 -m venv env```

## Activate and go into Virtual environment with 
- Windows: ```env\Scripts\activate```
- macOS/Linux/Bash: ```source venv/bin/activate```

## Install Required Dependencies
``` pip install -r requirements.txt ```

## Create .env file to GEMINI API KEY
- .env File should look like: 
``` GEMINI_API_KEY=<API_KEY>```

        fit_score=7.9,
        color_theory_score=85.0,
        occasion_score=90.0,
        style_flow_score=78.5,
        ai_feedback="Nice layering and color balance. Consider adding a statement accessory to elevate the fit.",
        edit_prompt=f"add a bold accessory for a {occasion}",
        image_path=filepath