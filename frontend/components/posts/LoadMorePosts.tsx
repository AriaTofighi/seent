import { Button, LinearProgress } from "@mui/material";
import React from "react";

const LoadMorePosts = ({ postsRes, size, setSize, loading }: any) => {
  return (
    <>
      <Button
        disabled={!(postsRes && postsRes[size - 1]?.meta?.next)}
        sx={{ my: 1 }}
        fullWidth
        onClick={() => setSize(size + 1)}
      >
        {postsRes && postsRes[size - 1]?.meta?.next
          ? "Load more posts"
          : "No more posts"}
      </Button>
      {loading && <LinearProgress sx={{ my: 1 }} />}
    </>
  );
};

export default LoadMorePosts;
