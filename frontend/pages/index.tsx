import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "../types/types";

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/feed");
  }, []);

  return <></>;
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
