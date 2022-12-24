import { DEFAULT_API as axios } from "../services/api/AxiosInstance";

const swrConfig = {
  fetcher: async (url: string, init: any) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`);
    return res.data;
  },
  revalidateOnFocus: false,
};

export default swrConfig;
