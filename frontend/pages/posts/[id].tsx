import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { getMainLayout } from "../../components/layouts/MainLayout";
import PostCard from "../../components/posts/PostCard";
import usePostDialog from "../../hooks/usePostDialog";
import { NextPageWithLayout } from "../../types/types";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

const PostDetails: NextPageWithLayout = ({}: any) => {
  const { query } = useRouter();
  const { onReply, onNewPost, postDialog, setPostDialog, onCloseDialog } =
    usePostDialog();

  const { data: post, error: postErr } = useSWR(
    query.id ? `posts/${query.id}` : null
  );

  const { data: posts, error: postsErr } = useSWR("posts");

  const replies = posts?.filter((p: any) => p.parentPostId === query.id);

  const postLoading = !postErr && !post;
  const repliesLoading = !posts && !postsErr;

  if (postLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Post - {post?.author?.name}</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>

      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Post
        </Typography>
        <PostCard post={post} onReply={onReply} />
        {replies.length > 0 && (
          <Typography variant="h5" sx={{ my: 2 }}>
            Replies
          </Typography>
        )}

        {replies.map((r: any) => (
          <Box key={r.postId}>
            <PostCard post={r} onReply={onReply} />
            <Box my={2} />
          </Box>
        ))}
      </Box>
      <PostDialog
        open={postDialog.open}
        setPostDialog={setPostDialog}
        onClose={onCloseDialog}
        parentPost={posts?.find(
          (p: any) => p.postId === postDialog?.parentPostId
        )}
      />
    </>
  );
};

export default PostDetails;

PostDetails.getLayout = getMainLayout;
