interface Project {
  id: number;
  name: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Manga Reader",
    description:
      "A self-hosted web application for reading mangas by importing your own files and managing your manga library.",
  },
  {
    id: 2,
    name: "D4C Clothing Shop",
    description:
      "An e-commerce web application is built to learn about microservices architecture, ensure performance, security and consistency in distributed systems.",
  },
  {
    id: 3,
    name: "GOAT",
    description:
      "A social media platform for recruiters and job seekers to connect, featuring low latency real-time messaging, networking, and job posting functionalities.",
  },
];
