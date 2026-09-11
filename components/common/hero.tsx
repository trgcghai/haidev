import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import RoleTyper from "@/components/common/role-typer";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

const Hero = async () => {
  const dict = await getSafeDictionary();

  return (
    <section id="hero" className="md:flex items-center gap-8 w-full mb-12">
      <div className="space-y-4 flex items-center justify-center flex-col w-full">
        <h1 className="text-4xl font-bold" id="welcome">
          <LetterSwapForward
            label={dict.root.greeting}
            reverse={true}
            className="md:text-4xl font-bold md:w-fit text-[16px] w-full"
          />
        </h1>
        <RoleTyper />
        {/* <div className="flex items-center gap-4 flex-col md:flex-row">
          <TryChangeTheme dict={dict} />
          <Separator orientation="vertical" className="hidden md:block" />
          <TryStopBackgroundAnimation />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
