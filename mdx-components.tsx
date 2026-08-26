import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: (props) => (
    <h1 className="text-primary text-2xl" {...props}>
      # {props.children}
    </h1>
  ),
  h2: (props) => (
    <h1 className="text-primary text-2xl" {...props}>
      # {props.children}
    </h1>
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
      alt={props.alt}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
