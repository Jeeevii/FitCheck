# FitCheck.AI - Frontend

> Upload your fit. Get rated. Get styled. Visually.

FitCheck.AI is a virtual stylist that helps users improve their outfits based on color theory, occasion, and visual harmony. Users upload an outfit photo, choose the occasion, and the AI rates the outfit, recommends improvements, and shows an enhanced image with voice feedback.

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔧 Development vs Production

### Mock Data (Development)
By default, the app uses **mock data** with realistic delays and responses. This allows you to:
- ✅ Test the complete user flow
- ✅ See all animations and interactions
- ✅ Develop without a backend
- ✅ Demo the app to stakeholders

### Real API (Production)
To switch to real API calls, set the environment variable:
\`\`\`bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
\`\`\`

## 🎯 Mock API Features

The mock API provides realistic responses that vary based on:

### Occasion-Based Scoring
- **Work**: Higher occasion fit, moderate color theory
- **Date**: Higher overall score, better color theory
- **Casual**: Balanced scoring
- **Party**: Highest score bonus, enhanced color theory
- **Gym**: Lower overall score, higher occasion fit
- **Special**: Maximum score bonus

### Realistic Delays
- **Fit Analysis**: 2-4 seconds (simulates AI processing)
- **Image Generation**: 3-6 seconds (simulates Kontext API)
- **Voice Generation**: 1-3 seconds (simulates Resemble AI)

### Console Logging
All API calls are logged to the console for debugging:
\`\`\`
🔄 Mock API: Analyzing fit... {fileName: "outfit.jpg", occasion: "date"}
✅ Mock API: Fit analysis complete {score: 8.4, breakdown: {...}}
\`\`\`

## 🔌 API Integration

### Switching to Real Backend

1. **Set Environment Variable**:
   \`\`\`bash
   NEXT_PUBLIC_API_URL=https://your-backend.com
   \`\`\`

2. **Deploy Your Backend** with these endpoints:
   - `POST /api/fit-check`
   - `POST /api/generate-edit`
   - `POST /api/generate-voice`

3. **That's it!** The frontend automatically switches to real API calls.

### API Functions

\`\`\`typescript
// These functions automatically use mock or real APIs
import { submitFitCheck, generateEdit, generateVoice } from '@/lib/api'

// Convert uploaded image to File object
const imageFile = dataURLtoFile(uploadedImage, 'outfit.jpg')

// Analyze the fit
const analysis = await submitFitCheck(imageFile, occasion)

// Generate enhanced image
const enhanced = await generateEdit(analysis.image_path, analysis.edit_prompt)

// Generate voice feedback
const voice = await generateVoice(analysis.feedback)
\`\`\`

## 📱 User Experience

### Complete Flow Works
1. **Upload Photo** → Drag & drop or click to upload
2. **Select Occasion** → Choose from presets or custom
3. **Get Analysis** → See animated score and breakdown
4. **Voice Feedback** → Click to generate and play audio
5. **Enhanced Image** → Click to generate AI-improved outfit

### Realistic Interactions
- ⏱️ **Loading states** with spinners and progress text
- 🎨 **Animated score** counting up from 0
- 📊 **Staggered breakdown** animations
- 🔊 **Audio waveform** animation during playback
- 🖼️ **Image generation** with edit prompt preview

## 🛠️ Development Tips

### Testing Different Occasions
Try different occasions to see varied responses:
\`\`\`typescript
// Each occasion gives different scores and feedback
"work"     → Professional, conservative scoring
"date"     → Romantic, higher style scores  
"party"    → Bold, maximum creativity bonus
"gym"      → Functional, lower style scores
\`\`\`

### Debugging API Calls
Check the browser console for detailed API logs:
\`\`\`
🔄 Mock API: Analyzing fit...
✅ Mock API: Fit analysis complete
🔄 Mock API: Generating enhanced image...
✅ Mock API: Enhanced image generated
\`\`\`

### Error Handling
The app includes error handling for:
- Network failures
- Invalid file uploads
- API timeouts
- Audio playback issues

## 🚀 Deployment

### Frontend (Vercel)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Environment Variables
\`\`\`env
# Optional: Use real backend
NEXT_PUBLIC_API_URL=https://your-backend.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
\`\`\`

## 🔄 Backend Integration Checklist

When you're ready to connect your real backend:

- [ ] Deploy backend with the 3 required endpoints
- [ ] Set `NEXT_PUBLIC_API_URL` environment variable
- [ ] Test file upload functionality
- [ ] Verify CORS settings for your domain
- [ ] Test error handling and timeouts
- [ ] Monitor API response times

## 📊 Mock Data Examples

### Fit Check Response
\`\`\`json
{
  "score": 7.9,
  "feedback": "This fit has serious potential! The colors work beautifully...",
  "edit_prompt": "add a bold red necklace and enhance outfit colors",
  "image_path": "uploads/user_12345.jpg",
  "breakdown": {
    "colorTheory": 85,
    "occasionFit": 72,
    "styleFlow": 81
  }
}
\`\`\`

### Enhanced Image Response
\`\`\`json
{
  "edited_image_url": "https://images.unsplash.com/photo-1434389677669..."
}
\`\`\`

### Voice Response
\`\`\`json
{
  "audio_url": "https://resemble.ai/audio/feedback_12345.mp3"
}
\`\`\`

The frontend is **100% functional** with mock data and ready for seamless backend integration! 🎉
