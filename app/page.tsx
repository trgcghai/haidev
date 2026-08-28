import Education from "@/components/common/education";
import Experience from "@/components/common/experience";
import Hero from "@/components/common/hero";
import PersonalInformation from "@/components/common/personal-information";
import FeaturedProjects from "@/components/common/featured-projects";
import Stack from "@/components/common/stack";
import { JsonLdScript } from "@/components/providers/JsonLdScript";
import { CONFIG } from "@/constants/config";
import { rootPageJsonLd } from "@/constants/json-ld";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section id="banner">
        <Image
          src={CONFIG.USER.banner}
          alt={`Banner of ${CONFIG.USER.displayName}`}
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

      <FeaturedProjects />

      <JsonLdScript data={rootPageJsonLd} />
    </>
  );
}
