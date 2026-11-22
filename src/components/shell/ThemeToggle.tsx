"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toggleTheme, useTheme } from "./theme";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <Button variant="icon" aria-label={`Switch to ${next} theme`} onClick={toggleTheme} className={className}>
      {theme === "dark" ? <Sun aria-hidden className="size-4" /> : <Moon aria-hidden className="size-4" />}
    </Button>
  );
}
