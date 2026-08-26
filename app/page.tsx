import ContactForm from "@/components/common/contact-form";
import Hero from "@/components/common/hero";
import PersonalInformation from "@/components/common/personal-information";
import Projects from "@/components/common/projects";
import { TechStack } from "@/components/common/tech-stack";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
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

        <div className="mt-4 space-y-8">
          <Projects />
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
          <p className="text-secondary-foreground text-sm md:text-base mb-4">
            Feel free to reach out to me via email or connect with me on social
            media. I am always open to new opportunities and collaborations. Or
            just say hi!
          </p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
