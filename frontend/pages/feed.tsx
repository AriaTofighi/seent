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
import { useUser } from "../contexts/UserContext";

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
  const [sortedPosts, setSortedPosts] = useState<PostEntity[]>();
  const {
    data: postsRes,
    error: postsErr,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getPostsKey) as any;

  useEffect(() => {
    if (!postsRes) return;
    const posts: PostEntity[] = [];
    for (const res of postsRes) {
      posts.push(...res.data);
    }

    const postsCopy = _.cloneDeep(posts);
    setSortedPosts(postsCopy);
    // setSortedPosts(
    //   postsCopy.sort((p1, p2) => p2.reactions.length - p1.reactions.length)
    // );
  }, [postsRes]);

  if (!postsRes && !postsErr) {
    return <LinearProgress />;
  }

  if (postsErr) {
    return <Typography>Error loading data</Typography>;
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
          {sortedPosts?.map(({ postId, ...rest }) => {
            if (!{ ...rest }.parentPostId) {
              return (
                <PostCard
                  postId={postId}
                  post={{ ...rest, postId }}
                  key={postId}
                  mutate={mutate}
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
        parentPost={sortedPosts?.find(
          (p: any) => p.postId === postDialog.parentPostId
        )}
        mutate={mutate}
      />
    </>
  );
};

Feed.getLayout = getMainLayout;

export default Feed;
