
# UnityAds Pro Studio - Hosting Guide

This project is a high-performance React application designed for global ad monetization management.

## 🚀 Recommended Hosting Platforms

### 1. Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. **Important:** In the "Environment Variables" section, add:
   - Key: `API_KEY`
   - Value: `YOUR_GEMINI_API_KEY_HERE`
4. Click **Deploy**.

### 2. Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Connect your GitHub or drag-and-drop the project folder.
3. Go to **Site Settings > Build & Deploy > Environment**.
4. Add the `API_KEY` variable.

## 🔑 Environment Variables
The application relies on the `process.env.API_KEY` for the AI Strategist (Gemini API). 
- To get a key, visit: [ai.google.dev](https://ai.google.dev/)

## ⚠️ Security Note
This is a frontend-only implementation. For a production-grade application, it is recommended to proxy your AI requests through a backend server to keep your API keys hidden from the browser's Network tab.

## 🛠️ Features
- **Dashboard:** Real-time (simulated) revenue tracking.
- **AI Strategist:** Powered by Gemini 3 Flash.
- **Campaign Manager:** Set budgets and target global audiences.
- **Universal Integration:** Connect Unity, Google, Meta, and more.
