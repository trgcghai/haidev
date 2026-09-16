import { absoluteUrl } from "@/lib/utils";
import { InsightsData } from "@/types/metrics";
import { notFound } from "next/navigation";

export const getInsights = async () => {
  try {
    const res = await fetch(absoluteUrl("/api/vercel/metrics"));

    if (!res.ok) {
      return null;
    }

    const data: InsightsData = await res.json();

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching insights:", error);
    notFound();
  }
};
