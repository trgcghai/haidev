import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs - Công Hải",
    alternates: {
      canonical: `https://haidev.id.vn/blogs`,
    },
    openGraph: {
      url: `https://haidev.id.vn/blogs`,
    },
  };
}

const BlogListPage = () => {
  return <div>BlogListPage</div>;
};

export default BlogListPage;
