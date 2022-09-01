import { Button, LinearProgress } from "@mui/material";
import React from "react";

const LoadMorePosts = ({ postsRes, size, setSize, loading, disabled }: any) => {
  const isDisabled = !(postsRes && postsRes[size - 1]?.meta?.next) || disabled;
  return (
    <>
      <Button
        disabled={isDisabled}
        sx={{ my: 1 }}
        fullWidth
        onClick={() => setSize(size + 1)}
      >
        {!isDisabled ? "Load more posts" : "No more posts"}
      </Button>
      {loading && <LinearProgress sx={{ my: 1 }} />}
    </>
  );
};

export default LoadMorePosts;
