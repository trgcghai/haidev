import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import { Doc, DocMetadata } from "@/types/document";

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as DocMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

/**
 * Reads MDX docs from `dir`, grouping them by their immediate subfolder.
 * The subfolder name is the doc's category (e.g. `content/components/*.mdx`
 * yields docs with `category: "components"`), so category is derived from the
 * file location rather than declared in frontmatter. Files placed directly in
 * `dir` (e.g. shared `props.ts`) are ignored — only category folders are read.
 */
function getMDXData(dir: string) {
  const categoryDirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  return categoryDirs.flatMap((categoryDir) => {
    const category = categoryDir.name;
    const categoryPath = path.join(dir, category);

    return getMDXFiles(categoryPath).map<Doc>((file) => {
      const { metadata, content } = readMDXFile(path.join(categoryPath, file));

      const slug = path.basename(file, path.extname(file));

      return {
        metadata: { ...metadata, category },
        slug,
        content,
      };
    });
  });
}

export const getAllDocs = cache(() => {
  return getMDXData(path.join(process.cwd(), "features")).sort((a, b) => {
    if (a.metadata.pinned && !b.metadata.pinned) return -1;
    if (!a.metadata.pinned && b.metadata.pinned) return 1;

    return (
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime()
    );
  });
});

export function getDocBySlug(slug: string) {
  return getAllDocs().find((doc) => doc.slug === slug);
}

export function getDocsByCategory(category: string) {
  return getAllDocs().filter((doc) => doc.metadata?.category === category);
}

/** Categories derived from the features' content subfolder. */
export const BLOGS_CATEGORY = "blogs";
export const PROJECTS_CATEGORY = "projects";

/** Blog posts — docs under the `blog/` content folder. */
export function getBlogPosts() {
  return getDocsByCategory(BLOGS_CATEGORY);
}

/** Project docs — docs under the `projects/` content folder. */
export function getProjectPosts() {
  return getDocsByCategory(PROJECTS_CATEGORY);
}

export function getFeaturedProjects() {
  return getProjectPosts().filter((doc) => doc.metadata.featured);
}
