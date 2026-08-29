import { ModeToggler } from "@/components/common/mode-toggler";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AnimationToggle } from "@/components/common/animation-toggle";
import Image from "next/image";

const Header = () => {
  return (
    <div className="container max-w-7xl mt-8 mx-auto border rounded-sm px-4 py-2 flex items-center justify-end md:justify-between bg-neutral-50/40 dark:bg-neutral-800/40">
      <div className="hidden md:block">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/svg/logo-empty-black.svg"
            alt="Logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-2 flex-1">
        <div className="space-x-4">
          <Button variant="ghost" size="default">
            <Link href="/" className="hover:text-primary text-sm">
              Portfolio
            </Link>
          </Button>

          <Button variant="ghost" size="default">
            <Link href="/blogs" className="hover:text-primary text-sm">
              Blogs
            </Link>
          </Button>

          <Button variant="ghost" size="default">
            <Link href="/projects" className="hover:text-primary text-sm">
              Projects
            </Link>
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-4 hidden md:block" />

        <ModeToggler system={false} />

        <AnimationToggle />
      </div>
    </div>
  );
};

export default Header;
