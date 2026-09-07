import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { CONFIG } from "@/constants/config";
import { JSON_LD_ID } from "@/constants/json-ld";
import { absoluteUrl } from "@/lib/utils";
import { toolRegistries } from "@/registry/tools";
import { Tool } from "@/types/tool";
import { Metadata } from "next";
import { CollectionPage, WithContext } from "schema-dts";

const DESCRIPTION = "Discover useful tools and utilities by Công Hải.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tools - Công Hải",
    description: DESCRIPTION,
    openGraph: {
      url: absoluteUrl("/tools"),
      type: "website",
      title: CONFIG.SITE.title,
      description: CONFIG.USER.description,
      countryName: CONFIG.USER.address,
      siteName: CONFIG.SITE.name,
      locale: CONFIG.USER.locale,
      images: [new URL(CONFIG.USER.banner, CONFIG.SITE.url).toString()],
    },
    keywords: CONFIG.USER.keywords,
    alternates: CONFIG.SITE.alternates,
    icons: CONFIG.SITE.icons,
    authors: CONFIG.SITE.authors,
    creator: CONFIG.SITE.creator,
    publisher: CONFIG.SITE.publisher,
  };
}

function getCollectionPageJsonLd(tools: Tool[]): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/tools"),
    url: absoluteUrl("/tools"),
    name: "Tools - Công Hải",
    description: DESCRIPTION,
    isPartOf: { "@id": JSON_LD_ID.website },
    about: { "@id": JSON_LD_ID.person },
    keywords: CONFIG.USER.keywords,
    mainEntity: {
      "@type": "ItemList",
      name: "Tools List",
      alternateName: "List of Tools",
      description: DESCRIPTION,
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/tools/${tool.slug}`),
        description: tool.description,
        name: tool.name,
        publisher: { "@id": JSON_LD_ID.person },
        author: { "@id": JSON_LD_ID.person },
        image: absoluteUrl(
          `/images?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}`,
        ),
      })),
    },
  };
}

const Page = () => {
  return (
    <>
      <JsonLdScript data={getCollectionPageJsonLd(toolRegistries)} />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Projects",
            href: "/projects",
          },
        ])}
      />
    </>
  );
};

export default Page;
