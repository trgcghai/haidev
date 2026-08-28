import { CONFIG } from "@/constants/config";
import { getBlogPosts, getProjectPosts } from "@/lib/documents";
import type { MetadataRoute } from "next";

export const revalidate = false;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts().map((post) => ({
    url: `${CONFIG.SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }));

  const projects = getProjectPosts().map((project) => ({
    url: `${CONFIG.SITE.url}/projects/${project.slug}`,
    lastModified: new Date(project.metadata.updatedAt).toISOString(),
  }));

  const routes = ["/", "/projects", "/blogs"].map((r) => ({
    url: `${CONFIG.SITE.url}${r}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts, ...projects];
}
