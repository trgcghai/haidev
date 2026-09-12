"use client";

import { Locale, localeOptions, locales } from "@/constants/dictionary";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  triggerClassname = "",
  contentClassname = "",
}: {
  triggerClassname?: string;
  contentClassname?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] as Locale;

  function changeLanguage(locale: Locale) {
    const cloneSegments = [...segments];

    if (locales.includes(currentLocale)) {
      cloneSegments[1] = locale;
    } else {
      cloneSegments.splice(1, 0, locale);
    }

    const newPathname = cloneSegments.join("/");

    document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;

    router.push(newPathname);
  }

  return (
    <Select onValueChange={(value) => changeLanguage(value as Locale)}>
      <SelectTrigger className={cn("capitalize min-w-28", triggerClassname)}>
        <SelectValue
          placeholder={
            localeOptions.find((o) => o.value === currentLocale)!.label
          }
        />
      </SelectTrigger>
      <SelectContent className={cn("min-w-fit", contentClassname)}>
        {localeOptions.map((s) => (
          <SelectItem key={s.value} value={s.value} className="capitalize">
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
