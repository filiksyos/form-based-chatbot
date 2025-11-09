# Form-Based Chatbot MVP

An AI-powered conversational chatbot where users interact through **multiple-choice form questions** instead of typing. Built with Next.js 16, React 19, and Google Gemini AI with real-time streaming responses.

## ✨ Features

- 🤖 **AI-Powered Conversations** - Google Gemini integration with intelligent responses
- 📋 **Form-Based Interface** - Click to choose, no typing required
- 🎨 **Rich Content Support** - Markdown rendering with syntax highlighting
- ⚡ **Real-time Streaming** - See AI responses appear as they're generated
- 🎭 **Smooth Animations** - Framer Motion for delightful interactions
- 🌙 **Dark Mode** - Automatic dark/light theme support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/filiksyos/form-based-chatbot.git
cd form-based-chatbot
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google API key:

```env
GOOGLE_API_KEY=your_actual_api_key_here
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

1. **Select Options** - The chatbot presents multiple-choice questions
2. **Click to Respond** - Choose your response by clicking a button
3. **AI Responds** - Gemini AI generates contextual responses in real-time
4. **Continue Conversation** - New options appear based on the conversation flow

## 🏗️ Project Structure

```
form-based-chatbot/
├── src/
│   ├── app/
│   │   ├── api/chat/          # Chat API endpoint with streaming
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx  # Main chat component
│   │   ├── MessageDisplay.tsx # Message rendering with markdown
│   │   ├── FormQuestion.tsx   # Interactive form options
│   │   └── LoadingAnimation.tsx # Loading indicator
│   ├── lib/
│   │   ├── gemini.ts          # Gemini AI integration
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── index.ts           # TypeScript types
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

## 🛠️ Technologies Used

- **Framework:** Next.js 16.0.1 with App Router
- **UI Library:** React 19
- **AI:** Google Gemini AI (@google/genai ^1.9.0)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12.23.12
- **Markdown:** react-markdown with syntax highlighting
- **TypeScript:** Full type safety

## 📝 Customization

### Adding Custom Questions

Edit `src/components/ChatInterface.tsx` and modify the `generateContextualOptions` function to add your own question flows:

```typescript
const optionSets: Record<string, FormOption[]> = {
  "your-key": [
    { id: "opt-1", label: "Your question", value: "your-value" },
    // Add more options...
  ],
};
```

### Styling

Modify `tailwind.config.ts` to customize colors, fonts, and themes.

### AI Model

Change the AI model in `src/lib/gemini.ts`:

```typescript
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// Try: "gemini-1.5-pro", "gemini-1.5-flash", etc.
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `GOOGLE_API_KEY` environment variable
4. Deploy!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

## 💡 Inspiration

Based on [QuantaGem](https://github.com/W4D-cmd/QuantaGem) - A ChatGPT-like interface for Google Gemini AI.

---

Built with ❤️ using Next.js and Google Gemini AI
