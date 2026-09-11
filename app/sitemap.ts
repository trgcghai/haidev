import { CONFIG, ROUTES } from "@/constants/config";
import { getBlogPosts, getProjectPosts } from "@/lib/documents";
import { toolRegistries } from "@/registry/tools";
import type { MetadataRoute } from "next";

export const revalidate = false;
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const postMaps = posts.map((post) => ({
    url: `${CONFIG.SITE.url}/${ROUTES.BLOGS.slug}/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }));

  const projects = await getProjectPosts();
  const projectMaps = projects.map((project) => ({
    url: `${CONFIG.SITE.url}/${ROUTES.PROJECTS.slug}/${project.slug}`,
    lastModified: new Date(project.metadata.updatedAt).toISOString(),
  }));

  const tools = toolRegistries.map((tool) => ({
    url: `${CONFIG.SITE.url}/${ROUTES.TOOLS.slug}/${tool.slug}`,
    lastModified: new Date(tool.updatedAt).toISOString(),
  }));

  const routes = CONFIG.SITE.routes.map((r) => ({
    url: `${CONFIG.SITE.url}/${r.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...postMaps, ...projectMaps, ...tools];
}
