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
    website: process.env.NEXT_PUBLIC_APP_URL,
    avatar: "/avatar.jpg",
    banner: "/banner.png",
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
        sameAs: true,
      },
      linkedin: {
        title: "LinkedIn",
        handle: "Truong Cong Hai",
        href: "https://www.linkedin.com/in/truong-cong-hai/",
        sameAs: true,
      },
      youtube: {
        title: "YouTube",
        handle: "haitruongcong916",
        href: "https://www.youtube.com/@haitruongcong916",
        sameAs: true,
      },
      website: {
        title: "Website",
        handle: "haidev.id.vn",
        href: process.env.NEXT_PUBLIC_APP_URL,
        sameAs: true,
      },
    },
    email: "conghai.tpma@gmail.com",
    locale: "vi-VN",
    timezone: "Asia/Ho_Chi_Minh",
  },
  SITE: {
    name: "Công Hải",
    title: "Portfolio - Công Hải",
    url: process.env.NEXT_PUBLIC_APP_URL,
    description:
      "Portfolio of Công Hải, a passionate software engineer specializing in full-stack web development. Explore my projects, skills, and experience in building modern web applications.",
    applicationName: "Công Hải Portfolio",
    alternates: {
      canonical: process.env.NEXT_PUBLIC_APP_URL,
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
    authors: [{ name: "Công Hải", url: process.env.NEXT_PUBLIC_APP_URL }],
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

const getRoute = (slug: string) => {
  const result = CONFIG.SITE.routes.find((route) => route.slug === slug);
  if (!result) {
    return {
      url: "/",
      slug: "home",
      title: "Home",
      description: "Welcome to Công Hải's personal portfolio website.",
    };
  }
  return result;
};

export const ROUTES = {
  HOME: getRoute("home"),
  BLOGS: getRoute("blogs"),
  PROJECTS: getRoute("projects"),
};

export type SocialName = keyof typeof CONFIG.USER.socials;

export type SocialProfile = {
  title: string;
  handle: string;
  href: string;
  sameAs?: boolean;
};

export type SocialLink = SocialProfile & { name: SocialName };

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(CONFIG.USER.socials) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }));
