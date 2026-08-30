import Image from "@/components/common/Image";
import { cn } from "@/lib/utils";
import { PinIcon } from "lucide-react";
import Link from "next/link";

export type ProjectItemProps = {
  url: string;
  coverUrl: string;
  name: string;
  description: string;
  pinned: boolean | null | undefined;
};

export function ProjectItem({
  url,
  coverUrl,
  name,
  description,
  pinned,
}: ProjectItemProps) {
  return (
    <Link
      href={url}
      className={cn(
        "flex flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent/30 rounded-xl",
        "max-sm:screen-line-top max-sm:screen-line-bottom",
        "sm:max-md:nth-[2n+1]:screen-line-top sm:max-md:nth-[2n+1]:screen-line-bottom",
        "md:nth-[3n+1]:screen-line-top md:nth-[3n+1]:screen-line-bottom",
      )}
    >
      <div className="relative aspect-video">
        <Image src={coverUrl} alt={name} />
        <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10" />
      </div>

      <div className="flex flex-col gap-2 p-2 relative">
        <h3 className="text-lg leading-tight font-medium text-balance text-ellipsis line-clamp-1">
          {name}
        </h3>

        <dl>
          <dd className="text-sm text-muted-foreground text-ellipsis line-clamp-2">
            {description}
          </dd>
        </dl>

        {pinned && (
          <div className="absolute md:top-2 bottom-2 right-2 flex items-center justify-center rounded-full text-muted-foreground">
            <PinIcon className="size-5 text-primary" />
          </div>
        )}
      </div>
    </Link>
  );
}
