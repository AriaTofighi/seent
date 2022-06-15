import axios from "axios";

const swrConfig = {
  fetcher: async (url: string, init: any) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`);
    return res.data;
  },
};

export default swrConfig;
