"use client";
import { LinkMetadata } from "@/app/(api)/api/url/metadata/route";
import { Dictionary } from "@/app/[lang]/dictionaries";
import { sanitizeUrl } from "@/app/[lang]/tools/url-sanitizer/url-sanitizer-util";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useMetadataUrl from "@/hooks/use-metadata-url";
import { ExternalLink, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface UrlSanitizerProps {
  title: string;
  description: string;
  dict: Dictionary["tools"]["url-sanitizer"];
}

const UrlSanitizer = ({ title, description, dict }: UrlSanitizerProps) => {
  const [inputUrls, setInputUrls] = useState("");
  const [metadataUrls, setMetadataUrls] = useState<LinkMetadata[]>([]);
  const { isLoading, fetchMetadata } = useMetadataUrl();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.split("\n").length > 10) {
      toast.error("You can only enter up to 10 URLs.");
      return;
    }

    setInputUrls(e.target.value);
  };

  const handleSanitizeUrls = async () => {
    const urls = inputUrls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    if (urls.length === 0) return;

    const sanitized = urls
      .map((url) => sanitizeUrl(url))
      .filter((result) => result.success)
      .map((result) => result.sanitized);

    const data = await fetchMetadata(sanitized as string[]);

    if (data) {
      setMetadataUrls(data);
    }
  };

  const handleOpenAllUrls = () => {
    metadataUrls.forEach((md) => {
      window.open(md.url, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <main className="flex w-full flex-col gap-8">
      <div>
        <h1
          data-slot="doc-title"
          className="text-2xl font-semibold text-primary line-clamp-2 text-ellipsis"
        >
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
      </div>

      <section>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="urls-input">{dict.label}</Label>
            <span className="text-xs text-muted-foreground">
              {inputUrls.split("\n").filter((url) => url.trim()).length}/10
            </span>
          </div>
          <Textarea
            id="urls-input"
            placeholder={dict.placeholder}
            value={inputUrls}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => setInputUrls("")}
            disabled={isLoading}
          >
            {dict.cancel}
          </Button>
          <Button
            onClick={handleSanitizeUrls}
            disabled={isLoading}
            className="min-w-12"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : dict.process}
          </Button>
        </div>
      </section>

      {metadataUrls.length > 0 && (
        <section>
          <div className="flex items-center justify-start gap-2 mb-4">
            <Button variant="default" onClick={handleOpenAllUrls}>
              <ExternalLink className="size-4" aria-hidden="true" />
              {dict.openAll}
            </Button>
            <Button variant="destructive" onClick={() => setMetadataUrls([])}>
              <X className="size-4" aria-hidden="true" />
              {dict.clear}
            </Button>
          </div>
          <div className="space-y-2">
            {metadataUrls.map((md, index) => (
              <Link
                key={md.url + index}
                className="flex p-2 gap-2 rounded-lg border border-border"
                href={md.url}
                target="_blank"
                rel="noopener noreferrer"
                title={md.title ?? md.siteName ?? md.url}
              >
                <div className="relative aspect-video h-30">
                  <Image
                    alt={md.title ?? "No title"}
                    src={
                      md.image ??
                      (md.title &&
                        md.description &&
                        `/images?title=${encodeURIComponent(md.title)}`) ??
                      ""
                    }
                    imageLoading="eager"
                    unoptimized
                    className="rounded-md"
                  />
                </div>

                <article className="flex flex-col gap-2 justify-center">
                  <h4 className="font-semibold">
                    {md.title ?? md.siteName ?? "No title"}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 text-ellipsis">
                    {md.description ?? "No description available."}
                  </p>
                  <p className="text-primary hover:underline break-all underline-offset-4! text-sm">
                    {md.url}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default UrlSanitizer;
