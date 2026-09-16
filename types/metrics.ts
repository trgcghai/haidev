export type InsightsSeriesItem = {
  date: string;
  visitors: number;
  views: number;
};

export type InsightsData = {
  summary: {
    visitors: number;
    views: number;
  };
  changes: {
    visitors: number;
    views: number;
  };
  series: InsightsSeriesItem[];
  startDate: string;
  endDate: string;
};
