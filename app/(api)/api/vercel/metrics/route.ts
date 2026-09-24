import { format } from "date-fns";
import { NextResponse } from "next/server";

const VERCEL_WEB_ANALYTICS_URL =
  "https://api.vercel.com/v1/query/web-analytics";
const teamId = process.env.VERCEL_TEAM_ID!;
const projectId = process.env.VERCEL_PROJECT_ID!;
const accessToken = process.env.VERCEL_ACCESS_TOKEN!;

type Dataset = "visits" | "events";
type QueryType = "count" | "aggregate";

type SummaryAnalytics = {
  data?: {
    pageviews?: number;
    visitors?: number;
  };
};

type SerieAnalytics = {
  data?: Array<{
    timestamp?: string;
    pageviews?: number;
    visitors?: number;
  }>;
};

const validateEnv = () => {
  if (!teamId || !projectId) {
    return NextResponse.json(
      { error: "Missing teamId or projectId." },
      { status: 400 },
    );
  }

  if (!accessToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  return undefined;
};

export const GET = async () => {
  const envError = validateEnv();

  if (envError) {
    return envError;
  }

  return getMetrics();
};

const getMetrics = async () => {
  const seriesDateRange = getLatestDayRange(31);
  const summaryDateRange = getLatestDayRange(7);
  const previousSummaryDateRange = getPreviousDayRange(summaryDateRange, 7);
  const [summaryResponse, previousSummaryResponse, seriesResponse] =
    await Promise.all([
      fetchWebAnalytics("visits", "count", summaryDateRange),
      fetchWebAnalytics("visits", "count", previousSummaryDateRange),
      fetchWebAnalytics("visits", "aggregate", seriesDateRange, ["day"]),
    ]);

  const errorResponse = await getFirstErrorResponse([
    summaryResponse,
    previousSummaryResponse,
    seriesResponse,
  ]);

  if (errorResponse) {
    return errorResponse;
  }

  const [current, previous, series]: [
    SummaryAnalytics,
    SummaryAnalytics,
    SerieAnalytics,
  ] = await Promise.all([
    summaryResponse.json(),
    previousSummaryResponse.json(),
    seriesResponse.json(),
  ]);

  const visitors = current.data?.visitors ?? 0;
  const views = current.data?.pageviews ?? 0;
  const previousVisitors = previous.data?.visitors ?? 0;
  const previousViews = previous.data?.pageviews ?? 0;

  return NextResponse.json({
    summary: {
      visitors,
      views,
    },
    changes: {
      visitors: calculateChange(visitors, previousVisitors),
      views: calculateChange(views, previousViews),
    },
    series: (series.data ?? []).map((item) => ({
      date: item.timestamp ?? "",
      visitors: item.visitors ?? 0,
      views: item.pageviews ?? 0,
    })),
    startDate: seriesDateRange.since,
    endDate: seriesDateRange.until,
  });
};

const fetchWebAnalytics = (
  dataset: Dataset,
  type: QueryType,
  dateRange: { since: string; until: string },
  by: string[] = [],
) => {
  const url = new URL(`${VERCEL_WEB_ANALYTICS_URL}/${dataset}/${type}`);
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("teamId", teamId);
  url.searchParams.set("since", dateRange.since);
  url.searchParams.set("until", dateRange.until);

  for (const value of by) {
    url.searchParams.append("by", value);
  }

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
};

const getFirstErrorResponse = async (responses: Response[]) => {
  const response = responses.find((item) => !item.ok);

  if (!response) {
    return;
  }

  return new Response(await response.text(), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getLatestDayRange = (days: number) => {
  const until = new Date();
  const since = new Date(until);
  since.setDate(since.getDate() - (days - 1));

  return {
    since: format(since, "yyyy-MM-dd"),
    until: format(until, "yyyy-MM-dd"),
  };
};

const getPreviousDayRange = (
  dateRange: { since: string; until: string },
  days: number,
) => {
  const until = new Date(dateRange.since);
  until.setDate(until.getDate() - 1);
  const since = new Date(until);
  since.setDate(since.getDate() - (days - 1));

  return {
    since: format(since, "yyyy-MM-dd"),
    until: format(until, "yyyy-MM-dd"),
  };
};

const calculateChange = (current: number, previous: number) => {
  if (previous === 0) {
    return null;
  }

  return ((current - previous) / previous) * 100;
};
