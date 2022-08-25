import {
  Box,
  Button,
  Fab,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import PostCard from "../components/posts/PostCard";
import { NextPageWithLayout, Styles } from "../types/types";
import AddIcon from "@mui/icons-material/Add";
import Head from "next/head";
import dynamic from "next/dynamic";
import usePostDialog from "../hooks/usePostDialog";
import useSWRInfinite from "swr/infinite";
import _ from "lodash";
import { PostEntity } from "../../backend/src/types";

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

const getPostsKey = (index: number) => `posts?page=${index + 1}&isChild=false`;

const Feed: NextPageWithLayout = () => {
  const { onNewPost, postDialog, setPostDialog, onCloseDialog } =
    usePostDialog();
  const [sortedPosts, setSortedPosts] = useState<any[]>();
  const {
    data: postsRes,
    error: postsErr,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(getPostsKey) as any;
  const posts: any = [];
  if (postsRes) {
    for (const res of postsRes) {
      posts.push(...res.data);
    }
  }

  useEffect(() => {
    if (!posts) return;

    const postsCopy = _.cloneDeep(posts);
    setSortedPosts(
      postsCopy.sort(
        (p1: any, p2: any) => p2.reactions.length - p1.reactions.length
      )
    );
  }, [postsRes]);

  if (!postsRes && !postsErr) {
    <LinearProgress />;
  }

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
          {sortedPosts?.map(({ postId, ...rest }: PostEntity) => {
            if (!{ ...rest }.parentPostId) {
              return (
                <PostCard
                  postId={postId}
                  post={{ ...rest, postId }}
                  key={postId}
                />
              );
            }
          })}
        </Box>

        <Button
          disabled={!(postsRes && postsRes[size - 1]?.meta?.next)}
          sx={{ mt: 1 }}
          fullWidth
          onClick={() => setSize(size + 1)}
        >
          {postsRes && postsRes[size - 1]?.meta?.next
            ? "Load more posts"
            : "No more posts"}
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
