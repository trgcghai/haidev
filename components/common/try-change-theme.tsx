import { ModeToggler } from "@/components/common/mode-toggler";
import { TryThisArrow } from "@/components/common/TryThisArrow";
import { cn } from "@/lib/utils";

const TryChangeTheme = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 text-secondary-foreground relative", className)}>
      <span>Not used to dark theme ?</span>
      <ModeToggler system={false} />
      <div className="absolute -top-5 right-[545px] scale-40">
        <TryThisArrow color="var(--secondary-foreground)" />
      </div>
    </div>
  );
};

export default TryChangeTheme;
