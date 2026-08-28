import { Metadata } from "next";
import { ROUTES } from "@/constants/config";
import {
  jsonLdBreadcrumbList,
  JsonLdScript,
} from "@/components/providers/JsonLdScript";
import { JSON_LD_ID } from "@/constants/json-ld";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { ProjectItem } from "@/components/projects/project-item";
import { absoluteUrl } from "@/lib/utils";
import { CollectionPage, WithContext } from "schema-dts";
import { getProjectPosts } from "@/lib/documents";
import { Doc } from "@/types/document";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects - Công Hải",
    description:
      "Check out my projects, where I showcase my work and demonstrate my skills in web development, design, and problem-solving.",
    alternates: {
      canonical: ROUTES.PROJECTS.url,
    },
    openGraph: {
      url: ROUTES.PROJECTS.url,
      type: "website",
    },
  };
}

function getCollectionPageJsonLd(docs: Doc[]): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects"),
    name: "Projects - Công Hải",
    description:
      "Check out my projects, where I showcase my work and demonstrate my skills in web development, design, and problem-solving.",
    url: absoluteUrl("/projects"),
    isPartOf: { "@id": JSON_LD_ID.website },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: docs.length,
      itemListElement: docs.map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projects/${doc.slug}`),
        description: doc.metadata.description,
        name: doc.metadata.title,
      })),
    },
  };
}

const ProjectsListPage = () => {
  const projects = getProjectPosts();

  return (
    <>
      <JsonLdScript data={getCollectionPageJsonLd(projects)} />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Projects",
            href: "/projects",
          },
        ])}
      />

      <div className="">
        <h2 id="projects">
          <LetterSwapForward
            label="# Projects"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>
        <p className="my-4 text-base text-balance text-muted-foreground">
          Check out my projects, where I showcase my work and demonstrate my
          skills in web development, design, and problem-solving.
        </p>
        <div className="screen-line-top relative py-4 -mx-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectItem
                key={project.slug}
                coverUrl={null}
                description={project.metadata.description}
                url={`/${ROUTES.PROJECTS.slug}/${project.slug}`}
                name={project.metadata.title}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsListPage;
