import { Button } from "@/components/ui/button";
import { Home, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return (
    <div className="relative h-[330px] md:h-[500px]">
      <h1 className="text-4xl font-bold text-center mt-8 hidden sm:block">
        404 - Page Not Found
      </h1>
      <h1 className="text-4xl font-bold text-center mt-8 sm:hidden flex flex-col items-center justify-center gap-2">
        <span>404</span>
        <span>Page Not Found</span>
      </h1>
      <p className="text-center mt-4 line-clamp-4 max-w-xl mx-auto">
        The page you are looking for does not exist. If you believe this is an
        error, please contact me for assistance.
      </p>
      <div className="flex items-center justify-center gap-4 mt-4 flex-col md:flex-row">
        <Button variant="outline">
          <Link href="/" className="hover:text-primary flex items-center gap-2">
          <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="outline">
          <Link href="/#contact" className="hover:text-primary flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact me
          </Link>
        </Button>
      </div>
    </div>
  );
}
