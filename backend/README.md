## Create a Python Virtual environment for dependencies/libraries

#### Windows
```python -m venv env```

#### macOS/Linux/Bash 

```python3 -m venv env```

## Activate and go into Virtual environment with 
- Windows: ```env\Scripts\activate```
- macOS/Linux: ```source env/bin/activate```
- Bash: ``` source env/Scripts/activate ```

## Install Required Dependencies
``` pip install -r requirements.txt ```

## Create .env file to GEMINI API KEY
- .env File should look like: 
``` GEMINI_API_KEY=<API_KEY>```
