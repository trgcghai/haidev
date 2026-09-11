import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { CONFIG, ROUTES } from "@/constants/config";
import { JSON_LD_ID } from "@/constants/json-ld";
import { absoluteUrl, cn } from "@/lib/utils";
import { toolRegistries } from "@/registry/tools";
import { Tool } from "@/types/tool";
import { Metadata } from "next";
import { CollectionPage, WithContext } from "schema-dts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

const DESCRIPTION =
  "Explore a collection of useful tools and utilities designed to enhance your productivity and simplify your tasks.";

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

      <div className="">
        <h2 id="tools">
          <LetterSwapForward
            label="# Tools"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>
        <p className="my-4 text-sm sm:text-base text-muted-foreground w-full wrap-break-word text-wrap tracking-wide">
          {DESCRIPTION}
        </p>
        <div className="screen-line-top relative py-4 -mx-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
            {toolRegistries.map((tool) => (
              <Link
                href={`/${ROUTES.TOOLS.slug}/${tool.slug}`}
                key={tool.slug}
                className={cn(
                  "flex flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent/30 rounded-xl",
                  "max-sm:screen-line-top max-sm:screen-line-bottom",
                  "sm:max-md:nth-[2n+1]:screen-line-top sm:max-md:nth-[2n+1]:screen-line-bottom",
                  "md:nth-[3n+1]:screen-line-top md:nth-[3n+1]:screen-line-bottom",
                )}
              >
                <Card className="h-full!">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <tool.icon className="size-5 text-primary" />
                      <p>{tool.name}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 text-ellipsis">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
