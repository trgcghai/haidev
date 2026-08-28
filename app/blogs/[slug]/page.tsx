import { jsonLdBreadcrumbList, JsonLdScript } from "@/components/JsonLdScript";
import MDX from "@/components/mdx/MDX";
import { JSON_LD_ID } from "@/constants/json-ld";
import { getBlogPosts, getDocBySlug } from "@/lib/documents";
import { absoluteUrl } from "@/lib/utils";
import { Doc } from "@/types/document";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPosting, WithContext } from "schema-dts";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { LineNavItem } from "@/components/line-nav";
import BlogToc from "@/components/blogs/blog-toc";
import { format } from "date-fns";

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

  const { title, description, image, createdAt, updatedAt } = doc.metadata;

  const postUrl = `/blogs/${doc.slug}`;
  const ogImage =
    image ||
    `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

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
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
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
        `/og/simple?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`,
      ),
    url: absoluteUrl(postUrl),
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    author: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: absoluteUrl(postUrl),
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

      <div className="mb-4 space-y-2">
        <h1
          data-slot="doc-title"
          className="screen-line-bottom text-3xl font-semibold"
        >
          {doc.metadata.title}
        </h1>

        <p className="text-base text-muted-foreground">
          {doc.metadata.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {format(doc.metadata.createdAt, "MMMM d, yyyy")}
        </p>
      </div>

      <div className="mb-4">
        <BlogToc
          items={toc.map(
            (item) =>
              ({
                href: `${item.url}`,
                label: item.title,
                title: item.title,
              }) as LineNavItem,
          )}
        />
      </div>

      <MDX code={doc.content} />
    </>
  );
};

export default Page;
