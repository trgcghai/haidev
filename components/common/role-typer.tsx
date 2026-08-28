import Typewriter from "@/components/fancy/text/typewriter";
import { CONFIG } from "@/constants/config";

const RoleTyper = () => {
  return (
    <p className="whitespace-pre-wrap text-secondary-foreground md:text-lg text-base text-center md:text-left">
      <span>{"I am a "}</span>
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
