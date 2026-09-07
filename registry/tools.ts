import { Tool } from "@/types/tool";
import { KeySquareIcon, ShellIcon } from "lucide-react";

export const toolRegistries: Tool[] = [
  {
    name: "String comparator",
    description: "Compare two strings and find the differences between them.",
    slug: "string-comparator",
    category: "String",
    icon: ShellIcon,
    keywords: [
      "string",
      "comparator",
      "diff",
      "compare",
      "string comparison",
      "string diff",
      "string compare",
      "string comparison tool",
    ],
    createdAt: "2026-09-07",
    updatedAt: "2026-09-07",
  },
  {
    name: "Password generator",
    description:
      "Generate strong and secure passwords with ease using our password generator tool.",
    slug: "password-generator",
    category: "General",
    keywords: [
      "password",
      "generator",
      "strong password",
      "secure password",
      "password generator tool",
      "random password generator",
    ],
    icon: KeySquareIcon,
    createdAt: "2026-09-07",
    updatedAt: "2026-09-07",
  },
];
