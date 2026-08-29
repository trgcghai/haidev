import DocActions from "@/components/common/doc-actions";
import Toc from "@/components/common/toc";
import MDX from "@/components/mdx/MDX";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JSON_LD_ID } from "@/constants/json-ld";
import { getDocBySlug, getProjectPosts } from "@/lib/documents";
import { absoluteUrl } from "@/lib/utils";
import { Doc } from "@/types/document";
import { format } from "date-fns";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionPage, WithContext } from "schema-dts";

export async function generateStaticParams() {
  const docs = getProjectPosts();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return notFound();
  }

  const { title, description, createdAt, updatedAt } = doc.metadata;

  const postUrl = `/projects/${doc.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
    },
    keywords: doc.metadata.keywords
      ?.split(",")
      .map((keyword) => keyword.trim()),
  };
}

function getPageJsonLd(doc: Doc): WithContext<CollectionPage> {
  const projectUrl = `/projects/${doc.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(projectUrl),
    name: doc.metadata.title,
    description: doc.metadata.description,
    url: absoluteUrl(projectUrl),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    keywords: doc.metadata.keywords
      ?.split(",")
      .map((keyword) => keyword.trim()),
    image:
      doc.metadata.image ||
      absoluteUrl(
        `/images?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`,
      ),
    author: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: absoluteUrl(projectUrl),
    isPartOf: {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/projects"),
      name: "projects",
      url: absoluteUrl("/projects"),
    },
  };
}

const Page = async ({ params }: PageProps<"/projects/[slug]">) => {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const toc = getTableOfContents(doc.content);

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
              Back to Projects
            </Link>
          }
        />

        <DocActions doc={doc} />
      </div>

      <section className="mb-4 space-y-4">
        <h1
          data-slot="doc-title"
          className="screen-line-bottom text-3xl font-semibold text-primary"
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

        <p className="text-base text-muted-foreground">
          {doc.metadata.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {format(doc.metadata.createdAt, "MMMM d, yyyy")}
        </p>
      </section>

      <section className="mb-4">
        <Toc items={toc} />
      </section>

      <MDX code={doc.content} />
    </>
  );
};

export default Page;
