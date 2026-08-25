import Typewriter from "@/components/fancy/text/typewriter";

const RoleTyper = () => {
  return (
    <p className="whitespace-pre-wrap text-secondary-foreground text-lg">
      <span>{"I am a "}</span>
      <Typewriter
        text={[
          "Software Engineer",
          "Full-Stack Developer",
          "Web Development Enthusiast",
        ]}
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
