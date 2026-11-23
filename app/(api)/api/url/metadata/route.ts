import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const runtime = "nodejs";

export interface LinkMetadata {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
  type: string | null;
}

function getMeta($: cheerio.CheerioAPI, ...selectors: string[]): string | null {
  for (const selector of selectors) {
    const value = $(selector).attr("content");

    if (value?.trim()) {
      return value.trim();
    }
  }

  return null;
}

function validateUrl(inputUrl: string): boolean {
  if (typeof inputUrl !== "string") return false;

  const url = new URL(inputUrl);

  if (!["http:", "https:"].includes(url.protocol)) return false;

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    // Production note:
    // Add strict SSRF protection, DNS/IP validation,
    // redirect validation and response size limits.

    const metadatas = await Promise.all(
      urls.map(async (u: string) => {
        if (!validateUrl(u)) {
          return { url: u, error: "Invalid URL" };
        }

        const url = new URL(u);

        const response = await fetch(url.href, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; LinkClean/1.0)",
            Accept: "text/html",
          },
          signal: AbortSignal.timeout(8000),
          redirect: "manual",
        });

        if (!response.ok) {
          return {
            url: url.href,
            error: `Failed to fetch URL: ${response.status} ${response.statusText}`,
          };
        }

        const contentType = response.headers.get("content-type") ?? "";

        if (!contentType.includes("text/html")) {
          return {
            url: url.href,
            error: `Invalid content type: ${contentType}`,
          };
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const resolveUrl = (value: string | null) => {
          if (!value) return null;

          try {
            const resolved = new URL(value, response.url || url.href);

            if (!["http:", "https:"].includes(resolved.protocol)) {
              return null;
            }

            return resolved.href;
          } catch {
            return null;
          }
        };

        const title =
          getMeta(
            $,
            'meta[property="og:title"]',
            'meta[name="twitter:title"]',
          ) ||
          $("title").first().text().trim() ||
          null;

        const description = getMeta(
          $,
          'meta[property="og:description"]',
          'meta[name="twitter:description"]',
          'meta[name="description"]',
        );

        const image = resolveUrl(
          getMeta($, 'meta[property="og:image"]', 'meta[name="twitter:image"]'),
        );

        const faviconHref =
          $('link[rel="icon"]').attr("href") ||
          $('link[rel="shortcut icon"]').attr("href") ||
          "/favicon.ico";

        const metadata: LinkMetadata = {
          url: url.href,
          title,
          description,
          image,
          siteName: getMeta($, 'meta[property="og:site_name"]'),
          favicon: resolveUrl(faviconHref),
          type: getMeta($, 'meta[property="og:type"]'),
        };

        return metadata;
      }),
    );

    return NextResponse.json(metadatas);
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve link metadata" },
      { status: 500 },
    );
  }
}
