import "server-only";
import { lang } from "next/root-params";
import { Locale } from "@/constants/dictionary";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
};
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

export const getSafeDictionary = async () => {
  const l = await lang();
  const dict = await getDictionaryOrDefault(l);

  return dict;
};
