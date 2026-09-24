import { Dictionary } from "@/app/[lang]/dictionaries";
import { LineNav } from "@/components/common/line-nav";
import { useState } from "react";

const ITEMS = [
  { key: "welcome", href: "#welcome" },
  { key: "aboutMe", href: "#about-me" },
  { key: "findMeOnline", href: "#find-me-online" },
  { key: "experience", href: "#experience" },
  { key: "education", href: "#education" },
  { key: "stack", href: "#stack" },
  { key: "projects", href: "#projects" },
  { key: "insights", href: "#insights" },
];

const HomeLineNav = ({ dict }: { dict: Dictionary["lineNav"] }) => {
  const [activeHref, setActiveHref] = useState("#welcome");

  return (
    <LineNav
      className="w-60"
      items={ITEMS.map((i) => ({
        href: i.href,
        title: dict[i.key as keyof Dictionary["lineNav"]],
      }))}
      activeHref={activeHref}
      scrollActiveIntoView={false}
      onItemClick={(item) => setActiveHref(item.href)}
    />
  );
};

export default HomeLineNav;
