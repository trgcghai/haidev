import { CONFIG, ROUTES } from "@/constants/config";
import { getBlogPosts, getProjectPosts } from "@/lib/documents";
import { toolRegistries } from "@/registry/tools";
import type { MetadataRoute } from "next";

export const revalidate = false;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts().map((post) => ({
    url: `${CONFIG.SITE.url}/${ROUTES.BLOGS.slug}/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }));

  const projects = getProjectPosts().map((project) => ({
    url: `${CONFIG.SITE.url}/${ROUTES.PROJECTS.slug}/${project.slug}`,
    lastModified: new Date(project.metadata.updatedAt).toISOString(),
  }));

  const tools = toolRegistries.map((tool) => ({
    url: `${CONFIG.SITE.url}/${ROUTES.TOOLS.slug}/${tool.slug}`,
    lastModified: new Date(tool.updatedAt).toISOString(),
  }));

  const routes = CONFIG.SITE.routes.map((r) => ({
    url: `${CONFIG.SITE.url}${r}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts, ...projects, ...tools];
}
