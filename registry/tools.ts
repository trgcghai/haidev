import { Tool } from "@/types/tool";
import { KeySquareIcon, QrCodeIcon, ShellIcon } from "lucide-react";

export const enRegistries: Tool[] = [
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
  {
    name: "QR code generator",
    description:
      "Create QR codes for URLs, text, and other data with our easy-to-use QR code generator.",
    slug: "qr-code-generator",
    category: "General",
    keywords: [
      "qr code",
      "generator",
      "qr code generator tool",
      "create qr code",
      "generate qr code",
      "qr code generator online",
    ],
    icon: QrCodeIcon,
    createdAt: "2026-09-09",
    updatedAt: "2026-09-09",
  },
];

export const viRegistries: Tool[] = [
  {
    name: "Công cụ so sánh chuỗi",
    description: "So sánh hai chuỗi văn bản và tìm ra sự khác biệt giữa chúng.",
    slug: "string-comparator",
    category: "Chuỗi",
    icon: ShellIcon,
    keywords: [
      "chuỗi",
      "so sánh",
      "diff",
      "so sánh chuỗi",
      "công cụ so sánh chuỗi",
    ],
    createdAt: "2026-09-07",
    updatedAt: "2026-09-07",
  },
  {
    name: "Công cụ tạo mật khẩu",
    description:
      "Dễ dàng tạo các mật khẩu mạnh và an toàn bằng công cụ tạo mật khẩu của chúng tôi.",
    slug: "password-generator",
    category: "Tổng hợp",
    keywords: [
      "mật khẩu",
      "tạo mật khẩu",
      "mật khẩu mạnh",
      "mật khẩu an toàn",
      "công cụ tạo mật khẩu",
      "tạo mật khẩu ngẫu nhiên",
    ],
    icon: KeySquareIcon,
    createdAt: "2026-09-07",
    updatedAt: "2026-09-07",
  },
  {
    name: "Công cụ tạo mã QR",
    description:
      "Tạo mã QR cho URL, văn bản và các dữ liệu khác bằng công cụ tạo mã QR dễ sử dụng của chúng tôi.",
    slug: "qr-code-generator",
    category: "Tổng hợp",
    keywords: [
      "mã QR",
      "tạo mã QR",
      "công cụ tạo mã QR",
      "tạo mã QR trực tuyến",
    ],
    icon: QrCodeIcon,
    createdAt: "2026-09-09",
    updatedAt: "2026-09-09",
  },
];

export const registries: Record<string, Tool[]> = {
  vi: viRegistries,
  en: enRegistries,
};
