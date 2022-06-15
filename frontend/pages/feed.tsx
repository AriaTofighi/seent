import { Box, Fab } from "@mui/material";
import React, { ReactElement } from "react";
import useSWR from "swr";
import MainLayout from "../components/layouts/MainLayout";
import PostCard from "../components/posts/PostCard";
import { NextPageWithLayout, Styles } from "../types/types";
import { useUser } from "../contexts/UserContext";
import AddIcon from "@mui/icons-material/Add";
import Head from "next/head";

const styles: Styles = {
  posts: { display: "flex", flexDirection: "column", gap: 2 },
  createPostBtn: {
    position: "sticky",
    bottom: 0,
    right: 0,
  },
  root: {
    height: "100%",
  },
};

const Feed: NextPageWithLayout = () => {
  const { data: posts, error, isValidating } = useSWR("posts");
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <Head>
        <title>Feed</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>
      <Box sx={styles.root}>
        <Box sx={styles.posts}>
          {posts?.map(({ body, author, postId, createdAt }: any) => (
            <PostCard
              key={postId}
              body={body}
              author={author.name}
              createdAt={createdAt}
            />
          ))}
        </Box>
        <Fab size="small" color="secondary" sx={styles.createPostBtn}>
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

Feed.getLayout = (page: ReactElement): ReactElement => (
  <MainLayout>{page}</MainLayout>
);

export default Feed;
