import React from "react";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import { PaginatedResult, TagEntity } from "../../types";
import { infiniteSWRToFlat } from "../../utils";
import TagListItem from "./TagListItem";
import { Box, LinearProgress } from "@mui/material";
import Loader from "../UI/Loader";

type Props = {
  getTagsKey: (pageIndex: number) => string;
};

const TagList = ({ getTagsKey }: Props) => {
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
    size,
    setSize,
  } = useInfiniteAPI<PaginatedResult<TagEntity>>(getTagsKey);

  const hasMore = tagsData?.[tagsData.length - 1].meta?.next;

  const tagsList = infiniteSWRToFlat(tagsData);

  if (tagsError) {
    return (
      <Box px={1} py={2}>
        Error loading tags
      </Box>
    );
  }

  if (tagsLoading) {
    return <LinearProgress sx={{ my: 3, mx: 1 }} />;
  }

  return (
    <Box pt={2}>
      {tagsList.length === 0 && <Box>No tags found</Box>}
      {tagsList.map((tag) => {
        return <TagListItem key={tag.tagId} tag={tag} />;
      })}
      <Loader
        onClick={() => setSize(size + 1)}
        disabled={!hasMore}
        loading={tagsLoading}
        text="Load more tags"
      />
    </Box>
  );
};

export default TagList;
