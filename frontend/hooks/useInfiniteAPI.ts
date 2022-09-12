// Create a data fetching hook that uses useSWRInfinite to fetch data
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const useInfiniteAPI = <T>(getUrl: SWRInfiniteKeyLoader) => {
  const { data, error, isValidating, size, setSize, mutate } =
    useSWRInfinite<T>(getUrl);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
    size,
    setSize,
    mutate,
  };
};

export default useInfiniteAPI;
