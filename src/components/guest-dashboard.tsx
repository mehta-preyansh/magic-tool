"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FinalTool from "./tool/final-tool";
import { useToolContext } from "@/contexts/ToolContext";

export default function GuestDashboard() {
  const router = useRouter();
  const { data } = useToolContext();

  useEffect(() => {
    if (!data) {
      router.replace('/');
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-auto">
      <FinalTool config={data} />
    </div>
  );
} 