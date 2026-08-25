import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
  title: "Cong Hai - Software Engineer",
  description:
    "Personal website and portfolio of Cong Hai, a software engineer, full-stack developer.",
  applicationName: "Cong Hai Portfolio",
  keywords: [
    "Cong Hai",
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
      <body className="relative flex min-h-dvh flex-col bg-background px-4 pb-8 font-mono text-foreground antialiased bg-[linear-gradient(135deg,color-mix(in_oklch,var(--color-border)_var(--alpha),transparent)_25%,transparent_25%,transparent_50%,color-mix(in_oklch,var(--color-border)_var(--alpha),transparent)_50%,color-mix(in_oklch,var(--color-border)_var(--alpha),transparent)_75%,transparent_75%,transparent)] bg-size-[40px_40px] [--alpha:24%] dark:[--alpha:12%]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <div className="fixed top-1/2 left-0 z-50 -translate-y-1/2 p-2 hidden md:block">
            <LineNavProvider />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
