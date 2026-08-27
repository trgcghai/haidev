import Contact from "@/components/common/contact";
import Education from "@/components/common/education";
import Experience from "@/components/common/experience";
import Hero from "@/components/common/hero";
import PersonalInformation from "@/components/common/personal-information";
import Projects from "@/components/common/projects";
import Stack from "@/components/common/stack";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio - Công Hải",
    description: "Welcome to my portfolio!",
    alternates: {
      canonical: `https://haidev.id.vn`,
    },
    openGraph: {
      title: "Portfolio - Công Hải",
      description: "Welcome to my portfolio!",
      url: `https://haidev.id.vn`,
    },
  };
}

export default function Home() {
  return (
    <>
      <section id="banner">
        <Image
          src="/avatar_2.png"
          alt="Cong Hai"
          width={2560}
          height={1440}
          loading="eager"
          className="md:h-[500px] w-full object-cover rounded-xs"
        />
      </section>

      <Hero />

      <PersonalInformation />

      <Experience />

      <Education />

      <Stack />

      <Projects />

      <Contact />
    </>
  );
}
