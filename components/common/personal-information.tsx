import { getDict } from "@/app/[lang]/dictionaries";
import { CopyButton } from "@/components/common/copy-button";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import { aboutMeData, findMeOnlineData } from "@/constants/static";
import Link from "next/link";

const PersonalInformation = async () => {
  const dict = await getDict();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
      <div className="space-y-4">
        <h2 id="about-me">
          <LetterSwapForward
            label={`# ${dict.root.aboutMeHeading}`}
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        {aboutMeData.map((item) => (
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
              <Link
                href={item.href!}
                target={item.id == 4 ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
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
        ))}
      </div>

      <div className="space-y-4">
        <h2 id="find-me-online">
          <LetterSwapForward
            label={`# ${dict.root.findMeOnlineHeading}`}
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </h2>

        {findMeOnlineData.map((item) => (
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
        ))}
      </div>
    </section>
  );
};

export default PersonalInformation;
