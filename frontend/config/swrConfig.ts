const swrConfig = {
  fetcher: (url: string, init: any) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, init).then((res) =>
      res.json()
    ),
};

export default swrConfig;
