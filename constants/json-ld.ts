import { CONFIG, SOCIAL_LINKS } from "@/constants/config";
import type { Person, ProfilePage, WebSite, WithContext } from "schema-dts";

export const JSON_LD_ID = {
  website: `${CONFIG.SITE.url}/#website`,
  person: `${CONFIG.SITE.url}/#person`,
} as const;

export const personJsonLd: Person = {
  "@type": "Person",
  "@id": JSON_LD_ID.person,
  name: CONFIG.USER.displayName,
  alternateName: [CONFIG.USER.username],
  identifier: CONFIG.USER.username,
  image: CONFIG.USER.banner,
  url: CONFIG.SITE.url,
  sameAs: SOCIAL_LINKS.filter((link) => link.sameAs).map((link) => link.href),
};

export const websiteJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": JSON_LD_ID.website,
  name: CONFIG.SITE.name,
  url: CONFIG.SITE.url,
  author: personJsonLd,
};

export const rootPageJsonLd: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${CONFIG.SITE.url}`,
  name: CONFIG.SITE.name,
  mainEntity: {
    "@id": JSON_LD_ID.person,
  },
};
