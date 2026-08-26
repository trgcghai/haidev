"use client";
import HomeLineNav from "@/components/common/home-line-nav";
import { usePathname } from "next/navigation";

const LineNavProvider = () => {
  const name = usePathname();

  if (name.split('/')[1].endsWith('projects')) {
    return null;
  }

  if (name.split('/')[1].endsWith('blogs')) {
    return null;
  }

  if (name.split('/')[1].length == 0) {
    return <HomeLineNav />
  }

  return null;
};

export default LineNavProvider;
