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
import usePostDialog from "../hooks/usePostDialog";

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
  const {
    onReply,
    handleNewPost,
    postDialog,
    setPostDialog,
    handleCloseNewPost,
  } = usePostDialog();

  return (
    <>
      <Head>
        <title>Feed</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>
      <Box sx={styles.root}>
        <Box sx={styles.posts}>
          {posts?.map(({ postId, ...rest }: any) => (
            <PostCard
              key={postId}
              post={{ postId, ...rest }}
              onReply={onReply}
            />
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
      <PostDialog
        open={postDialog.open}
        setPostDialog={setPostDialog}
        onClose={handleCloseNewPost}
        parentPost={posts?.find(
          (p: any) => p.postId === postDialog.parentPostId
        )}
      />
    </>
  );
};

Feed.getLayout = getMainLayout;

export default Feed;
