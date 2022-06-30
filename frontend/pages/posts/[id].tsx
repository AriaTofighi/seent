import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { getMainLayout } from "../../components/layouts/MainLayout";
import PostCard from "../../components/posts/PostCard";
import { NextPageWithLayout } from "../../types/types";

const PostDetails: NextPageWithLayout = ({}: any) => {
  const { query } = useRouter();
  const {
    data: post,
    isValidating,
    error,
  } = useSWR(query.id ? `posts/${query.id}` : null);

  if (isValidating || error) {
    return <div>Loading...</div>;
  }
  console.log(post);

  return (
    <>
      <Head>
        <title>Post - {post?.author?.name}</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>

      <Box>
        <PostCard post={post} />
      </Box>
    </>
  );
};

export default PostDetails;

PostDetails.getLayout = getMainLayout;
