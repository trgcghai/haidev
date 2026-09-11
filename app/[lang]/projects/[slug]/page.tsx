import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import DocActions from "@/components/common/doc-actions";
import Toc from "@/components/common/toc";
import MDX from "@/components/mdx/MDX";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONFIG, ROUTES } from "@/constants/config";
import { JSON_LD_ID } from "@/constants/json-ld";
import { getDocBySlug, getProjectPosts } from "@/lib/documents";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { Doc } from "@/types/document";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SoftwareApplication, WithContext } from "schema-dts";

export async function generateStaticParams() {
  const docs = await getProjectPosts();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return notFound();
  }

  const { title, description, createdAt, updatedAt } = doc.metadata;

  const postUrl = "/" + ROUTES.PROJECTS.slug + "/" + doc.slug;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(postUrl),
    },
    openGraph: {
      url: absoluteUrl(postUrl),
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
    },
    keywords: doc.metadata.keywords
      ?.split(",")
      .map((keyword) => keyword.trim())
      .concat(CONFIG.USER.keywords),
    icons: CONFIG.SITE.icons,
    authors: CONFIG.SITE.authors,
    creator: CONFIG.SITE.creator,
    publisher: CONFIG.SITE.publisher,
  };
}

function getPageJsonLd(doc: Doc): WithContext<SoftwareApplication> {
  const projectUrl = "/" + ROUTES.PROJECTS.slug + "/" + doc.slug;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": absoluteUrl(projectUrl),
    name: doc.metadata.title,
    description: doc.metadata.description,
    url: absoluteUrl(projectUrl),
    applicationCategory: "Web Application",
    operatingSystem: "Web",
    dateCreated: new Date(doc.metadata.createdAt).toISOString(),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    keywords: doc.metadata.keywords
      ?.split(",")
      .map((keyword) => keyword.trim())
      .concat(CONFIG.USER.keywords)
      .join(","),
    image:
      doc.metadata.image ||
      absoluteUrl(
        `/images?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`,
      ),
    author: { "@id": JSON_LD_ID.person },
    publisher: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(projectUrl),
    },
    isPartOf: {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/projects"),
      name: "Projects - Công Hải",
      url: absoluteUrl("/projects"),
    },
  };
}

const Page = async ({ params }: PageProps<"/[lang]/projects/[slug]">) => {
  const { slug, lang } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const toc = getTableOfContents(doc.content);

  const dict = await getSafeDictionary();

  return (
    <>
      <JsonLdScript data={getPageJsonLd(doc)} />

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
          {
            name: doc.metadata.title,
            href: `/projects/${slug}`,
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
            <Link href="/projects">
              <ArrowLeftIcon />
              {dict.pages.projects.heading}
            </Link>
          }
        />

        <DocActions doc={doc} />
      </div>

      <section className="mb-4 space-y-4">
        <h1
          data-slot="doc-title"
          className="screen-line-bottom text-3xl font-semibold text-primary line-clamp-2 text-ellipsis"
        >
          {doc.metadata.title}
        </h1>

        <section>
          <p className="text-base text-muted-foreground flex items-center gap-2 flex-wrap">
            {doc.metadata.tags?.split(",").map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-base! text-muted-foreground capitalize"
              >
                # {tag.trim()}
              </Badge>
            ))}
          </p>
        </section>

        <p className="text-base text-muted-foreground wrap-break-word text-wrap tracking-wide break-all">
          {doc.metadata.description}
        </p>
        <p className="text-sm text-muted-foreground capitalize">
          {formatDate(doc.metadata.createdAt, lang)}
        </p>
      </section>

      <section className="mb-4">
        <Toc items={toc} title={dict.common.toc} />
      </section>

      <MDX code={doc.content} />
    </>
  );
};

export default Page;
