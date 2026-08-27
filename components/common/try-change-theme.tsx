"use client";

import { ModeToggler } from "@/components/common/mode-toggler";
import { TryThisArrow } from "@/components/common/TryThisArrow";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TryChangeTheme = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <p className="text-transparent">Loading...</p>;

  return (
    <section
      className={cn(
        "flex items-center justify-center md:justify-start gap-2 text-secondary-foreground relative md:text-base text-sm",
        className,
      )}
    >
      <span>Not used to {theme == "light" ? "light" : "dark"} theme ?</span>
      <ModeToggler system={false} />
      <section
        className={cn(
          "absolute -top-5 scale-40 hidden md:block",
          theme == "light" ? "right-[300px]" : "right-[310px]",
        )}
      >
        <TryThisArrow color="var(--secondary-foreground)" />
      </section>
    </section>
  );
};

export default TryChangeTheme;
