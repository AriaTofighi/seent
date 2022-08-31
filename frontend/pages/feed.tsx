import { Box, Typography } from "@mui/material";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { PostEntity } from "../../backend/src/types";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostsList from "../components/posts/PostsList";
import Title from "../components/UI/Title";
import usePostDialog from "../hooks/usePostDialog";
import { NextPageWithLayout, Styles } from "../types/types";

const styles: Styles = {
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
  return (
    <>
      <Title title="Feed" />
      <TopAppBar title="Feed"></TopAppBar>
      <Box sx={styles.root}>
        <PostsList getPostsKey={getPostsKey} />
      </Box>
    </>
  );
};

Feed.getLayout = getMainLayout;

export default Feed;
