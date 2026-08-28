import { absoluteUrl } from "@/lib/utils";
import type { BreadcrumbList, WithContext } from "schema-dts";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function JsonLdScript({
  data,
  async = false,
}: {
  data: unknown;
  async?: boolean;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      async={async}
    />
  );
}

export function jsonLdBreadcrumbList(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
