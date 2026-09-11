import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, locales } from "@/constants/dictionary";

function getLocaleFromCookie(request: NextRequest) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value;

  if (locale && locales.includes(locale as (typeof locales)[number])) {
    return locale;
  }

  return null;
}

function getLocale(request: NextRequest) {
  const languages = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language")!,
    },
  }).languages();

  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const cookieLocale = getLocaleFromCookie(request);

  if (cookieLocale && cookieLocale !== locale) {
    // Redirect to the locale from the cookie if it exists and is different from the detected locale
    request.nextUrl.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Redirect if there is no locale in the pathname and the detected locale is different from the default locale
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // e.g. /products -> /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - images, public (static asset paths)
     * - any path with a file extension (public folder assets)
     */
    "/((?!api|_next|images|public|.*\\..*).*)",
  ],
};
