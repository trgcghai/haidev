import { CONFIG, ROUTES } from "@/constants/config";
import { getBlogPosts, getProjectPosts } from "@/lib/documents";
import { getEnTools, getViTools } from "@/lib/tools";
import type { MetadataRoute } from "next";

export const revalidate = false;
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const viPosts = (await getBlogPosts("vi")).map((post) => ({
    url: `${CONFIG.SITE.url}/vi/${ROUTES.BLOGS.slug}/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }));

  const enPosts = (await getBlogPosts("en")).map((post) => ({
    url: `${CONFIG.SITE.url}/en/${ROUTES.BLOGS.slug}/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }));

  const viProjects = (await getProjectPosts("vi")).map((project) => ({
    url: `${CONFIG.SITE.url}/vi/${ROUTES.PROJECTS.slug}/${project.slug}`,
    lastModified: new Date(project.metadata.updatedAt).toISOString(),
  }));

  const enProjects = (await getProjectPosts("en")).map((project) => ({
    url: `${CONFIG.SITE.url}/en/${ROUTES.PROJECTS.slug}/${project.slug}`,
    lastModified: new Date(project.metadata.updatedAt).toISOString(),
  }));

  const viTools = getViTools().map((tool) => ({
    url: `${CONFIG.SITE.url}/vi/${ROUTES.TOOLS.slug}/${tool.slug}`,
    lastModified: new Date(tool.updatedAt).toISOString(),
  }));

  const enTools = getEnTools().map((tool) => ({
    url: `${CONFIG.SITE.url}/en/${ROUTES.TOOLS.slug}/${tool.slug}`,
    lastModified: new Date(tool.updatedAt).toISOString(),
  }));

  const viRoutes = CONFIG.SITE.routes.map((r) => ({
    url: `${CONFIG.SITE.url}/vi${r.url}`,
    lastModified: new Date().toISOString(),
  }));

  const enRoutes = CONFIG.SITE.routes.map((r) => ({
    url: `${CONFIG.SITE.url}/en${r.url}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...viRoutes,
    ...enRoutes,
    ...viPosts,
    ...enPosts,
    ...viProjects,
    ...enProjects,
    ...viTools,
    ...enTools,
  ];
}
