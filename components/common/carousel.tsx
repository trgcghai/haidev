/* eslint-disable @next/next/no-img-element */
import {
  AppleCarouselContent,
  AppleCarouselControls,
  AppleCarouselItem,
  AppleCarouselPlayButton,
  AppleCarouselRoot,
  AppleCarouselTab,
  AppleCarouselTabList,
} from "@/components/chanhdai/apple-carousel";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  items?: {
    title: string;
    image: string;
    href: string;
  }[];
}

const Carousel = ({ items = ITEMS }: Props) => {
  return (
    <AppleCarouselRoot duration={3600}>
      <AppleCarouselContent>
        {items.map((item) => (
          <AppleCarouselItem
            key={item.image}
            tabIndex={-1}
            className="@max-3xl:h-96"
          >
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block size-full rounded-[inherit] select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{item.title}</p>
              </TooltipContent>
            </Tooltip>
          </AppleCarouselItem>
        ))}
      </AppleCarouselContent>

      <AppleCarouselControls>
        <AppleCarouselTabList aria-label="Places in Viet Nam">
          {items.map((item) => (
            <AppleCarouselTab key={item.image}>{item.title}</AppleCarouselTab>
          ))}
        </AppleCarouselTabList>
        <AppleCarouselPlayButton />
      </AppleCarouselControls>
    </AppleCarouselRoot>
  );
};

export default Carousel;

const ITEMS = [
  {
    title: "Quang Ninh",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/1.webp",
    href: "https://en.wikipedia.org/wiki/Quảng_Ninh_province",
  },
  {
    title: "An Giang",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/2.webp?v=2",
    href: "https://en.wikipedia.org/wiki/An_Giang_province",
  },
  {
    title: "Ninh Binh",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/3.webp",
    href: "https://en.wikipedia.org/wiki/Ninh_Bình_province",
  },
  {
    title: "Hue",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/4.webp",
    href: "https://en.wikipedia.org/wiki/Huế",
  },
  {
    title: "Ninh Binh",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/5.webp",
    href: "https://en.wikipedia.org/wiki/Ninh_Bình_province",
  },
  {
    title: "Ho Chi Minh City",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/6.webp",
    href: "https://en.wikipedia.org/wiki/Ho_Chi_Minh_City",
  },
  {
    title: "Da Nang",
    image:
      "https://assets.chanhdai.com/registry/images/components/apple-carousel/7.webp",
    href: "https://en.wikipedia.org/wiki/Da_Nang",
  },
];
