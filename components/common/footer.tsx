import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import Link from "next/link";

const Footer = async () => {
  const dict = await getSafeDictionary();

  return (
    <footer className="grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-600 mt-40 border-t pt-4 md:text-left text-center">
      <div>
        {`${dict.footer.inspiredBy} `}
        <div className="gap-2 flex justify-center md:justify-start">
          <Link
            href="https://tiesen.id.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <ComesInGoesOutUnderline direction="left">
              @tiesen243
            </ComesInGoesOutUnderline>
          </Link>
          <Link
            href="https://chanhdai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <ComesInGoesOutUnderline direction="left">
              @chanhdai
            </ComesInGoesOutUnderline>
          </Link>
          <Link
            href="https://atuandev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <ComesInGoesOutUnderline direction="left">
              @nguyenphananhtuan
            </ComesInGoesOutUnderline>
          </Link>
        </div>
      </div>

      <div>
        {`${dict.footer.designedAndBuiltBy} `}
        <div className="gap-2 flex justify-center md:justify-start">
          <Link href="/" className="hover:text-primary">
            <ComesInGoesOutUnderline direction="left">
              @haidev
            </ComesInGoesOutUnderline>
          </Link>
        </div>
      </div>

      <div>
        {`${dict.footer.componentsAndAnimationsBy} `}
        <div className="gap-2 flex justify-center md:justify-start">
          <Link
            href="https://chanhdai.com/components"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <ComesInGoesOutUnderline direction="left">
              @chanhdai
            </ComesInGoesOutUnderline>
          </Link>
          <Link
            href="https://www.fancycomponents.dev/docs/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <ComesInGoesOutUnderline direction="left">
              @fancycomponents
            </ComesInGoesOutUnderline>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
