"use client";

import RoleTyper from "@/components/common/RoteTyper";
import TryChangeTheme from "@/components/common/try-change-theme";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section id="hero" className="md:flex items-center gap-8 w-full">
      <div className="relative">
        <Image
          src="/avatar_7.jpg"
          alt="Cong Hai"
          width={256}
          height={256}
          className={cn(
            "rounded-xs object-cover size-[256px] h-auto w-auto aspect-square hidden md:block",
            theme == "light" && "ring-1 ring-primary",
          )}
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold" id="welcome">
          <LetterSwapForward
            label={"Welcome to Cong Hai's Portfolio"}
            reverse={true}
            className="md:text-4xl font-bold md:w-fit text-[19px] w-full"
          />
        </h1>
        <RoleTyper />
        <TryChangeTheme />
      </div>
    </section>
  );
};

export default Hero;
