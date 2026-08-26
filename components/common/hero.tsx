"use client";

import RoleTyper from "@/components/common/RoteTyper";
import TryChangeTheme from "@/components/common/try-change-theme";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <div id="hero" className="md:flex items-center gap-8 w-full">
      <div className="relative">
        <Image
          src="/avatar_7.jpg"
          alt="Cong Hai"
          width={256}
          height={256}
          className="rounded-xs object-cover size-[256px] h-auto w-auto aspect-square hidden md:block"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold" id="welcome">
          <LetterSwapForward
            label={isMobile ? "Welcome to Cong Hai's Portfolio" : "<h1> Welcome to Cong Hai's Portfolio </h1>"}
            reverse={true}
            className="md:text-4xl font-bold md:w-fit text-[19px] w-full"
          />
        </h1>
        <RoleTyper />
        <TryChangeTheme />
      </div>
    </div>
  );
};

export default Hero;
