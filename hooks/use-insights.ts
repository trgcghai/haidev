import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

const useInsights = () => {
  const { data, error, isLoading } = useSWR("/api/vercel/metrics", fetcher);

  return {
    data,
    loading: isLoading,
    error: error?.message ?? "",
  };
};

export default useInsights;
