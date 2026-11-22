"use client";

import { useEffect } from "react";

let greeted = false;

interface ConsoleGreetingProps {
  name: string;
  github: string | null;
  json: string;
}

export function ConsoleGreeting({ name, github, json }: ConsoleGreetingProps) {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    const lines = [github, `resume as data: ${json}`].filter(Boolean).join("\n");
    console.log(
      `%c${name}%c\n${lines}`,
      "font: 600 14px/1.6 monospace; color: #d79b19",
      "font: 12px/1.6 monospace",
    );
  }, [name, github, json]);

  return null;
}
