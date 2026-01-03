
# 🚀 AdsPro Studio: Hosting Guide (Hinglish)

Aapka app ab host hone ke liye taiyar hai. Niche diye gaye steps follow karein:

## 🌐 Option 1: Vercel par Host karein (Sabse Easy)
Vercel par host karne ke liye aapko build ki zaroorat nahi padegi:
1. Is project ko apne **GitHub** par upload karein.
2. [Vercel](https://vercel.com/) par login karein aur "Add New Project" select karein.
3. Apna GitHub repo connect karein.
4. **Environment Variables** section mein:
   - Key: `API_KEY`
   - Value: (Apni Google Gemini API Key dalein - aistudio.google.com se lekar)
5. **Deploy** button daba dein. Ho gaya!

## 📂 Option 2: Shared Hosting (cPanel)
Agar aapke paas domain aur hosting hai:
1. Sari files (index.html, index.tsx, App.tsx, etc.) ko ek folder mein rakhein.
2. Unhe apne host ke `public_html` folder mein upload kar dein.
3. Note: Is method mein `process.env.API_KEY` seedha browser mein access nahi hoga, isliye Settings mein manually key dalna pad sakta hai.

## 🛠️ Important Notes
- **API Key:** Ye app AI features ke liye Gemini use karta hai. Hosting ke baad `Settings` page par ja kar apni key check karein.
- **PWA:** Jab aap ise HTTPS (Secure) link par host karenge, toh phone browser mein "Add to Home Screen" ka option aayega.

Developed with AdsPro Protocol.
