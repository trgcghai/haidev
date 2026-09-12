import { clsx, type ClassValue } from "clsx";
import { DateArg, format } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatDate(date: DateArg<Date> & {}, lang: string) {
  return format(date, "PPP", {
    locale: lang === "vi" ? vi : enUS,
  });
}
