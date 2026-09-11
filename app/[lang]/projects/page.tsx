import { Metadata } from "next";
import { CONFIG, ROUTES } from "@/constants/config";
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
import { getSafeDictionary } from "@/app/[lang]/dictionaries";

const DESCRIPTION =
  "Check out my projects, where I showcase my work and demonstrate my skills in web development, design, and problem-solving.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects - Công Hải",
    description: DESCRIPTION,
    openGraph: {
      url: absoluteUrl("/projects"),
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

function getCollectionPageJsonLd(docs: Doc[]): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/projects"),
    url: absoluteUrl("/projects"),
    name: "Projects - Công Hải",
    description: DESCRIPTION,
    isPartOf: { "@id": JSON_LD_ID.website },
    about: { "@id": JSON_LD_ID.person },
    keywords: CONFIG.USER.keywords,
    mainEntity: {
      "@type": "ItemList",
      name: "Projects List",
      alternateName: "List of Projects",
      description: DESCRIPTION,
      numberOfItems: docs.length,
      itemListElement: docs.map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projects/${doc.slug}`),
        description: doc.metadata.description,
        name: doc.metadata.title,
        publisher: { "@id": JSON_LD_ID.person },
        author: { "@id": JSON_LD_ID.person },
        image:
          doc.metadata.image ||
          absoluteUrl(
            `/images?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`,
          ),
      })),
    },
  };
}

const ProjectsListPage = async () => {
  const projects = getProjectPosts();

  const pinned = projects.filter((b) => b.metadata.pinned);
  const notPinned = projects.filter((b) => !b.metadata.pinned);

  const dict = await getSafeDictionary();

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
            label={`# ${dict.pages.projects.heading}`}
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>
        <p className="my-4 text-sm sm:text-base text-muted-foreground w-full wrap-break-word text-wrap tracking-wide">
          {dict.pages.projects.description}
        </p>
        <div className="screen-line-top relative py-4 -mx-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map((project, index) => (
              <ProjectItem
                key={project.slug}
                index={index}
                description={project.metadata.description}
                url={`/${ROUTES.PROJECTS.slug}/${project.slug}`}
                name={project.metadata.title}
                pinned={project.metadata.pinned}
                coverUrl={
                  project.metadata.image ||
                  `/images?title=${encodeURIComponent(project.metadata.title)}&description=${encodeURIComponent(project.metadata.description)}`
                }
              />
            ))}
            {notPinned.map((project, index) => (
              <ProjectItem
                key={project.slug}
                index={index}
                description={project.metadata.description}
                url={`/${ROUTES.PROJECTS.slug}/${project.slug}`}
                name={project.metadata.title}
                pinned={project.metadata.pinned}
                coverUrl={
                  project.metadata.image ||
                  `/images?title=${encodeURIComponent(project.metadata.title)}&description=${encodeURIComponent(project.metadata.description)}`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsListPage;
