import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import MDX from "@/components/mdx/MDX";
import { JSON_LD_ID } from "@/constants/json-ld";
import { getBlogPosts, getDocBySlug } from "@/lib/documents";
import { absoluteUrl } from "@/lib/utils";
import { Doc } from "@/types/document";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPosting, WithContext } from "schema-dts";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { format } from "date-fns";
import Toc from "@/components/common/toc";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DocActions from "@/components/common/doc-actions";

export async function generateStaticParams() {
  const docs = getBlogPosts();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return notFound();
  }

  const { title, description, createdAt, updatedAt } = doc.metadata;

  const postUrl = `/blogs/${doc.slug}`;

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

function getPageJsonLd(doc: Doc): WithContext<BlogPosting> {
  const postUrl = `/blog/${doc.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(postUrl),
    headline: doc.metadata.title,
    description: doc.metadata.description,
    image:
      doc.metadata.image ||
      absoluteUrl(
        `/images?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`,
      ),
    url: absoluteUrl(postUrl),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    author: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: absoluteUrl(postUrl),
    keywords: doc.metadata.keywords
      ?.split(",")
      .map((keyword) => keyword.trim()),
    isPartOf: {
      "@type": "Blog",
      "@id": absoluteUrl("/blog"),
      name: "Blog",
      url: absoluteUrl("/blog"),
    },
  };
}

const Page = async ({ params }: PageProps<"/blogs/[slug]">) => {
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
            name: "Blog",
            href: "/blog",
          },
          {
            name: doc.metadata.title,
            href: `/blog/${slug}`,
          },
        ])}
      />

      <div className="mb-4 flex items-center justify-between gap-4">
        <Button
          className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-primary hover:no-underline text-sm"
          variant="link"
          size="sm"
          nativeButton={false}
          render={
            <Link href="/blogs">
              <ArrowLeftIcon />
              Back to Blogs
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

      <div className="mb-4">
        <Toc items={toc} />
      </div>

      <MDX code={doc.content} />
    </>
  );
};

export default Page;
