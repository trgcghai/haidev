import { LineNav } from "@/components/common/line-nav";
import { useState } from "react";

const ITEMS = [
  { title: "Welcome", href: "#welcome" },
  { title: "About me", href: "#about-me" },
  { title: "Find me online", href: "#find-me-online" },
  { title: "Experience", href: "#experience" },
  { title: "Education", href: "#education" },
  { title: "Stack", href: "#stack" },
  { title: "Projects", href: "#projects" },
];

const HomeLineNav = () => {
  const [activeHref, setActiveHref] = useState("#welcome");

  return (
    <LineNav
      className="w-60"
      items={ITEMS}
      activeHref={activeHref}
      scrollActiveIntoView={false}
      onItemClick={(item) => setActiveHref(item.href)}
    />
  );
};

export default HomeLineNav;
