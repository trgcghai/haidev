import type { Metadata } from "next";

import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const title = "Insights";
const description =
  "The code is public, and so are the numbers. Visitors, sessions, and views, compared with the previous period.";

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    url: "/insights",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
};

export default function InsightsPage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Insights",
            href: "/insights",
          },
        ])}
      />

      <div className="min-h-svh">
        <h1>Insights</h1>

        <div className="h-4" />
        <div className="screen-line-bottom h-px" />

        <Analytics />

        <div className="h-4" />

        <SpeedInsights />

        <div className="screen-line-top h-4" />
      </div>
    </>
  );
}
