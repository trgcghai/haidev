"use client";

import { ModeToggler } from "@/components/common/mode-toggler";
import { TryThisArrow } from "@/components/common/try-this-arrow";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const TryChangeTheme = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) return <p className="text-transparent">Loading...</p>;

  return (
    <section
      className={cn(
        "flex items-center justify-center md:justify-start gap-2 text-secondary-foreground relative md:text-base sm:text-sm text-xs",
        className,
      )}
    >
      <span>Not used to {theme == "light" ? "light" : "dark"} theme ?</span>
      <ModeToggler system={false} />
      <section
        className={cn(
          "absolute -top-5 scale-40 hidden md:block",
          theme == "light" ? "left-12" : "left-10",
        )}
      >
        <TryThisArrow color="var(--secondary-foreground)" />
      </section>
    </section>
  );
};

export default TryChangeTheme;
