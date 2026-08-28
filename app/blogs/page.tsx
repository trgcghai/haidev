import { Metadata } from "next";
import { ROUTES } from "@/constants/config";
import { JsonLdScript } from "@/components/JsonLdScript";
import { blogsPageJsonLd } from "@/constants/json-ld";
import { BlogItem } from "@/components/blogs/blog-item";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { getBlogPosts } from "@/lib/documents";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs - Công Hải",
    alternates: {
      canonical: ROUTES.BLOGS.url,
    },
    openGraph: {
      url: ROUTES.BLOGS.url,
    },
  };
}

const BlogListPage = () => {
  const blogs = getBlogPosts();

  return (
    <>
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
            {blogs.map((blog) => (
              <BlogItem
                key={blog.slug}
                url={`/${ROUTES.BLOGS.slug}/${blog.slug}`}
                title={blog.metadata.title}
                coverUrl={blog.metadata.image}
                createdAt={blog.metadata.createdAt}
              />
            ))}
          </div>
        </div>
      </div>

      <JsonLdScript data={blogsPageJsonLd} />
    </>
  );
};

export default BlogListPage;
