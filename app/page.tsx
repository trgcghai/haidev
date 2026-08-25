import ContactForm from "@/components/common/contact-form";
import Hero from "@/components/common/hero";
import PersonalInformation from "@/components/common/personal-information";
import { TechStack } from "@/components/common/tech-stack";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import { BriefcaseBusiness, FolderRoot, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container max-w-7xl mt-8 space-y-8 mx-auto border rounded-sm p-4">
      <div id="banner">
        <Image
          src="/avatar_2.png"
          alt="Cong Hai"
          width={2560}
          height={1440}
          loading="eager"
          className="md:h-[500px] w-full object-cover rounded-xs"
        />
      </div>

      <Hero />

      <PersonalInformation />

      <div>
        <h2 id="experience">
          <LetterSwapForward
            label="# Experience"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        <div className="mt-4 flex items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line sm:size-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <BriefcaseBusiness className="size-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="wrap-break-word text-base font-semibold text-gray-600 sm:text-lg">
              <span className="text-primary">Full-Stack Developer</span> at{" "}
              <span className="text-primary">TMA Solutions</span>
            </p>
            <p>12/2025 - 04/2026</p>
            <p className="leading-relaxed">
              Developing features and maintaining web applications,
              collaborating with cross-functional teams to deliver high-quality
              software solutions.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 id="education">
          <LetterSwapForward
            label="# Education"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        <div className="mt-4 flex items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <p className="wrap-break-word text-base font-semibold text-gray-600 sm:text-lg">
              <span className="text-primary">
                Information Technology, Software Engineering
              </span>{" "}
              at{" "}
              <span className="text-primary">
                Industrial University of Ho Chi Minh City
              </span>
            </p>
            <p>2022 - 2027 (Expected)</p>
            <p>GPA: 3.59/4.0 (8.5/10)</p>
          </div>
        </div>
      </div>

      <div>
        <h2 id="stack">
          <LetterSwapForward
            label="# Stack"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        <div className="mt-4">
          <TechStack />
        </div>
      </div>

      <div>
        <h2 id="projects">
          <LetterSwapForward
            label="# Projects"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        <div className="mt-4 grid gap-4 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex h-full items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line sm:size-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <FolderRoot className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="wrap-break-word text-base font-semibold text-primary sm:text-lg">
                Manga Reader
              </p>
              <p className="leading-relaxed">
                A self-hosted web application for reading mangas by importing
                your own files and managing your manga library. Features include
                reading, bookmarking, tracking new chapters from external
                sources...
                <Link
                  href="/projects#manga-reader"
                  className="text-primary hover:underline"
                >
                  <ComesInGoesOutUnderline direction="left">
                    See more
                  </ComesInGoesOutUnderline>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex h-full items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line sm:size-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <FolderRoot className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="wrap-break-word text-base font-semibold text-primary sm:text-lg">
                D4C Clothing Shop
              </p>
              <p className="leading-relaxed">
                An e-commerce web application is built to learn about
                microservices architecture, ensure performance, security and
                consistency in distributed systems...
                <Link
                  href="/projects#d4c-clothing-shop"
                  className="text-primary hover:underline"
                >
                  <ComesInGoesOutUnderline direction="left">
                    See more
                  </ComesInGoesOutUnderline>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex h-full items-start gap-3 rounded-sm text-sm text-secondary-foreground sm:p-4 sm:text-base">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line sm:size-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <FolderRoot className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="wrap-break-word text-base font-semibold text-primary sm:text-lg">
                GOAT
              </p>
              <p className="leading-relaxed">
                A social media platform for recruiters and job seekers to
                connect, featuring low latency real-time messaging, networking,
                and job posting functionalities...
                <Link
                  href="/projects#goat"
                  className="text-primary hover:underline"
                >
                  <ComesInGoesOutUnderline direction="left">
                    See more
                  </ComesInGoesOutUnderline>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 id="contact">
          <LetterSwapForward
            label="# Contact"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        <div className="space-y-2 mt-4">
          <p className="text-secondary-foreground text-sm md:text-base">
            Feel free to reach out to me via email or connect with me on social
            media. I am always open to new opportunities and collaborations. Or
            just say hi!
          </p>
          <ContactForm />
        </div>
      </div>

      <footer className="grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-600 mt-40 border-t pt-4">
        <p>
          Inspired by{" "}
          <div className="gap-2 flex">
            <Link
              href="https://tiesen.id.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <ComesInGoesOutUnderline direction="left">
                @tiesen243
              </ComesInGoesOutUnderline>
            </Link>
            <Link
              href="https://chanhdai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <ComesInGoesOutUnderline direction="left">
                @chanhdai
              </ComesInGoesOutUnderline>
            </Link>
            <Link
              href="https://atuandev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <ComesInGoesOutUnderline direction="left">
                @nguyenphananhtuan
              </ComesInGoesOutUnderline>
            </Link>
          </div>
        </p>

        <p>
          Designed and built by{" "}
          <div>
            <Link href="#" className="hover:text-primary">
              <ComesInGoesOutUnderline direction="left">
                @haidev
              </ComesInGoesOutUnderline>
            </Link>
          </div>
        </p>

        <p>
          Components and animations by{" "}
          <div className="gap-2 flex">
            <Link
              href="https://chanhdai.com/components"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <ComesInGoesOutUnderline direction="left">
                @chanhdai
              </ComesInGoesOutUnderline>
            </Link>
            <Link
              href="https://www.fancycomponents.dev/docs/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <ComesInGoesOutUnderline direction="left">
                @fancycomponents
              </ComesInGoesOutUnderline>
            </Link>
          </div>
        </p>
      </footer>
    </div>
  );
}
