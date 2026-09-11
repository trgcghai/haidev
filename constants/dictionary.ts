export const locales = ["en", "vi"] as const;

export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const localeOptions: { value: Locale; label: string }[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "vi",
    label: "Tiếng Việt",
  },
];
