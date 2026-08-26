"use client";
import HomeLineNav from "@/components/common/home-line-nav";
import ProjectLineNav from "@/components/common/project-line-nav";
import { usePathname } from "next/navigation";

const LineNavProvider = () => {
  const name = usePathname();

  if (name.split('/')[1].endsWith('projects')) {
    return <ProjectLineNav />
  }

  if (name.split('/')[1].endsWith('blogs')) {
    return <p>Blog line nav</p>
  }

  return <HomeLineNav />
};

export default LineNavProvider;
