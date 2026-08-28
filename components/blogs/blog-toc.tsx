"use client";
import { LineNav, LineNavItem } from "@/components/common/line-nav";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BlogToc = ({ items }: { items: LineNavItem[] }) => {
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href);
  return (
    <>
      <Accordion defaultValue={["toc"]}>
        <AccordionItem value="toc">
          <AccordionTrigger className="hover:no-underline">
            <h3 className="text-xl font-bold">Table of Contents</h3>
          </AccordionTrigger>
          <AccordionContent className="[&_span]:text-base [&_a]:no-underline [&_a]:underline-offset-0 [&_a]:hover:text-foreground">
            <LineNav
              items={items}
              activeHref={activeHref}
              scrollActiveIntoView={false}
              onItemClick={(item) => setActiveHref(item.href)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default BlogToc;
