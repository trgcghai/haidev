import { format } from "date-fns";

import Grid from "@/components/charts/grid";
import LineChart, { Line } from "@/components/charts/line-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import {
  Metric,
  MetricChange,
  MetricLabel,
  MetricValue,
} from "@/components/metric";
import { absoluteUrl } from "@/lib/utils";
import { getSafeDictionary } from "@/app/[lang]/dictionaries";

export async function MetricsBlock() {
  const res = await fetch(absoluteUrl("/api/vercel/metrics"));
  const data = await res.json();

  const dict = await getSafeDictionary();

  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="border-x border-line py-8">
          <div className="screen-line-top screen-line-bottom">
            <h2 className="screen-line-bottom ml-4 font-heading text-3xl font-medium tracking-tight">
              {dict.pages.insight.heading}
              <sup className="ml-2 text-sm font-medium text-muted-foreground tracking-wide">
                ({format(new Date(data.startDate), "dd.MM")} -{" "}
                {format(new Date(data.endDate), "dd.MM")})
              </sup>
            </h2>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-2">
                <div className="border-r border-line" />
                <div className="border-r border-line max-md:hidden" />
                <div className="border-r border-line max-md:hidden" />
              </div>

              <dl className="grid grid-cols-2">
                <Metric>
                  <MetricLabel>
                    {dict.pages.insight.visitors}
                    <MetricChange value={data.changes.visitors} />
                  </MetricLabel>
                  <MetricValue>
                    {data.summary.visitors.toLocaleString("en-US")}
                  </MetricValue>
                </Metric>

                <Metric>
                  <MetricLabel>
                    {dict.pages.insight.views}
                    <MetricChange value={data.changes.views} />
                  </MetricLabel>
                  <MetricValue>
                    {data.summary.views.toLocaleString("en-US")}
                  </MetricValue>
                </Metric>
              </dl>
            </div>

            {data.series.length > 0 ? (
              <LineChart
                className="md:aspect-3/1!"
                data={data.series}
                margin={{ top: 16, right: 32, bottom: 40, left: 32 }}
              >
                <Grid horizontal />
                <Line
                  dataKey="views"
                  stroke="var(--chart-line-secondary)"
                  strokeWidth={2}
                />
                <Line
                  dataKey="visitors"
                  stroke="var(--chart-line-primary)"
                  strokeWidth={2}
                />
                <ChartTooltip />
              </LineChart>
            ) : (
              <div className="grid aspect-2/1 w-full place-content-center md:aspect-3/1">
                <p className="text-muted-foreground">
                  {dict.pages.insight.noData}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Formats a duration given in seconds into a compact `Xh Ym Zs` string.
 * Zero-valued units are omitted; a zero duration renders as `0s`.
 */
export function formatDuration(seconds: number): string {
  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.length > 0 ? parts.join(" ") : "0s";
}
