import { Dictionary } from "@/app/[lang]/dictionaries";
import {
  Metric,
  MetricChange,
  MetricLabel,
  MetricValue,
} from "@/components/metrics/metric";
import { Locale } from "@/constants/dictionary";
import { formatNumber } from "@/lib/utils";
import { InsightsData } from "@/types/metrics";

interface MetricsSummaryProps {
  summary: InsightsData["summary"];
  changes: InsightsData["changes"];
  dict: Dictionary["pages"]["insight"];
  locale: Locale;
}

const MetricsSummary = ({
  summary,
  changes,
  dict,
  locale,
}: MetricsSummaryProps) => {
  return (
    <div className="relative">
      <dl className="grid grid-cols-1 md:grid-cols-2">
        <Metric className="border-b md:border-b-0 md:border-r">
          <MetricLabel>
            {dict.visitors}
            <MetricChange
              value={changes.visitors}
              compareText={dict.comparedText}
            />
          </MetricLabel>
          <MetricValue>{formatNumber(summary.visitors, locale)}</MetricValue>
        </Metric>

        <Metric>
          <MetricLabel>
            {dict.views}
            <MetricChange
              value={changes.views}
              compareText={dict.comparedText}
            />
          </MetricLabel>
          <MetricValue>{formatNumber(summary.views, locale)}</MetricValue>
        </Metric>
      </dl>
    </div>
  );
};

export default MetricsSummary;
