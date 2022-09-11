// Create a data fetching hook that uses useSWRInfinite to fetch data
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const useInfiniteAPI = (getUrl: SWRInfiniteKeyLoader) => {
  const { data, error, isValidating, size, setSize } = useSWRInfinite(getUrl);

  return {
    data,
    error,
    loading: !data && !error,
    isValidating,
    size,
    setSize,
  };
};

export default useInfiniteAPI;
