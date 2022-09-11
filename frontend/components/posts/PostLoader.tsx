import { Button, LinearProgress } from "@mui/material";
import React from "react";

const PostLoader = ({ size, setSize, loading, disabled }: any) => {
  return (
    <>
      <Button
        disabled={disabled}
        sx={{ my: 1 }}
        fullWidth
        onClick={() => setSize(size + 1)}
      >
        {!disabled && "Load more posts"}
      </Button>
      {loading && <LinearProgress sx={{ my: 1 }} />}
    </>
  );
};

export default PostLoader;
