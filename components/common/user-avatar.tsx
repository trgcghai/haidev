"use client";
import { CONFIG } from "@/constants/config";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserAvatar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="size-[256px] aspect-square hidden md:block rounded-xs bg-gray-200 dark:bg-gray-700 animate-pulse text-center dark:ring-0 ring-1 ring-primary">
          Alt Image for {CONFIG.USER.displayName}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        src={CONFIG.USER.avatar}
        alt={`Avatar of ${CONFIG.USER.displayName}`}
        width={256}
        height={256}
        className={cn(
          "rounded-xs object-cover size-[256px] h-auto w-auto aspect-square hidden md:block",
          theme == "light" && "ring-1 ring-primary",
        )}
      />
    </div>
  );
};

export default UserAvatar;
