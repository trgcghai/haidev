import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { Button } from "@/components/ui/button";
import { Home, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default async function NotFound() {
  const dict = await getSafeDictionary();

  return (
    <div className="relative h-[330px] md:h-[500px]">
      <h1 className="text-4xl font-bold text-center mt-8 hidden sm:block">
        {dict.notFound.desktopTitle}
      </h1>
      <h1 className="text-4xl font-bold text-center mt-8 sm:hidden flex flex-col items-center justify-center gap-2">
        <span>404</span>
        <span>{dict.notFound.title}</span>
      </h1>
      <p className="text-center mt-4 line-clamp-4 max-w-xl mx-auto">
        {dict.notFound.description}
      </p>
      <div className="flex items-center justify-center gap-4 mt-4 flex-col md:flex-row">
        <Button variant="outline">
          <Link href="/" className="hover:text-primary flex items-center gap-2">
            <Home className="h-4 w-4" />
            {dict.notFound.home}
          </Link>
        </Button>
        <Button variant="outline">
          <Link
            href="/#contact"
            className="hover:text-primary flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {dict.notFound.contact}
          </Link>
        </Button>
      </div>
    </div>
  );
}
