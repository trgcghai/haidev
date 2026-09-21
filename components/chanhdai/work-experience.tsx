"use client";

import { useCallback, useRef, type ComponentProps } from "react";
import { BriefcaseBusinessIcon, InfinityIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import type { ChevronsUpDownIconHandle } from "@/components/chanhdai/chevrons-up-down-icon";
import { ChevronsUpDownIcon } from "@/components/chanhdai/chevrons-up-down-icon";

export type ExperiencePositionItemType = {
  /** Unique identifier for the position */
  id: string;
  /** The job title or position name */
  title: string;
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** The type of employment (e.g., "Full-time", "Part-time", "Contract") */
  employmentType?: string;
  /** A brief description of the position or responsibilities */
  description?: string;
  /** An icon representing the position */
  icon?: React.ReactElement;
  /** A list of skills associated with the position */
  skills?: string[];
  /** Indicates if the position details are expanded in the UI */
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  /** Unique identifier for the experience item */
  id: string;
  /** Name of the company where the experience was gained */
  companyName: string;
  /** URL to the company's website. */
  companyWebsite?: string;
  /**
   * List of positions held at the company
   * @fumadocsHref #experiencepositionitemtype
   * */
  positions: ExperiencePositionItemType[];
  /** Indicates if this is the user's current employer */
  isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
  className?: string;
  /** @fumadocsHref #experienceitemtype */
  experiences: ExperienceItemType[];
};

export function WorkExperience({
  className,
  experiences,
}: WorkExperienceProps) {
  return (
    <div className={cn("px-4 text-foreground", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

export type ExperienceItemProps = {
  experience: ExperienceItemType;
};

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="not-prose flex items-center gap-3">
        <h3 className="text-lg/snug font-semibold">
          {experience.companyWebsite ? (
            <a
              className="link"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {experience.isCurrentEmployer && (
          <span
            className="relative flex items-center justify-center"
            aria-label="Current Employer"
          >
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-4 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

export type ExperiencePositionItemProps = {
  position: ExperiencePositionItemType;
};

export function ExperiencePositionItem({
  position,
}: ExperiencePositionItemProps) {
  const chevronsUpDownIconRef = useRef<ChevronsUpDownIconHandle>(null);

  const handleOpenChange = useCallback((open: boolean) => {
    const controls = chevronsUpDownIconRef.current;
    if (!controls) return;

    if (open) {
      controls.startAnimation();
    } else {
      controls.stopAnimation();
    }
  }, []);

  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      onOpenChange={handleOpenChange}
      disabled={!position.description}
    >
      <CollapsibleTrigger
        className={cn(
          "group/experience-position not-prose block w-full text-left select-none",
        )}
      >
        <div className="relative z-1 mb-1 flex items-center gap-3 text-base">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-sm select-none border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            {position.icon ?? <BriefcaseBusinessIcon className="size-5" />}
          </div>

          <h4 className="flex-1 font-medium text-balance text-foreground">
            {position.title}
          </h4>

          <div className="shrink-0 text-muted-foreground group-data-disabled/experience-position:hidden [&_svg]:h-lh [&_svg]:w-4">
            <ChevronsUpDownIcon ref={chevronsUpDownIconRef} duration={0.15} />
          </div>
        </div>

        {/* Separators are aria-hidden: a dl may only expose dt/dd groups, and these dividers are decorative. */}
        <dl className="relative z-1 flex items-center gap-2 pl-11 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <div>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </div>

              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
            </>
          )}

          <div>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{start}</span>
              <span className="font-mono">-</span>
              {isOngoing ? (
                <InfinityIcon
                  className="size-4.5 translate-y-[0.5px]"
                  aria-label="Present"
                />
              ) : (
                <span>{end}</span>
              )}
            </dd>
          </div>
        </dl>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {position.description && (
          <Prose className="pt-2 pl-11">
            <ReactMarkdown>{position.description}</ReactMarkdown>
          </Prose>
        )}
      </CollapsibleContent>

      {Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-11">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <Skill>{skill}</Skill>
            </li>
          ))}
        </ul>
      )}
    </Collapsible>
  );
}

function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none prose-ncdai prose-zinc dark:prose-invert",
        className,
      )}
      {...props}
    />
  );
}

function Skill({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
