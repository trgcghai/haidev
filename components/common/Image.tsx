"use client";
import { ImageOff } from "lucide-react";
import { default as NextImage } from "next/image";
import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  unoptimized?: boolean;
}

const Image = ({ src, alt, unoptimized = false }: ImageProps) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-500 rounded-xl">
        <ImageOff className="size-8 text-gray-400 dark:text-gray-200" />
      </div>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      className="size-full rounded-xl object-cover"
      fill
      sizes="auto"
      loading="eager"
      unoptimized={unoptimized}
      onError={() => setIsError(true)}
    />
  );
};

export default Image;
