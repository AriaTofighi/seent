import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../types";
import { getMainLayout } from "../components/layouts/MainLayout";
import Title from "../components/UI/Title";
import TopAppBar from "../components/navigation/TopAppBar";
import TagsSearchAndSortBar from "../components/tags/TagsSearchAndSortBar";
import { debounce } from "lodash";
import TagList from "../components/tags/TagList";
import { Box } from "@mui/material";
import Loader from "../components/UI/Loader";

const Tags: NextPageWithLayout = () => {
  const [sortBy, setSortBy] = useState("posts");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [executeSearch, setExecuteSearch] = useState("");

  const getTagsKey = (pageIndex: number) =>
    search
      ? `tags?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${
          pageIndex + 1
        }&perPage=25`
      : `tags?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${
          pageIndex + 1
        }&perPage=25`;

  const onSearch = (data: any) => {
    setExecuteSearch(data);
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setSearch(executeSearch);
    }, 650);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [executeSearch]);

  return (
    <>
      <Title title="Tags" />
      <TopAppBar title="Tags"> </TopAppBar>
      <Box p={2}>
        <TagsSearchAndSortBar
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSearch={onSearch}
          search={executeSearch}
        />
        <TagList getTagsKey={getTagsKey} />
      </Box>
    </>
  );
};

Tags.getLayout = getMainLayout;

export default Tags;
