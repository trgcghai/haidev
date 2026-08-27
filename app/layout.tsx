import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import LineNavProvider from "@/components/providers/line-nav-provider";

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
  title: "Portfolio - Công Hải",
  description:
    "Portfolio of Công Hải, a passionate software engineer specializing in full-stack web development. Explore my projects, skills, and experience in building modern web applications.",
  applicationName: "Công Hải Portfolio",
  keywords: [
    "Công Hải",
    "Software Engineer",
    "Portfolio",
    "Full-Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Frontend Development",
    "Backend Development",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "GitHub",
    "Projects",
  ],
  alternates: {
    canonical: "https://haidev.id.vn",
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "any",
      },
      {
        url: "/favicon16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "/favicon180.png",
        type: "image/png",
        sizes: "180x180",
      },
      {
        url: "/favicon192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/favicon512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
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

            <div className="container max-w-7xl mt-8 space-y-16 mx-auto border rounded-sm p-4">
              {children}

              <Footer />
            </div>
          </TooltipProvider>
          <div className="fixed top-1/2 left-0 z-50 -translate-y-1/2 p-2 hidden md:block">
            <LineNavProvider />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
