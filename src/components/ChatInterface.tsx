"use client";

import { useState, useRef, useEffect } from "react";
import { Message, FormOption } from "@/types";
import MessageDisplay from "./MessageDisplay";
import FormQuestion from "./FormQuestion";
import LoadingAnimation from "./LoadingAnimation";
import { v4 as uuidv4 } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content: "Hello! I'm your form-based chatbot. I'll ask you questions and you can click to choose your answers. Let's get started!",
      timestamp: new Date(),
    },
  ]);
  const [currentOptions, setCurrentOptions] = useState<FormOption[]>([
    { id: "start-1", label: "Tell me about yourself", value: "tell-about" },
    { id: "start-2", label: "How do you work?", value: "how-work" },
    { id: "start-3", label: "Ask me a question", value: "ask-question" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [parent] = useAutoAnimate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionSelect = async (option: FormOption) => {
    // Add user's selection as a message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: option.label,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentOptions([]);
    setIsLoading(true);

    try {
      // Call API with conversation history
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      const assistantMessageId = uuidv4();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedContent += parsed.content;

                  // Update message in real-time
                  setMessages((prev) => {
                    const existing = prev.find((m) => m.id === assistantMessageId);
                    if (existing) {
                      return prev.map((m) =>
                        m.id === assistantMessageId
                          ? { ...m, content: accumulatedContent }
                          : m
                      );
                    } else {
                      return [
                        ...prev,
                        {
                          id: assistantMessageId,
                          role: "assistant",
                          content: accumulatedContent,
                          timestamp: new Date(),
                        },
                      ];
                    }
                  });
                }
              } catch (e) {
                console.error("Parse error:", e);
              }
            }
          }
        }
      }

      // Generate new options based on conversation context
      const newOptions = generateContextualOptions(accumulatedContent, option.value);
      setCurrentOptions(newOptions);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
      setCurrentOptions([
        { id: "retry-1", label: "Try again", value: "retry" },
        { id: "restart-1", label: "Start over", value: "restart" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate contextual follow-up options
  const generateContextualOptions = (response: string, previousChoice: string): FormOption[] => {
    const optionSets: Record<string, FormOption[]> = {
      "tell-about": [
        { id: "follow-1", label: "What can you help me with?", value: "capabilities" },
        { id: "follow-2", label: "Tell me a fun fact", value: "fun-fact" },
        { id: "follow-3", label: "Ask me something", value: "ask-me" },
      ],
      "how-work": [
        { id: "follow-4", label: "What AI model powers you?", value: "ai-model" },
        { id: "follow-5", label: "Can you learn from our conversation?", value: "learning" },
        { id: "follow-6", label: "Show me something cool", value: "demo" },
      ],
      default: [
        { id: "gen-1", label: "Tell me more", value: "more-info" },
        { id: "gen-2", label: "Change topic", value: "new-topic" },
        { id: "gen-3", label: "Ask me a question", value: "reverse-q" },
      ],
    };

    return optionSets[previousChoice] || optionSets.default;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={parent}>
        {messages.map((message) => (
          <MessageDisplay key={message.id} message={message} />
        ))}
        {isLoading && <LoadingAnimation />}
        <div ref={messagesEndRef} />
      </div>

      {/* Form Options Area */}
      {currentOptions.length > 0 && !isLoading && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
          <FormQuestion options={currentOptions} onSelect={handleOptionSelect} />
        </div>
      )}
    </div>
  );
}
