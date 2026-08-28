import { format } from "date-fns";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

export type BlogItemProps = {
  url: string;
  title: string;
  coverUrl: string | null | undefined;
  createdAt: string;
};

export function BlogItem({ url, title, coverUrl, createdAt }: BlogItemProps) {
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
            alt={title}
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
          {title}
        </h3>

        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={new Date(createdAt).toISOString()}>
              {format(new Date(createdAt), "MMMM d, yyyy")}
            </time>
          </dd>
        </dl>
      </div>
    </Link>
  );
}
