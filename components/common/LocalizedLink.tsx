"use client";

import Link, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { type ReactNode, useMemo } from "react";

type LocalizedLinkProps = Omit<LinkProps, "href"> & {
  href: LinkProps["href"];
  children: ReactNode;
  className?: string;
};

function isSpecialUrl(value: string) {
  return (
    value.startsWith("#") ||
    value.startsWith("?") ||
    value.startsWith("//") ||
    /^[a-z][a-z\d+\-.]*:/i.test(value)
  );
}

function localizePath(value: string, lang: string) {
  if (!value.startsWith("/") || isSpecialUrl(value)) {
    return value;
  }

  // "/" -> "/en"
  if (value === "/") {
    return `/${lang}`;
  }

  // Already localized:
  // "/en"
  // "/en/projects"
  if (value === `/${lang}` || value.startsWith(`/${lang}/`)) {
    return value;
  }

  return `/${lang}${value}`;
}

function localizeHref(
  href: LinkProps["href"],
  lang: string,
): LinkProps["href"] {
  if (typeof href === "string") {
    return localizePath(href, lang);
  }

  return {
    ...href,
    pathname: localizePath(href.pathname || "/", lang),
  };
}

export function LocalizedLink({
  href,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams<{ lang: string }>();

  const lang = params.lang;

  const localizedHref = useMemo(() => localizeHref(href, lang), [href, lang]);

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
