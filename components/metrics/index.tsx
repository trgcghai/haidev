"use client";
import { format } from "date-fns";

import { Dictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/constants/dictionary";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import {
  MetricsSeriesSkeleton,
  MetricsSummarySkeleton,
} from "@/components/metrics/metric";
import MetricsSeries from "@/components/metrics/metrics-series";
import MetricsSummary from "@/components/metrics/metrics-summary";
import useInsights from "@/hooks/use-insights";
import { LocalizedLink } from "@/components/common/LocalizedLink";

interface MetricsBlockProps {
  dict: Dictionary;
  lang: Locale;
}

export const MetricsBlock = ({ dict, lang }: MetricsBlockProps) => {
  const { data, error, loading } = useInsights();

  return (
    <div className="">
      <h2 id="insights" className="flex items-center">
        <LocalizedLink href="/insights" className="flex items-center">
          <LetterSwapForward
            label={`# ${dict.pages.insight.heading}`}
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </LocalizedLink>
        {!loading && !error && data && (
          <span className="ml-2 text-sm font-medium text-muted-foreground tracking-wide">
            ({format(new Date(data.startDate), "dd.MM")} -{" "}
            {format(new Date(data.endDate), "dd.MM")})
          </span>
        )}
      </h2>

      {loading && <MetricsBlockSkeleton />}

      {!data && error && (
        <div className="flex flex-col items-center justify-center gap-2 p-4 mt-4">
          <p className="text-muted-foreground">{dict.pages.insight.noData}</p>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <MetricsSummary
            summary={data.summary}
            changes={data.changes}
            dict={dict.pages.insight}
            locale={lang as Locale}
          />

          <MetricsSeries series={data.series} dict={dict.pages.insight} />
        </>
      )}
    </div>
  );
};

const MetricsBlockSkeleton = () => {
  return (
    <>
      <MetricsSummarySkeleton />
      <MetricsSeriesSkeleton />
    </>
  );
};
