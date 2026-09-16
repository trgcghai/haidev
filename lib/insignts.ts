import { absoluteUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export const getInsights = async () => {
  try {
    const res = await fetch(absoluteUrl("/api/vercel/metrics"));
    const data = await res.json();

    if (!data) {
      return notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching insights:", error);
    notFound();
  }
};
