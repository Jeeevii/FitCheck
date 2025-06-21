# FitCheck.AI - Frontend

> Upload your fit. Get rated. Get styled. Visually.

FitCheck.AI is a virtual stylist that helps users improve their outfits based on color theory, occasion, and visual harmony. Users upload an outfit photo, choose the occasion, and the AI rates the outfit, recommends improvements, and shows an enhanced image with voice feedback.

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔌 Backend Integration

The frontend is configured to work with your hackathon backend at **http://localhost:8000**.

### Expected API Endpoints

#### 1. POST `/api/fit-check`
**Input**: `multipart/form-data`
- `image`: File (JPG, PNG, WEBP, max 10MB)
- `occasion`: string (e.g., "date night", "work", "casual")

**Output**: `application/json`
\`\`\`typescript
{
  fit_score: number,           // Overall fit score (0-10)
  color_theory_score: number,  // Color theory score (0-100)
  occasion_score: number,      // Occasion appropriateness (0-100)
  style_flow_score: number,    // Style flow score (0-100)
  ai_feedback: string,         // AI feedback and suggestions
  edit_prompt: string          // Edit prompt for image enhancement
}
\`\`\`

#### 2. POST `/api/generate-edit`
**Input**: `application/json`
\`\`\`typescript
{
  image_path: string,    // Path to uploaded image
  edit_prompt: string    // Enhancement instructions
}
\`\`\`

**Output**: `application/json`
\`\`\`typescript
{
  edited_image_url: string  // URL to enhanced image
}
\`\`\`

#### 3. POST `/api/generate-voice`
**Input**: `application/json`
\`\`\`typescript
{
  feedback: string       // Text to convert to speech
}
\`\`\`

**Output**: `application/json`
\`\`\`typescript
{
  audio_url: string      // URL to generated audio file
}
\`\`\`

## 🎯 User Flow

1. **Upload Photo**: User drags/drops or selects outfit photo (real file upload)
2. **Select Occasion**: Choose from presets or enter custom occasion
3. **Get Analysis**: Click "Rate My Fit!" → sends real API request to localhost:8000
4. **View Results**: See animated scores and AI feedback from your backend
5. **Generate Voice**: Click to convert feedback to speech
6. **Enhance Image**: Click to generate AI-improved outfit image

## 🛠️ Features

### Real File Upload
- Drag & drop or click to upload
- File validation (image types, 10MB max)
- Live preview with file info
- Sends actual File object to backend

### Dynamic Scoring
- Animated fit score (0-10)
- Category breakdown:
  - Color Theory (0-100)
  - Occasion Fit (0-100) 
  - Style Flow (0-100)
- Progress bars and visual indicators

### AI Integration
- Real API calls to your backend
- Voice generation with audio playback
- Image enhancement with before/after comparison
- Error handling and loading states

## 🎨 Data Format

The frontend expects this exact response format from your backend:

\`\`\`json
{
  "fit_score": 7.9,
  "color_theory_score": 85,
  "occasion_score": 72,
  "style_flow_score": 81,
  "ai_feedback": "This fit has serious potential! The colors work beautifully with your skin tone...",
  "edit_prompt": "add a bold red necklace and enhance outfit colors for a date night look"
}
\`\`\`

## 🚀 Hackathon Ready

- ✅ **No environment files needed**
- ✅ **Hardcoded to localhost:8000**
- ✅ **Real file uploads**
- ✅ **User input based occasions**
- ✅ **Plug-and-play with your backend**
- ✅ **Complete error handling**
- ✅ **Responsive design**

## 🔧 Development

### Testing
1. Start your backend on localhost:8000
2. Start frontend: `npm run dev`
3. Upload an image and select occasion
4. Backend receives real file + occasion string
5. Frontend displays your mock data response

### File Upload Details
- Frontend sends `FormData` with actual `File` object
- Backend receives standard multipart/form-data
- No base64 encoding - raw file upload
- File size and type validation included

### Error Handling
- Network errors show user-friendly alerts
- Loading states for all async operations
- File validation before upload
- API timeout handling

The frontend is **100% ready** for your hackathon backend! Just make sure your endpoints return the expected JSON format. 🎉
