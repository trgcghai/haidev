import { Metadata } from "next";
import { ROUTES } from "@/constants/config";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { JSON_LD_ID } from "@/constants/json-ld";
import { BlogItem } from "@/components/blogs/blog-item";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { getBlogPosts } from "@/lib/documents";
import { Blog, WithContext } from "schema-dts";
import { absoluteUrl } from "@/lib/utils";
import { Doc } from "@/types/document";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs - Công Hải",
    description:
      "Explore my blogs, where I share my thoughts, experiences, and insights on various topics.",
    alternates: {
      canonical: ROUTES.BLOGS.url,
    },
    openGraph: {
      url: ROUTES.BLOGS.url,
      type: "website",
    },
  };
}

function getBlogJsonLd(posts: Doc[]): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    name: "Blogs - Công Hải",
    description:
      "Explore my blogs, where I share my thoughts, experiences, and insights on various topics.",
    url: absoluteUrl("/blog"),
    isPartOf: { "@id": JSON_LD_ID.website },
    mainEntityOfPage: {
      "@id": JSON_LD_ID.website,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`),
      headline: post.metadata.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: new Date(post.metadata.createdAt).toISOString(),
      description: post.metadata.description,
      image:
        post.metadata.image ||
        absoluteUrl(
          `/images?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.description)}`,
        ),
    })),
  };
}

const BlogListPage = () => {
  const blogs = getBlogPosts();

  const pinned = blogs.filter((b) => b.metadata.pinned);
  const notPinned = blogs.filter((b) => !b.metadata.pinned);

  return (
    <>
      <JsonLdScript data={getBlogJsonLd(blogs)} />

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
        ])}
      />

      <div className="">
        <h2 id="blogs">
          <LetterSwapForward
            label="# Blogs"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>
        <p className="my-4 text-base text-balance text-muted-foreground">
          Explore my blogs, where I share my thoughts, experiences, and insights
          on various topics.
        </p>

        <div className="screen-line-top relative py-4 -mx-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {pinned.map((blog) => (
              <BlogItem
                key={blog.slug}
                url={`/${ROUTES.BLOGS.slug}/${blog.slug}`}
                title={blog.metadata.title}
                createdAt={blog.metadata.createdAt}
                pinned={blog.metadata.pinned}
                coverUrl={
                  blog.metadata.image ||
                  `/images?title=${encodeURIComponent(blog.metadata.title)}&description=${encodeURIComponent(blog.metadata.description)}`
                }
              />
            ))}
            {notPinned.map((blog) => (
              <BlogItem
                key={blog.slug}
                url={`/${ROUTES.BLOGS.slug}/${blog.slug}`}
                title={blog.metadata.title}
                pinned={blog.metadata.pinned}
                createdAt={blog.metadata.createdAt}
                coverUrl={
                  blog.metadata.image ||
                  `/images?title=${encodeURIComponent(blog.metadata.title)}&description=${encodeURIComponent(blog.metadata.description)}`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListPage;
