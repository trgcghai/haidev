import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { TechStack } from "@/components/common/tech-stack";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

const Stack = async () => {
  const dict = await getSafeDictionary();

  return (
    <div>
      <h2 id="stack">
        <LetterSwapForward
          label={`# ${dict.root.stack}`}
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="mt-4">
        <TechStack />
      </div>
    </div>
  );
};

export default Stack;
