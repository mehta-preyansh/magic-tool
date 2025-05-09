"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/actions";
import { LoaderCircleIcon } from "lucide-react";
import { useToolContext } from "@/contexts/ToolContext";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setData } = useToolContext();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const result = await signOutAction();
      
      if (result.success) {
        localStorage.clear();
        sessionStorage.clear();
        setData(null);
        router.push("/");
        router.refresh();
      } else {
        console.error("Sign out failed:", result.error);
      }
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSignOut} 
      variant="outline" 
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Sign out"
      )}
    </Button>
  );
} 