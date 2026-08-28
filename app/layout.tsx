import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import LineNavProvider from "@/components/providers/line-nav-provider";
import { CONFIG } from "@/constants/config";
import { JsonLdScript } from "@/components/providers/JsonLdScript";
import { websiteJsonLd } from "@/constants/json-ld";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: CONFIG.USER.displayName,
  description: CONFIG.USER.description,
  applicationName: CONFIG.SITE.title,
  metadataBase: new URL(CONFIG.SITE.url!),
  openGraph: {
    title: CONFIG.SITE.title,
    description: CONFIG.USER.description,
    url: CONFIG.SITE.url,
    authors: CONFIG.SITE.authors.map((author) => author.name),
    countryName: CONFIG.USER.address,
    firstName: CONFIG.USER.firstName,
    lastName: CONFIG.USER.lastName,
    username: CONFIG.USER.username,
    siteName: CONFIG.SITE.name,
    locale: CONFIG.USER.locale,
    publishedTime: new Date().toISOString(),
    images: [
      new URL(CONFIG.USER.avatar, CONFIG.SITE.url).toString(),
      new URL(CONFIG.USER.banner, CONFIG.SITE.url).toString(),
    ],
  },
  keywords: CONFIG.USER.keywords,
  alternates: CONFIG.SITE.alternates,
  icons: CONFIG.SITE.icons,
  authors: CONFIG.SITE.authors,
  creator: CONFIG.SITE.creator,
  publisher: CONFIG.SITE.publisher,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body
        className="
          relative flex min-h-dvh flex-col
          bg-background px-4 pb-8
          font-mono text-foreground antialiased
          bg-[linear-gradient(135deg,color-mix(in_oklch,var(--color-border)_var(--alpha),transparent)_25%,transparent_25%,transparent_50%,color-mix(in_oklch,var(--color-border)_var(--alpha),transparent)_50%,color-mix(in_oklch,var(--color-border)_var(--alpha),transparent)_75%,transparent_75%)]
          bg-size-[40px_40px]
          [--alpha:24%]
          dark:[--alpha:12%]
          animate-stripes
        "
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />

            <div className="container max-w-7xl mt-8 space-y-16 mx-auto border rounded-sm p-4 bg-neutral-50/40 dark:bg-neutral-800/40">
              {children}

              <Footer />
            </div>
          </TooltipProvider>
          <div className="fixed top-1/2 left-0 z-50 -translate-y-1/2 p-2 hidden md:block">
            <LineNavProvider />
          </div>
        </ThemeProvider>
      </body>

      <JsonLdScript data={websiteJsonLd} />
    </html>
  );
}
