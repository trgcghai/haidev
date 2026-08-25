"use client";

import { ModeToggler } from "@/components/common/mode-toggler";
import { TryThisArrow } from "@/components/common/TryThisArrow";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const TryChangeTheme = ({ className }: { className?: string }) => {

  const { theme } = useTheme();

  return (
    <div className={cn("flex items-center justify-center md:justify-start gap-2 text-secondary-foreground relative md:text-base text-sm", className)}>
      <span>Not used to {theme == "light" ? "light" : "dark"} theme ?</span>
      <ModeToggler system={false} />
      <div className={cn("absolute -top-5 scale-40 hidden md:block", theme == "light" ? "right-[535px]" : "right-[545px]")}>
        <TryThisArrow color="var(--secondary-foreground)" />
      </div>
    </div>
  );
};

export default TryChangeTheme;
