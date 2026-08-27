"use client";

import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import { FolderRoot } from "lucide-react";
import Link from "next/link";
import { truncate } from "lodash";
import { useIsMobile } from "@/hooks/use-mobile";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Manga Reader",
    description:
      "A self-hosted web application for reading mangas by importing your own files and managing your manga library.",
    link: "/projects#manga-reader",
  },
  {
    id: 2,
    name: "D4C Clothing Shop",
    description:
      "An e-commerce web application is built to learn about microservices architecture, ensure performance, security and consistency in distributed systems.",
    link: "/projects#d4c-clothing-shop",
  },
  {
    id: 3,
    name: "GOAT",
    description:
      "A social media platform for recruiters and job seekers to connect, featuring low latency real-time messaging, networking, and job posting functionalities.",
    link: "/projects#goat",
  },
];

const Projects = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h2 id="projects">
        <LetterSwapForward
          label="# Projects"
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="mt-4 space-y-8">
        {PROJECTS.map((project) => {
          return (
            <div
              key={project.id}
              className="flex h-full items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:text-base"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line sm:size-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <FolderRoot className="size-5" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="wrap-break-word text-base font-semibold text-primary sm:text-lg">
                  {project.name}
                </p>
                <p className="leading-relaxed">
                  {isMobile
                    ? truncate(project.description, { length: 90 })
                    : project.description + ".."}
                  <Link
                    href={project.link}
                    className="text-primary hover:underline"
                  >
                    <ComesInGoesOutUnderline direction="left">
                      See more
                    </ComesInGoesOutUnderline>
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
