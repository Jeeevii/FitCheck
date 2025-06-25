# 🧥 FitCheck.AI

**FitCheck.AI** is a fullstack AI-powered virtual stylist that helps users level up their outfits.  
Upload a photo of your fit, enter the occasion, and get an AI-generated style rating, outfit suggestions, and a visual upgrade — plus voice feedback to hype (or roast) your look.
 
[Watch Demo Here!](https://www.youtube.com/watch?v=Melo3dYctjM)
> Built in under 6 hours at the **FLUX.1 Kontext AI Hackathon** hosted by Replicate and Black Forest Labs on 6/21/2025.

---

## 👥 Team

- **Jeevi**  
  [LinkedIn](https://www.linkedin.com/in/jeevithan-mahenthran/) • [GitHub](https://github.com/Jeeevii)

- **Alexander Lee**  
  [LinkedIn](https://www.linkedin.com/in/alex--lee1/) • [GitHub](https://github.com/alexlee39)

- **Hanlin Huang**  
  [LinkedIn](https://www.linkedin.com/in/hanlin-huang-6aa4131ba/) • [GitHub](https://github.com/iunsafa)

---

## 🧠 What It Does
- 📷 Upload an outfit image  
- 📝 Input the occasion (e.g. date, party, interview)  
- 🤖 Get a style rating based on color theory + occasion fit  
- 🧥 See a visual edit of your outfit with suggested improvements  
- 🎙️ Hear your fashion feedback read aloud via AI voice

---

## 🧰 Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS

### Backend
- Python
- FastAPI

### AI Models Used
- **Gemini 1.5 Flash** – for analyzing outfit + context  
- **Kontext (Flux 1.1)** by Black Forest Labs – for image editing  
- **Chatterbox** by Resemble AI (via Replicate) – for text-to-speech feedback  

---

## 🧪 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Jeeevii/FitCheck.git
cd FitCheck
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` directory with the following format:

```
GEMINI_API_KEY=your_key_here
REPLICATE_API_TOKEN=your_token_here
BFL_API_KEY=your_key_here
```

Run the backend server:

```bash
python server.py
```

Backend runs on: `http://localhost:8000`

---

### 3. Frontend Setup (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

Let us know if you'd like to try it - we’ve got sponsor credits and can deploy a live version!
