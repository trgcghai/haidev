import { AnimationToggle } from "@/components/common/animation-toggle";
import { TryThisArrow } from "@/components/common/try-this-arrow";
import { cn } from "@/lib/utils";

const TryStopBackgroundAnimation = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "flex items-center justify-center md:justify-start gap-2 text-secondary-foreground relative md:text-base text-sm",
        className,
      )}
    >
      <span>Not used to the background animation?</span>
      <AnimationToggle />
      <section
        className={cn("absolute -top-5 -right-24 scale-40 hidden md:block")}
      >
        <TryThisArrow color="var(--secondary-foreground)" />
      </section>
    </section>
  );
};

export default TryStopBackgroundAnimation;
