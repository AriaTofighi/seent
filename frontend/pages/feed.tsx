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
import Header from "../components/UI/Header";

const PostDialog = dynamic(() => import("../components/posts/PostDialog"), {
  ssr: false,
});

const styles: Styles = {
  posts: { display: "flex", flexDirection: "column", gap: 0 },
  createPostBtn: {
    position: "sticky",
    bottom: 0,
    mr: 2,
  },
  root: {
    minHeight: "110vh",
    position: "sticky",
    top: 0,
  },
};

const getPostsKey = (index: number) =>
  `posts?page=${index + 1}&isChild=false&perPage=20`;

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
  const loading = (!postsRes && !postsErr) || !sortedPosts;

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
        <Header>Feed</Header>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
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
          </>
        )}
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
