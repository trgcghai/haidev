import type { MDXComponents } from "mdx/types";
import { components as sourceComponents } from "@/components/mdx/MDX";

export function useMDXComponents(): MDXComponents {
  return sourceComponents as MDXComponents;
}
