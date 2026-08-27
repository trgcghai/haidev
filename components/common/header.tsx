"use client";

import { ModeToggler } from "@/components/common/mode-toggler";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ScrambleIn, {
  ScrambleInHandle,
} from "@/components/fancy/text/scramble-in";
import { useRef } from "react";

const Header = () => {
  const ref = useRef<ScrambleInHandle>(null);

  return (
    <div
      className="container max-w-7xl mt-8 mx-auto border rounded-sm px-4 py-2 flex items-center justify-end md:justify-between"
      onMouseEnter={() => ref.current?.start()}
    >
      <div className="hidden md:block">
        <Link href="/">
          <ScrambleIn
            text={"Truong Cong Hai"}
            scrambleSpeed={40}
            scrambledLetterCount={5}
            autoStart={true}
            ref={ref}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-2 flex-1">
        <div className="space-x-4">
          <Button variant="ghost" size="sm">
            <Link href="/" className="hover:text-primary">
              Portfolio
            </Link>
          </Button>

          <Button variant="ghost" size="sm">
            <Link href="/blogs" className="hover:text-primary">
              Blogs
            </Link>
          </Button>

          <Button variant="ghost" size="sm">
            <Link href="/projects" className="hover:text-primary">
              Projects
            </Link>
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-4 hidden md:block" />

        <ModeToggler system={false} />
      </div>
    </div>
  );
};

export default Header;
