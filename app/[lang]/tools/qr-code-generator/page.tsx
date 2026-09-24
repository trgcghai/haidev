import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import QrCodeGenerator from "@/app/[lang]/tools/qr-code-generator/qr-code-generator";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import BackButton from "@/components/tools/back-button";
import { CONFIG, ROUTES } from "@/constants/config";
import { JSON_LD_ID } from "@/constants/json-ld";
import { getToolBySlug } from "@/lib/tools";
import { absoluteUrl } from "@/lib/utils";
import { Tool } from "@/types/tool";
import { Loader2Icon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WebApplication, WithContext } from "schema-dts";

export async function generateMetadata() {
  const tool = await getToolBySlug("qr-code-generator");

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

const Page = async () => {
  const slug = "qr-code-generator";
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const dict = await getSafeDictionary();

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

      <BackButton dict={dict} />

      <Suspense
        fallback={
          <div>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            {dict.pages.tools.loading}
          </div>
        }
      >
        <QrCodeGenerator
          title={tool.name}
          description={tool.description}
          dict={dict.tools["qr-code-generator"]}
        />
      </Suspense>
    </>
  );
};

export default Page;
