import "server-only";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export const getDictionaryOrDefault = async (locale: string) => {
  if (hasLocale(locale)) {
    return await getDictionary(locale);
  }
  return await getDictionary("en");
};

export const getDictionaryOrNotFound = async (locale: string) => {
  if (hasLocale(locale)) {
    return await getDictionary(locale);
  }
  return notFound();
};

export const getDict = async () => {
  const l = await lang();
  const dict = await getDictionaryOrDefault(l);

  return dict;
};
