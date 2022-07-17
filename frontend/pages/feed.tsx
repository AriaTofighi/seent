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

export const DEFAULT_POST_DIALOG_STATE = {
  open: false,
  parentPostId: "",
};

const Feed: NextPageWithLayout = () => {
  const { data: posts } = useSWR("posts");
  const [postDialog, setPostDialog] = useState(DEFAULT_POST_DIALOG_STATE);

  const handleNewPost = () => {
    setPostDialog({ open: true, parentPostId: "" });
  };

  const handleCloseNewPost = () => {
    setPostDialog({ open: false, parentPostId: "" });
  };

  const onReply = (parentPostId: string) => {
    setPostDialog({ open: true, parentPostId });
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
