"use client";
import { DashboardData } from "@/app/api/generate-data/route";
import { useToolContext } from "@/contexts/ToolContext";
import { useState, KeyboardEvent, useEffect, useRef } from "react";
import ScrollableInput from "./ui/scrollable-input";
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatInput() {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { data, setData } = useToolContext();
  const router = useRouter()

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
    setData(null); // Clear previous data
    try {
      const response = await fetch("/api/generate-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: input }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: DashboardData = await response.json();
      setData(data); // Set the data in context
      setInput(""); // Clear input after setting data
    } catch (err) {
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

  const handleGenerate = async () => {
    if (!data) return;
    setIsLoading(true);
    setError(null);
    try {
      router.push("/dashboard?guest=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to redirect");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-3 flex flex-col gap-4 items-center">
      <h1>Hi, want to build your tiny tool?</h1>
      <span>Enter a quick prompt to get your task done effortlessly.</span>
      {data ? (
        <>
          <div className="flex">
            <Button onClick={handleGenerate} variant="outline" className="ml-2" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircleIcon className="animate-spin"/>
              ) : (
                "Generate Dashboard"
              )}
            </Button>
          </div>
        </>
      ) : (
        <ScrollableInput
          handleKeyDown={handleKeyDown}
          handleSend={handleSend}
          input={input}
          isLoading={isLoading}
          setInput={setInput}
          setIsLoading={setIsLoading}
          textareaRef={textareaRef}
        />
      )}
    </div>
  );
}
