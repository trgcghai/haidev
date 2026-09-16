import { cn } from "@/lib/utils";
import Grid from "@/components/charts/grid";
import LineChart, { Line } from "@/components/charts/line-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import { Dictionary } from "@/app/[lang]/dictionaries";
import { InsightsSeriesItem } from "@/types/metrics";

interface MetricsSeriesProps {
  series: InsightsSeriesItem[];
  dict: Dictionary["pages"]["insight"];
}

const MetricsSeries = ({ series, dict }: MetricsSeriesProps) => {
  if (!series || series.length === 0) {
    return (
      <div className="grid aspect-2/1 w-full place-content-center sm:aspect-3/1">
        <p className="text-muted-foreground">{dict.noData}</p>
      </div>
    );
  }

  const keys = Object.keys(series[0]).filter((key) => key !== "date");
  const labels = Object.fromEntries(
    keys.map((key) => [key, key.charAt(0).toUpperCase() + key.slice(1)]),
  );
  return (
    <figure>
      <LineChart
        className={cn(
          "sm:aspect-3/1!",
          "[--chart-1:var(--color-zinc-900)] [--chart-2:var(--color-zinc-400)]",
          "dark:[--chart-1:var(--color-zinc-100)] dark:[--chart-2:var(--color-zinc-600)]",
        )}
        data={series}
        margin={{ top: 16, right: 32, bottom: 40, left: 32 }}
      >
        <Grid horizontal />
        {keys.map((key, index) => (
          <Line
            key={key}
            dataKey={key}
            stroke={`var(--chart-${index + 1})`}
            strokeWidth={2}
          />
        ))}
        <ChartTooltip rowLabels={labels} />
      </LineChart>
    </figure>
  );
};

export default MetricsSeries;
