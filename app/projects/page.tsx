import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects - Công Hải",
    description:
      "Explore my projects that showcase my skills and expertise in web development.",
    alternates: {
      canonical: `https://haidev.id.vn`,
    },
    openGraph: {
      title: "Portfolio - Công Hải",
      description:
        "Explore my projects that showcase my skills and expertise in web development.",
      url: `https://haidev.id.vn`,
    },
  };
}

const ProjectsListPage = () => {
  return <div>ProjectsListPage</div>;
};

export default ProjectsListPage;
