import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProjectItemProps = {
  url: string;
  coverUrl: string | null | undefined;
  name: string;
  description: string;
};

export function ProjectItem({
  url,
  coverUrl,
  name,
  description,
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
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={name}
            className="size-full rounded-xl object-cover"
            fill
            sizes="auto"
            loading="eager"
          />
        )}

        {!coverUrl && (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <ImageIcon className="size-8" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10" />
      </div>

      <div className="flex flex-col gap-2 p-2">
        <h3 className="text-lg leading-tight font-medium text-balance">
          {name}
        </h3>

        <dl>
          <dd className="text-sm text-muted-foreground">{description}</dd>
        </dl>
      </div>
    </Link>
  );
}
