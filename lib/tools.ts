import { registries } from "@/registry/tools";
import { lang } from "next/root-params";
import { cache } from "react";

export const getAllToolsIgnoreLang = cache(() => {
  return Object.values(registries)
    .flat()
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
});

export const getAllTools = cache(async () => {
  const rootlang = await lang();
  return registries[rootlang] ?? [];
});

export const getToolBySlug = async (slug: string) => {
  return getAllTools().then((tools) =>
    tools.find((tool) => tool.slug === slug),
  );
};

export const getToolsByCategory = async (category: string) => {
  return getAllTools().then((tools) =>
    tools.filter((tool) => tool.category === category),
  );
};

export const getToolsByLang = (lang: string) => registries[lang] ?? [];

export const getViTools = () => registries["vi"];

export const getEnTools = () => registries["en"];
