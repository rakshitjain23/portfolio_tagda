"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

// Chatbot component - Updated for devrakshit.me domain
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const promptTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to show prompt at random intervals
  const showRandomPrompt = useCallback(() => {
    // Clear any existing timeout
    if (promptTimeoutRef.current) {
      clearTimeout(promptTimeoutRef.current);
    }

    // Don't show prompt if chat is open
    if (isOpen) {
      setShowPrompt(false);
      return;
    }

    // Random time between 10 and 30 seconds
    const randomTime = Math.random() * (30000 - 10000) + 10000;
    
    promptTimeoutRef.current = setTimeout(() => {
      setShowPrompt(true);
      
      // Hide prompt after 5 seconds
      setTimeout(() => {
        setShowPrompt(false);
        // Schedule next prompt
        showRandomPrompt();
      }, 5000);
    }, randomTime);
  }, [isOpen]);

  // Start showing prompts when component mounts
  useEffect(() => {
    if (isMounted) {
      showRandomPrompt();
    }
    
    // Cleanup on unmount
    return () => {
      if (promptTimeoutRef.current) {
        clearTimeout(promptTimeoutRef.current);
      }
    };
  }, [isOpen, isMounted, showRandomPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://portfolio-tagda.onrender.com'}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting to the server. Please try again later.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button with question prompt */}
      <div className="relative">
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg mb-2 w-48 text-sm sm:w-56"
            >
              <p className="text-gray-700 dark:text-gray-300">Have any questions? Ask me anything!</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowPrompt(false); // Hide prompt when chat is opened
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-96 w-auto max-w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] max-h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Chat with Rakshit
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 text-sm sm:text-base break-words ${
                      message.isUser
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-900 dark:text-white">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 flex-shrink-0"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 