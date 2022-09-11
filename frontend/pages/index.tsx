import { useRouter } from "next/router";
import { useEffect } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "../types";

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/feed");
  }, []);

  return <></>;
};

Home.getLayout = getMainLayout;

export default Home;
