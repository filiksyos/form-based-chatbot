import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Form-Based Chatbot
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Click on options to have a conversation - no typing required!
          </p>
        </div>
        <ChatInterface />
      </div>
    </main>
  );
}
