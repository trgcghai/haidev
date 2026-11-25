"use client";
import { Dictionary } from "@/app/[lang]/dictionaries";
import { sanitizeUrl } from "@/app/[lang]/tools/url-sanitizer/url-sanitizer-util";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, X } from "lucide-react";
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
  const [sanitizedUrls, setSanitizedUrls] = useState<string[]>([]);

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

    setSanitizedUrls(sanitized as string[]);
  };

  const handleOpenAllUrls = () => {
    sanitizedUrls.forEach((url) => {
      window.open(url, "_blank", "noopener,noreferrer");
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
          <Button variant="outline" onClick={() => setInputUrls("")}>
            {dict.cancel}
          </Button>
          <Button onClick={handleSanitizeUrls} className="min-w-12">
            {dict.process}
          </Button>
        </div>
      </section>

      {sanitizedUrls.length > 0 && (
        <section>
          <div className="flex items-center justify-start gap-2 mb-4">
            <Button variant="default" onClick={handleOpenAllUrls}>
              <ExternalLink className="size-4" aria-hidden="true" />
              {dict.openAll}
            </Button>
            <Button variant="destructive" onClick={() => setSanitizedUrls([])}>
              <X className="size-4" aria-hidden="true" />
              {dict.clear}
            </Button>
          </div>
          <div className="space-y-2">
            {sanitizedUrls.map((url, index) => (
              <Link
                key={url + index}
                className="flex p-2 gap-2 rounded-lg border border-border"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-primary hover:underline break-all underline-offset-4! text-sm">
                  {url}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default UrlSanitizer;
