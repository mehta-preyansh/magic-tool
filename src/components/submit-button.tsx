"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingText?: string;
  formAction?: (formData: FormData) => Promise<void>;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function SubmitButton({
  children,
  pendingText,
  formAction,
  className,
  variant = "default"
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      formAction={formAction}
      disabled={pending}
      className={className}
      variant={variant}
    >
      {pending ? (
        <>
          <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
          {pendingText || "Submitting..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
