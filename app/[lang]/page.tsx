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
import { MetricsBlock } from "@/components/metrics";
import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { lang as rootLang } from "next/root-params";
import { Locale } from "@/constants/dictionary";

export default async function Home() {
  const [dict, lang] = await Promise.all([getSafeDictionary(), rootLang()]);

  return (
    <>
      <section id="banner" className="mb-12 md:mb-12">
        <Image
          src={CONFIG.USER.banner}
          alt={`Banner of ${CONFIG.USER.displayName}`}
          width={2560}
          height={1440}
          loading="eager"
          className="lg:h-[500px] md:h-[400px] w-full object-cover rounded-xs"
        />
      </section>

      <Hero />

      <PersonalInformation />

      <Experience />

      <Education />

      <Stack />

      <FeaturedProjects />

      <MetricsBlock dict={dict} lang={lang as Locale} />

      <JsonLdScript data={rootPageJsonLd} />
    </>
  );
}
