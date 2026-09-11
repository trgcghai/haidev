import { ModeToggler } from "@/components/common/mode-toggler";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { AnimationToggle } from "@/components/common/animation-toggle";
import Image from "next/image";
import { CONFIG } from "@/constants/config";
import { Menu } from "lucide-react";
import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { LanguageSwitcher } from "@/components/common/language-switcher";

const Header = async () => {
  const dict = await getSafeDictionary();

  return (
    <div className="container max-w-7xl mt-8 mx-auto border rounded-sm px-4 py-2 flex items-center justify-between bg-neutral-50/40 dark:bg-neutral-800/40">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image
          src="/logo/svg/logo-empty-black.svg"
          alt="Logo"
          width={50}
          height={50}
          className="aspect-square"
        />
      </Link>

      <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
        <div className="space-x-4">
          {CONFIG.SITE.routes.map((r) => (
            <Button variant="ghost" size="default" key={r.slug}>
              <Link href={r.url} className="hover:text-primary text-sm">
                {dict.header[r.slug as keyof typeof dict.header]}
              </Link>
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="mx-4 h-6" />

        <LanguageSwitcher />
        <ModeToggler system={false} />
        <AnimationToggle />
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <ModeToggler system={false} />
        <AnimationToggle />

        <Sheet>
          <SheetTrigger
            render={
              <Button
                data-slot="sheet-trigger"
                variant="outline"
                size="icon"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4 space-y-4">
              {CONFIG.SITE.routes.map((r) => (
                <SheetClose
                  key={r.slug}
                  render={
                    <Button
                      variant="ghost"
                      size="default"
                      className="justify-start"
                    >
                      <Link href={r.url} className="hover:text-primary text-sm">
                        {dict.header[r.slug as keyof typeof dict.header]}
                      </Link>
                    </Button>
                  }
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
