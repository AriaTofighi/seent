import { Box } from "@mui/material";
import { useState } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostsList from "../components/posts/PostList";
import PostListSorting from "../components/posts/PostListSorting";
import Title from "../components/UI/Title";
import { NextPageWithLayout, Styles } from "../types";

export const POSTS_SORT_MODES = {
  TOP_DAY: "top-day",
  TOP_WEEK: "top-week",
  TOP_MONTH: "top-month",
  TOP_YEAR: "top-year",
  TOP_ALL: "top-all",
  NEW: "new",
  OLD: "old",
};

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

const Feed: NextPageWithLayout = () => {
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);

  const getPostsKey = (index: number) =>
    `posts?page=${index + 1}&isChild=false&perPage=10&orderBy=${sortMode}`;

  return (
    <>
      <Title title="Feed" />
      <TopAppBar title="Feed">
        <PostListSorting setMode={setSortMode} />
      </TopAppBar>
      <Box sx={styles.root}>
        <PostsList getPostsKey={getPostsKey} />
      </Box>
    </>
  );
};

Feed.getLayout = getMainLayout;

export default Feed;
