import { Metadata } from "next";
import { CONFIG, ROUTES } from "@/constants/config";
import { JsonLdScript } from "@/components/JsonLdScript";
import { blogsPageJsonLd } from "@/constants/json-ld";
import { ArticleItem } from "@/components/blogs/article-item";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { generateSlugFromTitle } from "@/lib/slug";
import { ARTICLES } from "@/constants/blogs";

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
            {ARTICLES.map((article) => (
              <ArticleItem
                key={article.id}
                url={`${CONFIG.SITE.url}/${ROUTES.BLOGS.slug}/${generateSlugFromTitle(article.title)}`}
                title={article.title}
                coverUrl={article.coverUrl}
                createdAt={article.createdAt}
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
