import { getDictionaryOrDefault } from "@/app/[lang]/dictionaries";
import RoleTyper from "@/components/common/role-typer";
import TryChangeTheme from "@/components/common/try-change-theme";
import TryStopBackgroundAnimation from "@/components/common/try-stop-background-animation";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { Separator } from "@/components/ui/separator";

const Hero = async ({ lang }: { lang: string }) => {
  const dict = await getDictionaryOrDefault(lang);

  return (
    <section
      id="hero"
      className="md:flex items-center gap-8 w-full mb-12 md:mb-24"
    >
      <div className="space-y-4 flex items-center justify-center flex-col w-full">
        <h1 className="text-4xl font-bold" id="welcome">
          <LetterSwapForward
            label={dict.root.greeting}
            reverse={true}
            className="md:text-4xl font-bold md:w-fit text-[16px] w-full"
          />
        </h1>
        <RoleTyper />
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <TryChangeTheme />
          <Separator orientation="vertical" className="hidden md:block" />
          <TryStopBackgroundAnimation />
        </div>
      </div>
    </section>
  );
};

export default Hero;
