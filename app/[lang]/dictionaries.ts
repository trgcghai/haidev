import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

// Use for pages
export const getDictionary = async (locale: Locale) => dictionaries[locale]();

// Use for components
export const getDictionaryOrDefault = async (locale: string) => {
  if (hasLocale(locale)) {
    return await getDictionary(locale);
  }
  return await getDictionary("en");
};
