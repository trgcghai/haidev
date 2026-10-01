import { CONFIG } from "@/constants/config";
import { FileUserIcon, Link2, Mails, MapPin } from "lucide-react";

interface AboutMeItem {
  id: number;
  icon: React.ReactNode;
  text: string;
  canCopy: boolean;
  isLink: boolean;
  href?: string; // Optional property for link href
}

interface FindMeOnlineItem {
  id: number;
  icon: React.ReactNode;
  text: string;
  url: string;
  isExternal: boolean;
}

const aboutMeData: AboutMeItem[] = [
  {
    id: 1,
    icon: <MapPin className="size-4" />,
    text: CONFIG.USER.address,
    canCopy: false,
    isLink: false,
  },
  {
    id: 2,
    icon: <Mails className="size-4" />,
    text: CONFIG.USER.email,
    canCopy: true,
    isLink: false,
  },
  {
    id: 3,
    icon: <Link2 className="size-4" />,
    text: CONFIG.USER.socials.website.handle,
    canCopy: false,
    isLink: true,
    href: CONFIG.SITE.url,
  },
  {
    id: 4,
    icon: <FileUserIcon className="size-4" />,
    text: "Resume / CV",
    canCopy: false,
    isLink: true,
    href: "/assets/resume-en.pdf",
  },
];

const findMeOnlineData: FindMeOnlineItem[] = [
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.274 0H1.728C.692 0 0 .685 0 1.715v20.569C0 23.316.864 24 1.727 24h20.546C23.31 24 24 23.315 24 22.285V1.716C24.001.684 23.31 0 22.274 0M7.08 20.4H3.454V8.915h3.625zM5.352 7.371c-1.209 0-2.07-.856-2.07-2.056s.863-2.059 2.07-2.059c1.21 0 2.073.859 2.073 2.059S6.388 7.37 5.352 7.37M20.548 20.4h-3.626v-5.485c0-1.371 0-3.087-1.9-3.087-1.898 0-2.073 1.372-2.073 2.916V20.4H9.325V8.915h3.454v1.541c.69-1.2 2.073-1.885 3.453-1.885 3.627 0 4.316 2.4 4.316 5.485z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/truong-cong-hai/",
    isExternal: true,
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    text: "Youtube",
    url: "https://www.youtube.com/@haitruongcong916",
    isExternal: true,
  },
  {
    id: 7,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 0C5.37 0 0 5.372 0 11.997 0 17.3 3.438 21.795 8.205 23.38c.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.609-4.042-1.609C4.422 17.77 3.633 17.4 3.633 17.4c-1.087-.744.084-.73.084-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.417-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.929 0-1.31.465-2.38 1.235-3.219-.135-.303-.54-1.523.105-3.175 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.006 2.04.138 3 .404 2.28-1.551 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.608-2.805 5.623-5.475 5.918.42.36.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.284 0 .315.21.69.825.57C20.565 21.79 24 17.291 24 11.997 24 5.372 18.627 0 12 0"
          fill="currentColor"
        ></path>
      </svg>
    ),
    text: "Github",
    url: "https://github.com/trgcghai",
    isExternal: true,
  },
];

const workExperienceDescriptions = [
  {
    company: "Apps Cyclone",
    vi: `- Triển khai landing page responsive từ Figma sang code bằng HTML semantic và một ứng dụng React với các form được xác thực và trạng thái được lưu trữ.
- Xây dựng xác thực ví cho một dApp trên Sepolia sử dụng wagmi/viem và SIWE: tự động đăng nhập, phiên làm việc hết hạn, các tuyến đường được bảo vệ và xử lý đúng các thay đổi về tài khoản/chuỗi.
- Triển khai chức năng chuyển tiền với ước lượng gas và kiểm tra đủ số dư, mint NFT chống lại các hợp đồng với mô phỏng và phân tích revert, và tạo token ERC-20 thông qua hợp đồng factory.`,
    en: `- Delivered a Figma-to-code responsive landing page in semantic HTML and a React app with validated forms and persisted state.
- Built wallet auth for a dApp on Sepolia using wagmi/viem and SIWE: auto sign-in, expiring sessions, protected routes, and correct handling of account/chain changes.
- Implemented transfer with gas estimation and insufficient-funds guards, NFT minting against contracts with simulation and revert parsing, and ERC-20 token creation through a factory contract.`,
  },
  {
    company: "TMA Solutions",
    vi: `- Nâng cao RBAC của hệ thống, sử dụng ma trận quyền để phát hiện khả năng thực hiện các hành động thay vì chỉ dựa vào vai trò.
- Triển khai tính năng Meeting Notes, sử dụng API AI nội bộ để tạo tóm tắt và bản ghi từ tệp âm thanh, xử lý trạng thái tải và lỗi.
- Triển khai nhật ký kiểm toán lịch sử để tăng khả năng truy xuất và trách nhiệm cho các tác vụ (tham khảo lịch sử tác vụ Jira) bằng cách sử dụng middleware trên các điểm cuối liên quan.
- Xây dựng tính năng tìm kiếm toàn cầu với tìm kiếm toàn văn và độ trễ thấp với thời gian phản hồi đã ghi ~ 100ms bằng cách sử dụng chỉ mục văn bản đồng thời đảm bảo quyền truy cập vào các tài nguyên.`,
    en: `- Enhanced RBAC of the system, using permission matrix to detect the ability to perform the actions instead of depending solely on roles.
- Implemented Meeting Notes features, using interal AI API to generate summary and transcript from an audio file, handle loading and error state.
- Implemented history audit log to enhance tracability and accountability for tasks (reference Jira task history) by using a middleware on the related endpoints.
- Built a global search feature with full-text search and low latency with recorded response time ~ 100ms using text index while ensuring the permission to access to the resources.`,
  },
  {
    company: "Industrial University of Ho Chi Minh City",
    vi: `- Triển khai xác thực và ủy quyền cho CMS nội bộ, với JWT Token và RBAC.
- Tích hợp cloudinary để quản lý các tệp media sử dụng bên trong trang web.
- Tích hợp i18n cho nội địa hóa, hỗ trợ cả tiếng Anh và tiếng Việt cho cả nội dung tĩnh và nội dung động.`,
    en: `- Implemented authentication and authorization for an internal CMS, with JWT Token and RBAC.
- Integrated cloudinary to manage media files using inside the site.
- Integrated i18n for internalization, support English and Vietnamese for both static content and dynamic content.`,
  },
];

export { aboutMeData, findMeOnlineData, workExperienceDescriptions };
