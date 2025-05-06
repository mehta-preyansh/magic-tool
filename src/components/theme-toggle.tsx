"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import ToggleSwitch from "./ui/switch";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const ctx = useThemeContext();

  const handleToggle = () => {
    ctx.toggleTheme();
  };

  return (
    <ToggleSwitch
      ComponentA={MoonIcon}
      ComponentB={SunIcon}
      onToggle={handleToggle}
      activeTheme={ctx.theme==="dark" ? "a" : "b"}
    />
  );
}
