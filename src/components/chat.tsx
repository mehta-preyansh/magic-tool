"use client";
import { DashboardData } from "@/app/api/generate-data/route";
import { useState, KeyboardEvent, useEffect, useRef } from "react";

export default function ChatInput() {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea when input changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200 // Max height (adjust as needed)
      )}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: input }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: DashboardData = await response.json();
      console.log(data);
      setInput(""); // Clear input after sending
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-3 flex flex-col gap-4 items-center">
      <h1>Hi, want to build your tiny tool?</h1>
      <span>Enter a quick prompt to get your task done effortlessly.</span>
      <div className="relative flex items-end gap-3 my-0 mx-auto w-full max-w-[600px]">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 overflow-y-auto p-4 pr-12 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent resize-none bg-surface no-scrollbar"
          style={{
            minHeight: "44px",
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 p-2 text-highlight hover:text-highlight/80 disabled:text-gray-400"
          aria-label="Send message"
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
      
    </div>
  );
}