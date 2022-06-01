import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Feed: NextPageWithLayout = () => {
  return <div>feed</div>;
};

Feed.getLayout = (page: ReactElement) => {
  return <div style={{ backgroundColor: "red" }}>{page}</div>;
};

export default Feed;
