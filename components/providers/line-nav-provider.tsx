"use client";
import HomeLineNav from "@/components/common/home-line-nav";
import { Locale, locales } from "@/constants/dictionary";
import { usePathname } from "next/navigation";

const LineNavProvider = () => {
  const name = usePathname();

  if (
    locales.includes(name.split("/")[1] as Locale) &&
    name.split("/").length == 2
  ) {
    return <HomeLineNav />;
  }

  return null;
};

export default LineNavProvider;
