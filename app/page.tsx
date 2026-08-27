import Contact from "@/components/common/contact";
import Education from "@/components/common/education";
import Experience from "@/components/common/experience";
import Hero from "@/components/common/hero";
import PersonalInformation from "@/components/common/personal-information";
import Projects from "@/components/common/projects";
import Stack from "@/components/common/stack";
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

      <Experience />

      <Education />

      <Stack />

      <Projects />

      <Contact />
    </>
  );
}
