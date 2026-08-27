import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs - Công Hải",
    description:
      "Read my latest blog posts on web development, programming, and technology.",
    alternates: {
      canonical: `https://haidev.id.vn`,
    },
    openGraph: {
      title: "Blogs - Công Hải",
      description:
        "Read my latest blog posts on web development, programming, and technology.",
      url: `https://haidev.id.vn`,
    },
  };
}

const BlogListPage = () => {
  return <div>BlogListPage</div>;
};

export default BlogListPage;
