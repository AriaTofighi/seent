import React, { ReactElement } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";

const Feed: NextPageWithLayout = () => {
  return <div>feed</div>;
};

Feed.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Feed;
