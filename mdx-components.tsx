import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading } from "@/components/ui/heading";
import { Code } from "@/components/ui/typography";
import Link from "next/link";

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <Heading as="h1" className="text-3xl font-extrabold mb-6" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <Heading as="h2" className="text-2xl font-semibold mb-4" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <Heading as="h3" className="text-xl font-semibold mb-3" {...props} />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <Heading as="h4" className="text-lg font-semibold mb-3" {...props} />
  ),
  h5: (props: React.ComponentProps<"h5">) => (
    <Heading as="h5" className="text-base font-semibold mb-2" {...props} />
  ),
  h6: (props: React.ComponentProps<"h6">) => (
    <Heading as="h6" className="text-sm font-semibold mb-2" {...props} />
  ),
  p: (props) => (
    <p className="md:text-base text-secondary-foreground mb-2" {...props}>
      {props.children}
    </p>
  ),
  img: (props) => {
    const [alt, w, h] = props.alt.split("&");
    return (
      <Image
        width={w}
        height={h}
        className="w-full mb-4 object-cover"
        {...(props as ImageProps)}
        src={props.src}
        alt={alt}
        loading="eager"
      />
    );
  },
  pre: (props) => (
    <pre
      className="rounded-xl border bg-gray-300 dark:bg-gray-600 dark:text-secondary-foreground p-4 mb-2"
      {...props}
    />
  ),
  code: Code,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  a: (props) => (
    <Link
      {...props}
      className="hover:text-primary hover:underline underline-offset-2"
    />
  ),
  ul: (props) => <ul className="list-disc list-inside mb-2" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-2" {...props} />,
  li: (props) => <li className="text-secondary-foreground mb-1" {...props} />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
