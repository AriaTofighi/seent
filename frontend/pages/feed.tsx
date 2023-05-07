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
import { useRouter } from "next/router";

const TABS = ["all", "friends"];

const Feed: NextPageWithLayout = () => {
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const { handleChange, tabIndex } = useTabs(TABS, TABS[0], "feed");
  const { user } = useUser();
  const { query } = useRouter();
  const { tags } = query;

  const createPostsKey = (index: number, friendsOnly: boolean = false) => {
    const baseEndpoint = `posts?page=${index + 1}&perPage=10`;
    const childFilter = !Boolean(tags) ? "&isChild=false" : "";
    const sort = `&orderBy=${sortMode}`;
    const friendFilter = friendsOnly ? "&friendsOnly=true" : "";
    const tagFilter = Boolean(tags) ? `&tags=${tags}` : "";

    return `${baseEndpoint}${childFilter}${sort}${friendFilter}${tagFilter}`;
  };

  const getPostsKey = (index: number) => createPostsKey(index);

  const getFriendsOnlyPostsKey = (index: number) => createPostsKey(index, true);

  const renderTab = (index: number) => {
    switch (index) {
      case 0:
        return (
          <PostList
            getPostsKey={getPostsKey}
            repliesMode={Boolean(tags)}
            feedMode
          />
        );
      case 1:
        return (
          <PostList
            getPostsKey={getFriendsOnlyPostsKey}
            repliesMode={Boolean(tags)}
            feedMode
          />
        );
      default:
        return null;
    }
  };

  const formattedTags = (tags as string)?.replace(/,/g, ", ");

  return (
    <>
      <Title title="Feed" />
      <TopAppBar title={tags ? `Tags - ${formattedTags}` : "Feed"}>
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
