import { CONFIG } from "@/constants/config";
import type { MetadataRoute } from "next";

export const revalidate = false;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/projects", "/blogs"].map((r) => ({
    url: `${CONFIG.SITE.url}${r}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
