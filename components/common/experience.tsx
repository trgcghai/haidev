import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import {
  ExperienceItemType,
  WorkExperience,
} from "@/components/chanhdai/work-experience";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

const Experience = async () => {
  const dict = await getSafeDictionary();

  const MY_EXPERIENCE: ExperienceItemType[] = dict.root.experience.items.map(
    (item, index) => ({
      id: item.company,
      companyName: item.company,
      companyWebsite: "",
      positions: [
        {
          id: `${item.company}-${item.role}`,
          title: item.role,
          employmentPeriod: {
            start: item.period.start,
            end: item.period.end ? item.period.end : undefined,
          },
          description: item.description,
          isExpanded: true,
          skills: item.skills,
        },
      ],
      isCurrentEmployer: index === 0,
    }),
  );

  return (
    <div>
      <h2 id="experience">
        <LetterSwapForward
          label={`# ${dict.root.experience.heading}`}
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <WorkExperience className="w-full" experiences={MY_EXPERIENCE} />
    </div>
  );
};

export default Experience;
