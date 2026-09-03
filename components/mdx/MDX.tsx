import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
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
import { remarkHeading } from "fumadocs-core/mdx-plugins";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const components: MDXRemoteProps["components"] = {
  h1: (props: React.ComponentProps<"h1">) => (
    <Heading
      as="h1"
      className="text-primary text-3xl font-extrabold mb-6"
      {...props}
    />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <Heading
      as="h2"
      className="text-primary text-2xl font-semibold mb-4"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <Heading
      as="h3"
      className="text-primary text-xl font-semibold mb-3"
      {...props}
    />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <Heading
      as="h4"
      className="text-primary text-base font-semibold mb-3"
      {...props}
    />
  ),
  h5: (props: React.ComponentProps<"h5">) => (
    <Heading
      as="h5"
      className="text-primary text-base font-semibold mb-2"
      {...props}
    />
  ),
  h6: (props: React.ComponentProps<"h6">) => (
    <Heading
      as="h6"
      className="text-primary text-sm font-semibold mb-2"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="md:text-base text-secondary-foreground/80 mb-6 text-wrap tracking-wide wrap-normal"
      {...props}
    >
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
      className="rounded-xl border bg-gray-300 dark:bg-gray-800 dark:text-secondary-foreground p-4 mb-6 w-full"
      {...props}
    />
  ),
  code: (props) => (
    <Code
      className="overflow-x-scroll py-1 px-2 bg-gray-300 dark:bg-gray-800 dark:text-secondary-foreground rounded-xl"
      {...props}
    />
  ),
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: (props) => (
    <TableHead {...props}>
      <p className="text-secondary-foreground font-semibold md:text-base">
        {props.children}
      </p>
    </TableHead>
  ),
  td: (props) => (
    <TableCell {...props}>
      <p className="text-secondary-foreground/80 md:text-base">
        {props.children}
      </p>
    </TableCell>
  ),
  a: (props) => (
    <Link
      {...props}
      className="hover:text-primary hover:underline underline-offset-4"
    />
  ),
  ul: (props) => <ul className="list-disc list-inside mb-6" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-6" {...props} />,
  li: (props) => (
    <li className="text-secondary-foreground/80 mb-2" {...props}>
      <span className="md:text-base wrap-break-word text-wrap tracking-wide">
        {props.children}
      </span>
    </li>
  ),
};

const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkHeading],
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: "nofollow noopener" }],
      rehypeSlug,
    ],
  },
};

const MDX = ({ code }: { code: string }) => {
  return <MDXRemote source={code} components={components} options={options} />;
};

export default MDX;
