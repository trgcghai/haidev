import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PinIcon } from "lucide-react";
import Image from "@/components/common/Image";

export type BlogItemProps = {
  url: string;
  title: string;
  coverUrl: string;
  createdAt: string;
  pinned: boolean | null | undefined;
};

export function BlogItem({
  url,
  title,
  coverUrl,
  createdAt,
  pinned,
}: BlogItemProps) {
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
        <Image src={coverUrl} alt={title} />
        <div className="pointer-events-none absolute inset-0 rounded-xl inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10" />
      </div>

      <div className="flex flex-col gap-2 p-2 relative">
        <h3 className="text-lg leading-tight font-medium text-balance line-clamp-1 text-ellipsis">
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

        {pinned && (
          <div className="absolute md:top-2 bottom-2 right-2 flex items-center justify-center rounded-full text-muted-foreground">
            <PinIcon className="size-5 text-primary" />
          </div>
        )}
      </div>
    </Link>
  );
}
