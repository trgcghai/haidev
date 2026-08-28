import { ReactNode } from "react";

export type TOCItemType = {
  title: ReactNode;
  url: string;
  depth: number;
  /** [remark-steps] the step number */
  _step?: number;
};
