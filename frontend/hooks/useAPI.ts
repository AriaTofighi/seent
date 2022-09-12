import useSWR, { Key } from "swr";

export const useAPI = <T>(url: Key) => {
  const { data, error, isValidating, mutate } = useSWR<T>(url);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
    mutate,
  };
};
