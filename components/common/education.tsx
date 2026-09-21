import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { GraduationCap } from "lucide-react";

const Education = async () => {
  const dict = await getSafeDictionary();
  return (
    <div>
      <h2 id="education">
        <LetterSwapForward
          label={`# ${dict.root.education.heading}`}
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="mt-4 flex items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:py-4 sm:text-base">
        <div className="relative z-1 flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <p className="wrap-break-word text-base font-semibold text-gray-600 sm:text-lg">
            <span className="flex-1 font-medium text-balance text-foreground">
              {dict.root.education.major}
            </span>
            <span className="text-sm text-muted-foreground">{` ${dict.root.education.at} `}</span>
            <span className="flex-1 font-medium text-balance text-foreground">
              {dict.root.education.school}
            </span>
          </p>
          <p className="text-base text-muted-foreground">
            {dict.root.education.period}
          </p>
          <p className="text-base text-muted-foreground">
            {dict.root.education.gpa}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
