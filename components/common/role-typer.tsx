import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import Typewriter from "@/components/fancy/text/typewriter";
import { CONFIG } from "@/constants/config";

const RoleTyper = async () => {
  const dict = await getSafeDictionary();

  return (
    <p className="whitespace-pre-wrap text-secondary-foreground md:text-lg sm:text-base text-sm text-center md:text-left">
      <span>{dict.common.roleTyper}</span>
      <Typewriter
        text={CONFIG.USER.roles}
        speed={70}
        className="text-primary text-pretty"
        waitTime={1500}
        deleteSpeed={40}
        cursorChar={"_"}
        as={"span"}
      />
    </p>
  );
};

export default RoleTyper;
