import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { GraduationCap } from "lucide-react";

const Education = () => {
  return (
    <div>
      <h2 id="education">
        <LetterSwapForward
          label="# Education"
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="mt-4 flex items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <p className="wrap-break-word text-base font-semibold text-gray-600 sm:text-lg">
            <span className="text-primary">
              Information Technology, Software Engineering
            </span>{" "}
            at{" "}
            <span className="text-primary">
              Industrial University of Ho Chi Minh City
            </span>
          </p>
          <p>2022 - 2027 (Expected)</p>
          <p>GPA: 3.59/4.0 (8.5/10)</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
