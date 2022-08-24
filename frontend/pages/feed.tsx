import {
  Box,
  Button,
  Fab,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
    bottom: 0,
  },
  root: {
    height: "100%",
    position: "relative",
  },
};

const DEFAULT_PAGE = 1;

const Feed: NextPageWithLayout = () => {
  const [sortedPosts, setSortedPosts] = useState<any[]>();
  const [page, setPage] = useState(DEFAULT_PAGE);
  // const {
  //   data: posts,
  //   error: postsErr,
  //   isValidating,
  // } = useSWR(`posts?take=${numOfPostsToTake}&isChild=false`);
  const {
    data: postsRes,
    error: postsErr,
    isValidating,
  } = useSWR(`posts?page=${page}&isChild=false`);
  const posts = postsRes?.data ?? [];
  const { onNewPost, postDialog, setPostDialog, onCloseDialog } =
    usePostDialog();

  useEffect(() => {
    if (!posts) return;
    setSortedPosts(
      [...posts].sort(
        (p1: any, p2: any) => p2.reactions.length - p1.reactions.length
      )
    );
  }, [posts]);

  if (!posts && !postsErr) {
    <LinearProgress />;
  }
  console.log(posts);
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
          {sortedPosts?.map(({ postId, ...rest }: any) => {
            if (!{ ...rest }.parentPostId) {
              return <PostCard postId={postId} key={postId} />;
            }
          })}
        </Box>
        <Button sx={{ mt: 1 }} fullWidth onClick={() => setPage(page + 1)}>
          Load more posts
        </Button>
        {isValidating && <LinearProgress sx={{ my: 1 }} />}
        <Stack
          width="100%"
          height={50}
          justifyContent="flex-end"
          flexDirection="row"
          sx={{ position: "sticky", bottom: 16, mt: 1 }}
        >
          <Fab
            size="medium"
            color="secondary"
            sx={styles.createPostBtn}
            onClick={onNewPost}
          >
            <AddIcon />
          </Fab>
        </Stack>
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
