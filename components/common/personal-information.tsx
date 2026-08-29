import { CopyButton } from "@/components/common/copy-button";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import { CONFIG } from "@/constants/config";
import { Link2, Mails, MapPin } from "lucide-react";
import Link from "next/link";

interface AboutMeItem {
  id: number;
  icon: React.ReactNode;
  text: string;
  canCopy: boolean;
  isLink: boolean;
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
    text: CONFIG.USER.website!,
    canCopy: false,
    isLink: true,
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

const PersonalInformation = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="space-y-4">
        <h2 id="about-me">
          <LetterSwapForward
            label="# About me"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        {aboutMeData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 text-secondary-foreground group"
            >
              <div className="flex size-6 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                {item.icon}
              </div>

              {!item.isLink && (
                <p className="hover:text-primary cursor-default text-sm md:text-base">
                  {item.text}
                </p>
              )}

              {item.isLink && (
                <Link href="/" className="hover:text-primary">
                  <ComesInGoesOutUnderline
                    direction="left"
                    className="text-sm md:text-base"
                  >
                    {item.text}
                  </ComesInGoesOutUnderline>
                </Link>
              )}

              {item.canCopy && (
                <CopyButton
                  variant="outline"
                  text={item.text}
                  className="group-hover:opacity-100 opacity-0"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 id="find-me-online">
          <LetterSwapForward
            label="# Find me online"
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        {findMeOnlineData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 text-secondary-foreground"
            >
              <div className="flex size-6 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                {item.icon}
              </div>
              <Link
                href={item.url}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-primary"
              >
                <ComesInGoesOutUnderline
                  direction="left"
                  className="text-sm md:text-base"
                >
                  {item.text}
                </ComesInGoesOutUnderline>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PersonalInformation;
