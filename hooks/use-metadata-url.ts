import { LinkMetadata } from "@/app/(api)/api/url/metadata/route";
import { useState } from "react";

const useMetadataUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchMetadata(
    urls: string[],
  ): Promise<LinkMetadata[] | undefined> {
    setLoading(true);

    try {
      const response = await fetch("/api/url/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }

      return response.json();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { isLoading: loading, error, fetchMetadata };
};

export default useMetadataUrl;
