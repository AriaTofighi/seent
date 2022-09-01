import { Box } from "@mui/material";
import React from "react";
import usePostDialog from "../../hooks/usePostDialog";
import { Styles } from "../../types/types";
import FloatingButton from "../UI/FloatingButton";
import LoadMorePosts from "./LoadMorePosts";
import PostCard from "./PostCard";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
import { infiniteSWRToFlat } from "../../utils/helpers";
import PostListSorting from "./PostListSorting";
import { POSTS_SORT_MODES } from "../../pages/feed";

const PostDialog = dynamic(() => import("./PostDialog"), {
  ssr: false,
});

const styles: Styles = {
  posts: { display: "flex", flexDirection: "column", gap: 0 },
};

type Props = {
  getPostsKey: (index: number) => string;
  sortMode?: any;
};

const PostList = ({ getPostsKey, sortMode }: Props) => {
  const { onNewPost, postDialog, setPostDialog, onCloseDialog } =
    usePostDialog();
  const {
    data: postsRes,
    error: postsErr,
    size,
    setSize,
    mutate: mutatePosts,
  } = useSWRInfinite(getPostsKey) as any;

  const posts: any[] = infiniteSWRToFlat(postsRes);

  const isLoading = !postsRes && !postsErr;

  return (
    <>
      {!isLoading && (
        <>
          <Box sx={styles.posts}>
            {posts?.map(({ postId, ...rest }) => {
              if (!{ ...rest }.parentPostId) {
                return (
                  <PostCard
                    postId={postId}
                    post={{ ...rest, postId }}
                    key={postId}
                    mutate={mutatePosts}
                  />
                );
              }
            })}
          </Box>
          <LoadMorePosts
            postsRes={postsRes}
            size={size}
            setSize={setSize}
            loading={isLoading}
          />
          <FloatingButton onClick={onNewPost} />

          <PostDialog
            open={postDialog.open}
            setPostDialog={setPostDialog}
            onClose={onCloseDialog}
            parentPost={posts?.find(
              (p: any) => p.postId === postDialog.parentPostId
            )}
            mutate={mutatePosts}
          />
        </>
      )}
    </>
  );
};

export default PostList;