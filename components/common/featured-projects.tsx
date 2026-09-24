import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import { FolderRoot } from "lucide-react";
import { truncate } from "lodash";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { ROUTES } from "@/constants/config";
import { getFeaturedProjects } from "@/lib/documents";
import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { LocalizedLink } from "@/components/common/LocalizedLink";

const FeaturedProjects = async () => {
  const featuredProjects = await getFeaturedProjects();
  const dict = await getSafeDictionary();

  return (
    <div>
      <h2 id="projects">
        <LetterSwapForward
          label={`# ${dict.root.projects}`}
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="mt-4 space-y-8">
        {featuredProjects.map((project) => {
          return (
            <div
              key={project.slug}
              className="flex h-full items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:text-base"
            >
              <div className="relative z-1 flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <FolderRoot className="size-5" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="wrap-break-word text-base font-semibold sm:text-lg">
                  {project.metadata.title}
                </p>
                <p className="leading-relaxed text-base text-muted-foreground">
                  {truncate(project.metadata.description, { length: 110 })}
                  {".."}
                  <LocalizedLink
                    href={`/${ROUTES.PROJECTS.slug}/${project.slug}`}
                    className="text-primary hover:underline"
                  >
                    <ComesInGoesOutUnderline direction="left">
                      {`${dict.common.seeMore}`}
                    </ComesInGoesOutUnderline>
                  </LocalizedLink>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProjects;
