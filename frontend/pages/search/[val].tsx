import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import PostList from "../../components/posts/PostList";
import Title from "../../components/UI/Title";
import { NextPageWithLayout } from "../../types";

const TABS = ["Posts", "Users"];

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { val } = router.query;
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getPostsKey = (index: number) =>
    `posts?page=${index + 1}&isChild=false&perPage=10&search=${val}`;

  const renderTab = (tab: number) => {
    switch (tab) {
      case 0:
        return <PostList getPostsKey={getPostsKey} />;
      case 1:
        return <div>Users</div>;
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
      <Box sx={{ p: 2 }}>{renderTab(value)}</Box>
    </>
  );
};

Search.getLayout = getMainLayout;

export default Search;
