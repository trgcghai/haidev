export type Tool = {
  name: string;
  description: string;
  slug: string;
  keywords?: string[];
  /**
   * Category of the tool. This can be used to group tools by their functionality or purpose.
   */
  category: string;
  /**
   * Icon component for the tool. This should be a React component that renders an SVG icon.
   */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /**
   * Post creation date as an ISO date string (e.g. YYYY-MM-DD). Used for sorting.
   */
  createdAt: string;
  /**
   * Last updated date as an ISO date string (e.g. YYYY-MM-DD).
   */
  updatedAt: string;
};
