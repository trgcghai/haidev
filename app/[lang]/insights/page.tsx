import { MetricsBlock } from "@/components/metrics";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { CONFIG } from "@/constants/config";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

const title = "Insights";
const description =
  "Gain valuable insights and analytics from Công Hải's portfolio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    url: "/insights",
    type: "website",
    title: CONFIG.SITE.title,
    description: CONFIG.USER.description,
    countryName: CONFIG.USER.address,
    siteName: CONFIG.SITE.name,
    locale: CONFIG.USER.locale,
    images: {
      url: `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
};

const Page = async () => {
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

      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
        <MetricsBlock />
      </Suspense>
    </>
  );
};

export default Page;
