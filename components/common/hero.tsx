"use client";

import RoleTyper from "@/components/common/RoteTyper";
import TryChangeTheme from "@/components/common/try-change-theme";
import UserAvatar from "@/components/common/user-avatar";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

const Hero = () => {
  return (
    <section id="hero" className="md:flex items-center gap-8 w-full">
      <UserAvatar />

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
