import { format } from "date-fns";

import { getSafeDictionary } from "@/app/[lang]/dictionaries";
import { getInsights } from "@/lib/insignts";
import MetricsSummary from "@/components/metrics/metrics-summary";
import { lang as rootLang } from "next/root-params";
import { Locale } from "@/constants/dictionary";
import MetricsSeries from "@/components/metrics/metrics-series";
import {
  MetricsSeriesSkeleton,
  MetricsSummarySkeleton,
} from "@/components/metrics/metric";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";
import Link from "next/link";

export const MetricsBlock = async () => {
  const data = await getInsights();
  const dict = await getSafeDictionary();
  const lang = await rootLang();

  if (!data) {
    return (
      <div className="grid aspect-2/1 w-full place-content-center sm:aspect-3/1">
        <p className="text-muted-foreground">{dict.pages.insight.noData}</p>
      </div>
    );
  }

  return (
    <div className="">
      <h2 id="metrics" className="flex items-center">
        <Link href="/insights" className="flex items-center">
          <LetterSwapForward
            label={`# ${dict.pages.insight.heading}`}
            reverse={true}
            className="text-lg md:text-2xl font-semibold w-fit text-primary"
          />
        </Link>
        <span className="ml-2 text-sm font-medium text-muted-foreground tracking-wide">
          ({format(new Date(data.startDate), "dd.MM")} -{" "}
          {format(new Date(data.endDate), "dd.MM")})
        </span>
      </h2>

      <MetricsSummary
        summary={data.summary}
        changes={data.changes}
        dict={dict.pages.insight}
        locale={lang as Locale}
      />

      <MetricsSeries series={data.series} dict={dict.pages.insight} />
    </div>
  );
};

export const MetricsBlockSkeleton = () => {
  return (
    <>
      <MetricsSummarySkeleton />
      <MetricsSeriesSkeleton />
    </>
  );
};
