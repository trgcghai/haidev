import type { MetadataRoute } from "next";

export const siteUrl = "https://haidev.id.vn";

export const revalidate = false;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/projects", "/blogs"].map((r) => ({
    url: `${siteUrl}${r}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
