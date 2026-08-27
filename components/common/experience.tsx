import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { BriefcaseBusiness } from "lucide-react";

const Experience = () => {
  return (
    <div>
      <h2 id="experience">
        <LetterSwapForward
          label="# Experience"
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="mt-4 flex items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line sm:size-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <BriefcaseBusiness className="size-5" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="wrap-break-word text-base font-semibold text-gray-600 sm:text-lg">
            <span className="text-primary">Full-Stack Developer</span> at{" "}
            <span className="text-primary">TMA Solutions</span>
          </p>
          <p>12/2025 - 04/2026</p>
          <p className="leading-relaxed">
            Developing features and maintaining web applications, collaborating
            with cross-functional teams to deliver high-quality software
            solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
