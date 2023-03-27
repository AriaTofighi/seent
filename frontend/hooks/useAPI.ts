import useSWR, { Key } from "swr";

export const useAPI = <T>(url: Key, options?: any) => {
  const { data, error, isValidating, mutate } = useSWR<T>(url, options);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
    mutate,
  };
};
