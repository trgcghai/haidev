import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "vi"];

function getLocale(request: NextRequest) {
  const languages = new Negotiator({
    headers: {
      "accept-language":
        request.headers.get("accept-language") || "en-US,en;q=0.5",
    },
  }).languages();

  return match(languages, locales, "en");
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /en/products
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
