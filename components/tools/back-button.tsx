import { Dictionary } from "@/app/[lang]/dictionaries";
import { LocalizedLink } from "@/components/common/LocalizedLink";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = ({ dict }: { dict: Dictionary }) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <Button
        className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline text-sm"
        variant="link"
        size="sm"
        nativeButton={false}
        render={
          <LocalizedLink href="/tools">
            <ArrowLeftIcon />
            {dict.pages.tools.heading}
          </LocalizedLink>
        }
      />
    </div>
  );
};

export default BackButton;
