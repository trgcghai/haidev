"use client";
import { LineNav, LineNavItem } from "@/components/common/line-nav";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TOCItemType } from "@/types/fumadocs-core";

const Toc = ({ items }: { items: TOCItemType[] }) => {
  const [activeHref, setActiveHref] = useState<string>(items[0].url);
  return (
    <>
      <Accordion defaultValue={["toc"]}>
        <AccordionItem value="toc">
          <AccordionTrigger className="hover:no-underline">
            <h3 className="text-xl font-bold text-secondary-foreground">
              Table of Contents
            </h3>
          </AccordionTrigger>
          <AccordionContent className="[&_span]:text-base [&_a]:no-underline [&_a]:underline-offset-0 [&_a]:hover:text-foreground">
            <LineNav
              items={items.map(
                (item) =>
                  ({
                    href: `${item.url}`,
                    label: item.title,
                    title: item.title,
                  }) as LineNavItem,
              )}
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

export default Toc;
