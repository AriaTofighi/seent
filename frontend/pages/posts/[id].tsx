import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { getMainLayout } from "../../components/layouts/MainLayout";
import PostCard from "../../components/posts/PostCard";
import { NextPageWithLayout } from "../../types/types";
import { DEFAULT_POST_DIALOG_STATE } from "../feed";

const PostDetails: NextPageWithLayout = ({}: any) => {
  const { query } = useRouter();
  const [postDialog, setPostDialog] = useState(DEFAULT_POST_DIALOG_STATE);

  const {
    data: post,
    isValidating,
    error,
  } = useSWR(query.id ? `posts/${query.id}` : null);
  const postLoading = !error && !post;

  if (postLoading) {
    return <div>Loading...</div>;
  }

  const onReply = (parentPostId: string) => {
    setPostDialog({ open: true, parentPostId });
  };

  return (
    <>
      <Head>
        <title>Post - {post?.author?.name}</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>

      <Box>
        <PostCard post={post} onReply={onReply} />
      </Box>
    </>
  );
};

export default PostDetails;

PostDetails.getLayout = getMainLayout;
