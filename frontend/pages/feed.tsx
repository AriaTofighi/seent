import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostList from "../components/posts/PostList";
import PostListSorting from "../components/posts/PostListSorting";
import Title from "../components/UI/Title";
import { NextPageWithLayout, POSTS_SORT_MODES, Styles } from "../types";
import { useTabs } from "../hooks/useTabs";
import { useUser } from "../contexts/UserContext";

const TABS = ["all", "friends"];

const Feed: NextPageWithLayout = () => {
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const { handleChange, tabIndex } = useTabs(TABS, TABS[0], "feed");
  const { user } = useUser();

  const getPostsKey = (index: number) =>
    `posts?isChild=false&page=${index + 1}&perPage=10&orderBy=${sortMode}`;

  const getFriendsOnlyPostsKey = (index: number) =>
    `posts?isChild=false&page=${
      index + 1
    }&perPage=10&orderBy=${sortMode}&friendsOnly=true`;

  const renderTab = (index: number) => {
    switch (index) {
      case 0:
        return <PostList getPostsKey={getPostsKey} feedMode />;
      case 1:
        return <PostList getPostsKey={getFriendsOnlyPostsKey} feedMode />;
      default:
        return null;
    }
  };

  return (
    <>
      <Title title="Feed" />
      <TopAppBar title="Feed">
        <PostListSorting setMode={setSortMode} />
      </TopAppBar>
      <Box sx={styles.root}>
        {user && (
          <Tabs value={tabIndex} onChange={handleChange}>
            {TABS.map((tab, index) => (
              <Tab key={index} label={tab} sx={{ flex: 1 }} />
            ))}
          </Tabs>
        )}

        {renderTab(tabIndex)}
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
