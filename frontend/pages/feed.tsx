import { Box } from "@mui/material";
import { useState } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostList from "../components/posts/PostList";
import PostListSorting from "../components/posts/PostListSorting";
import Title from "../components/UI/Title";
import { NextPageWithLayout, POSTS_SORT_MODES, Styles } from "../types";

const Feed: NextPageWithLayout = () => {
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);

  const getPostsKey = (index: number) =>
    `posts?isChild=false&page=${index + 1}&perPage=10&orderBy=${sortMode}`;

  return (
    <>
      <Title title="Feed" />
      <TopAppBar title="Feed">
        <PostListSorting setMode={setSortMode} />
      </TopAppBar>
      <Box sx={styles.root}>
        <PostList getPostsKey={getPostsKey} />
      </Box>
    </>
  );
};

const styles: Styles = {
  root: {
    minHeight: "110vh",
    position: "sticky",
    top: 0,
  },
};

Feed.getLayout = getMainLayout;

export default Feed;
