import useSWR from "swr";

export const useAPI = (url: string) => {
  const { data, error, isValidating } = useSWR(url);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
  };
};
