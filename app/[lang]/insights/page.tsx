import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { MetricsBlock } from "@/components/metrics";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { CONFIG } from "@/constants/config";
import { Locale } from "@/constants/dictionary";
import { Metadata } from "next";
import { lang as rootLang } from "next/root-params";

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
  const dict = await getSafeDictionary();
  const lang = await rootLang();

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

      <MetricsBlock dict={dict} lang={lang as Locale} />
    </>
  );
};

export default Page;
