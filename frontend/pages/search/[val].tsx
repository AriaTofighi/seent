import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import PostList from "../../components/posts/PostList";
import UserList from "../../components/users/UserList";
import Title from "../../components/UI/Title";
import { NextPageWithLayout } from "../../types";

const TABS = ["posts", "users"];

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { val, t = TABS[0] } = router.query;
  const value = TABS.indexOf(t as string);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const tab = TABS[newValue];
    if (tab === TABS[0]) {
      router.push(`/search/${val}`);
    } else {
      router.push(`/search/${val}?t=${tab}`);
    }
  };

  const getPostsKey = (index: number) =>
    `posts?page=${index + 1}&perPage=10&search=${val}`;

  const getUsersKey = (index: number) =>
    `users?page=${index + 1}&perPage=10&search=${val}`;

  const renderTab = (tab: number) => {
    switch (tab) {
      case 0:
        return <PostList getPostsKey={getPostsKey} repliesMode />;
      case 1:
        return <UserList getUsersKey={getUsersKey} />;
      default:
        return <div>Posts</div>;
    }
  };

  return (
    <>
      <Title title={`Search - ${val}`} />
      <TopAppBar title="Search" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} sx={{ display: "flex" }}>
          {TABS.map((tab, index) => (
            <Tab key={index} label={tab} sx={{ flex: 1 }} />
          ))}
        </Tabs>
      </Box>
      <Box>{renderTab(value)}</Box>
    </>
  );
};

Search.getLayout = getMainLayout;

export default Search;
