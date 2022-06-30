import { Box, Fab } from "@mui/material";
import React, { useState } from "react";
import useSWR from "swr";
import { getMainLayout } from "../components/layouts/MainLayout";
import PostCard from "../components/posts/PostCard";
import { NextPageWithLayout, Styles } from "../types/types";
import { useUser } from "../contexts/UserContext";
import AddIcon from "@mui/icons-material/Add";
import Head from "next/head";
import dynamic from "next/dynamic";
const PostDialog = dynamic(() => import("../components/posts/PostDialog"), {
  ssr: false,
});

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
  const { data: posts } = useSWR("posts");
  const [open, setOpen] = useState(false);

  const handleNewPost = () => {
    setOpen(true);
  };

  const handleCloseNewPost = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Feed</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>
      <Box sx={styles.root}>
        <Box sx={styles.posts}>
          {posts?.map(({ postId, ...rest }: any) => (
            <PostCard key={postId} post={{ postId, ...rest }} />
          ))}
        </Box>
        <Fab
          size="small"
          color="secondary"
          sx={styles.createPostBtn}
          onClick={handleNewPost}
        >
          <AddIcon />
        </Fab>
      </Box>
      <PostDialog open={open} setOpen={setOpen} onClose={handleCloseNewPost} />
    </>
  );
};

Feed.getLayout = getMainLayout;

export default Feed;
