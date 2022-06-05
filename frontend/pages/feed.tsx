import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import useSWR from "swr";
import MainLayout from "../components/layouts/MainLayout";
import PostCard from "../components/PostCard";
import { Styles } from "../types/types";
import { NextPageWithLayout } from "./_app";
import moment from "moment";

const styles: Styles = {
  root: { display: "flex", flexDirection: "column", gap: 2 },
};

const Feed: NextPageWithLayout = () => {
  const { data: posts, error, isValidating } = useSWR("posts");

  return (
    <Box sx={styles.root}>
      {posts?.map(({ body, author, postId, createdAt }: any) => (
        <PostCard
          key={postId}
          body={body}
          author={author.name}
          createdAt={createdAt}
        />
      ))}
    </Box>
  );
};

Feed.getLayout = (page: ReactElement): ReactElement => (
  <MainLayout>{page}</MainLayout>
);

export default Feed;
