"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const themes = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Monitor },
] as const;

interface ModeTogglerProps {
  system?: boolean;
  mode?: "full" | 'icon';
}

export function ModeToggler({ system = true, mode = 'icon' }: ModeTogglerProps) {
  const { theme, setTheme } = useTheme();

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

  const Icon = currentTheme.icon;

  if (mode === "full") {
    return (
      <Button variant="outline" size="default" onClick={toggleTheme}>
        <Icon className="size-4 mr-2" />
        {currentTheme.name.charAt(0).toUpperCase() + currentTheme.name.slice(1)}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Current theme: ${currentTheme.name}`}
      className="text-xl"
    >
      <Icon className="size-4" />
    </Button>
  );
}
