"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const themes = [
  { name: "light", icon: <Sun className="size-4" /> },
  { name: "dark", icon: <Moon className="size-4" /> },
  { name: "system", icon: <Monitor className="size-4" /> },
] as const;

interface ModeTogglerProps {
  system?: boolean;
}

export function ModeToggler({ system = true }: ModeTogglerProps) {
  const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

  const currentIndex = themes.findIndex((item) => item.name === theme);
  const currentTheme = themes[currentIndex] ?? themes[2];

  const toggleTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length;

    if (!system && themes[nextIndex].name === "system") {
      setTheme(themes[(nextIndex + 1) % themes.length].name);
      return;
    }

    setTheme(themes[nextIndex].name);
  };

   // eslint-disable-next-line react-hooks/set-state-in-effect
   useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Current theme: ${currentTheme.name}`}
      className="text-xl"
    >
      {currentTheme.icon}
    </Button>
  );
}
