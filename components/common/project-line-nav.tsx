import { LineNav } from '@/components/line-nav';
import { useState } from 'react'

const ITEMS = [
  { title: "Manga Reader", href: "#manga-reader" },
  { title: "D4C Clothig Shop", href: "#d4c-clothing-shop" },
  { title: "GOAT", href: "#goat" },
];

const ProjectLineNav = () => {
  const [activeHref, setActiveHref] = useState("#manga-reader");
  
    return (
      <LineNav
        className="w-60"
        items={ITEMS}
        activeHref={activeHref}
        scrollActiveIntoView={false}
        onItemClick={(item) => setActiveHref(item.href)}
      />
    );
}

export default ProjectLineNav