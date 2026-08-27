import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects - Công Hải",
    alternates: {
      canonical: `https://haidev.id.vn/projects`,
    },
    openGraph: {
      url: `https://haidev.id.vn/projects`,
    },
  };
}

const ProjectsListPage = () => {
  return <div>ProjectsListPage</div>;
};

export default ProjectsListPage;
