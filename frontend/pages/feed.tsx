import { Box, Fab, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { getMainLayout } from "../components/layouts/MainLayout";
import PostCard from "../components/posts/PostCard";
import { NextPageWithLayout, Styles } from "../types/types";
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
    right: 0,
    bottom: 0,
  },
  root: {
    height: "100%",
    position: "relative",
  },
};

const Feed: NextPageWithLayout = () => {
  const { data: posts } = useSWR("posts");
  const { onReply, onNewPost, postDialog, setPostDialog, onCloseDialog } =
    usePostDialog();

  return (
    <>
      <Head>
        <title>Feed</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>
      <Box sx={styles.root}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Feed
        </Typography>

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
          size="medium"
          color="secondary"
          sx={styles.createPostBtn}
          onClick={onNewPost}
        >
          <AddIcon />
        </Fab>
      </Box>
      <PostDialog
        open={postDialog.open}
        setPostDialog={setPostDialog}
        onClose={onCloseDialog}
        parentPost={posts?.find(
          (p: any) => p.postId === postDialog.parentPostId
        )}
      />
    </>
  );
};

Feed.getLayout = getMainLayout;

export default Feed;
