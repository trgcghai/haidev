import { Metadata } from "next";
import { CONFIG, ROUTES } from "@/constants/config";
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
import { getSafeDictionary } from "@/app/[lang]/dictionaries";

const DESCRIPTION =
  "Explore my blogs, where I share my thoughts, experiences, and insights on various topics.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs - Công Hải",
    description: DESCRIPTION,
    openGraph: {
      url: absoluteUrl("/blog"),
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

function getBlogJsonLd(posts: Doc[]): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    name: "Blogs - Công Hải",
    description: DESCRIPTION,
    url: absoluteUrl("/blog"),
    isPartOf: { "@id": JSON_LD_ID.website },
    about: { "@id": JSON_LD_ID.person },
    keywords: CONFIG.USER.keywords,
    mainEntity: {
      "@type": "ItemList",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`),
      headline: post.metadata.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: new Date(post.metadata.createdAt).toISOString(),
      dateCreated: new Date(post.metadata.createdAt).toISOString(),
      dateModified: new Date(post.metadata.updatedAt).toISOString(),
      description: post.metadata.description,
      publisher: { "@id": JSON_LD_ID.person },
      author: { "@id": JSON_LD_ID.person },
      keywords: post.metadata.keywords
        ?.split(",")
        .map((keyword) => keyword.trim()),
      image:
        post.metadata.image ||
        absoluteUrl(
          `/images?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.description)}`,
        ),
    })),
  };
}

const BlogListPage = async () => {
  const blogs = getBlogPosts();

  const pinned = blogs.filter((b) => b.metadata.pinned);
  const notPinned = blogs.filter((b) => !b.metadata.pinned);

  const dict = await getSafeDictionary();

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
            label={`# ${dict.pages.blogs.heading}`}
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>
        <p className="my-4 text-sm sm:text-base text-muted-foreground wrap-break-word text-wrap tracking-wide">
          {dict.pages.blogs.description}
        </p>

        <div className="screen-line-top relative py-4 -mx-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map((blog, index) => (
              <BlogItem
                key={blog.slug}
                index={index}
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
            {notPinned.map((blog, index) => (
              <BlogItem
                key={blog.slug}
                index={index}
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
