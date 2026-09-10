import QrCodeGenerator from "@/app/tools/qr-code-generator/qr-code-generator";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { Button } from "@/components/ui/button";
import { CONFIG, ROUTES } from "@/constants/config";
import { JSON_LD_ID } from "@/constants/json-ld";
import { absoluteUrl } from "@/lib/utils";
import { toolRegistries } from "@/registry/tools";
import { Tool } from "@/types/tool";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WebApplication, WithContext } from "schema-dts";

export async function generateMetadata() {
  const tool = toolRegistries.find((tool) => tool.slug === "qr-code-generator");

  if (!tool) {
    return notFound();
  }

  const toolUrl = "/" + ROUTES.TOOLS.slug + "/" + tool.slug;
  const { name: title, description, createdAt, updatedAt } = tool;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(toolUrl),
    },
    openGraph: {
      url: absoluteUrl(toolUrl),
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
    },
    icons: CONFIG.SITE.icons,
    authors: CONFIG.SITE.authors,
    creator: CONFIG.SITE.creator,
    publisher: CONFIG.SITE.publisher,
  };
}

function getPageJsonLd(tool: Tool): WithContext<WebApplication> {
  const toolUrl = "/" + ROUTES.TOOLS.slug + "/" + tool.slug;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": absoluteUrl(toolUrl),
    name: tool.name,
    description: tool.description,
    url: absoluteUrl(toolUrl),
    applicationCategory: "Utility",
    operatingSystem: "Web",
    keywords: tool.keywords?.join(","),
    dateCreated: new Date(tool.createdAt).toISOString(),
    datePublished: new Date(tool.createdAt).toISOString(),
    dateModified: new Date(tool.updatedAt).toISOString(),
    author: { "@id": JSON_LD_ID.person },
    publisher: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(toolUrl),
    },
    isPartOf: {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/tools"),
      name: "Tools - Công Hải",
      url: absoluteUrl("/tools"),
    },
  };
}

const Page = () => {
  const slug = "qr-code-generator";
  const tool = toolRegistries.find((tool) => tool.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <JsonLdScript data={getPageJsonLd(tool)} />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Tools",
            href: "/tools",
          },
          {
            name: tool.name,
            href: `/tools/${slug}`,
          },
        ])}
      />

      <div className="mb-4 flex items-center justify-between gap-4">
        <Button
          className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline text-sm"
          variant="link"
          size="sm"
          nativeButton={false}
          render={
            <Link href="/tools">
              <ArrowLeftIcon />
              Tools
            </Link>
          }
        />
      </div>

      <QrCodeGenerator title={tool.name} description={tool.description} />
    </>
  );
};

export default Page;
