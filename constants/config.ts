export const CONFIG = {
  USER: {
    firstName: "Hải",
    middleName: "Công",
    lastName: "Trương",
    fullName: "Trương Công Hải",
    alternateName: "Công Hải",
    displayName: "Công Hải",
    username: "haidev",
    alternateUsername: "komarichika",
    roles: [
      "Software Engineer",
      "Full-Stack Developer",
      "Web Developer Enthusiast",
    ],
    description:
      "Portfolio of Công Hải, a passionate software engineer specializing in full-stack web development. Explore my projects, skills, and experience in building modern web applications.",
    address: "Ho Chi Minh City, Vietnam",
    website: "https://haidev.id.vn",
    avatar: "/avatar_7.jpg",
    banner: "/avatar_2.png",
    keywords: [
      "Công Hải",
      "Cong Hai",
      "Trương Công Hải",
      "Truong Cong Hai",
      "trgcghai",
      "cghai",
      "iamtrgcghai",
      "haidev",
      "komarichika",
      "Software Engineer",
      "Full-Stack Developer",
      "Web Developer Enthusiast",
      "Frontend Developer",
      "Backend Developer",
    ],
    socials: {
      github: {
        title: "GitHub",
        handle: "trgcghai",
        href: "https://github.com/trgcghai",
      },
      linkedin: {
        title: "LinkedIn",
        handle: "Truong Cong Hai",
        href: "https://www.linkedin.com/in/truong-cong-hai/",
      },
      youtube: {
        title: "YouTube",
        handle: "haitruongcong916",
        href: "https://www.youtube.com/@haitruongcong916",
      },
      website: {
        title: "Website",
        handle: "haidev.id.vn",
        href: "https://haidev.id.vn",
      },
    },
    phone: "+84 909 739 714",
    email: "conghai.tpma@gmail.com",
    locale: "vi-VN",
    timezone: "Asia/Ho_Chi_Minh",
  },
  SITE: {
    name: "Công Hải",
    title: "Portfolio - Công Hải",
    url: "https://haidev.id.vn",
    description:
      "Portfolio of Công Hải, a passionate software engineer specializing in full-stack web development. Explore my projects, skills, and experience in building modern web applications.",
    applicationName: "Công Hải Portfolio",
    alternates: {
      canonical: "https://haidev.id.vn",
    },
    icons: {
      icon: [
        {
          url: "/favicon.png",
          type: "image/png",
          sizes: "any",
        },
        {
          url: "/favicon16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          url: "/favicon32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          url: "/favicon48.png",
          type: "image/png",
          sizes: "48x48",
        },
        {
          url: "/favicon180.png",
          type: "image/png",
          sizes: "180x180",
        },
        {
          url: "/favicon192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          url: "/favicon512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
    },
    creator: "Công Hải",
    publisher: "Công Hải",
    authors: [{ name: "Công Hải", url: "https://haidev.id.vn" }],
    routes: [
      {
        url: "/",
        slug: "home",
        title: "Home",
        description: "Welcome to Công Hải's personal portfolio website.",
      },
      {
        url: "/blogs",
        slug: "blogs",
        title: "Blogs",
        description: "Read insightful blogs and articles by Công Hải.",
      },
      {
        url: "/projects",
        slug: "projects",
        title: "Projects",
        description: "Explore the projects developed by Công Hải.",
      },
    ],
  },
};

export const SOCIAL_LINKS = Object.entries(CONFIG.USER.socials).map(
  ([k, v]) => ({ name: k, ...v }),
);

export const JSON_LD_ID = {
  website: `${CONFIG.SITE.url}/#website`,
  person: `${CONFIG.SITE.url}/#person`,
} as const;

export const personJsonLd = {
  "@type": "Person",
  "@id": JSON_LD_ID.person,
  name: CONFIG.USER.displayName,
  alternateName: [CONFIG.USER.username],
  identifier: CONFIG.USER.username,
  image: CONFIG.USER.avatar,
  url: CONFIG.SITE.url,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": JSON_LD_ID.website,
  name: CONFIG.SITE.name,
  url: CONFIG.SITE.url,
  author: personJsonLd,
};
