import { Button, LinearProgress } from "@mui/material";
import React from "react";

const PostLoader = ({ onClick, loading, disabled }: any) => {
  return (
    <>
      <Button disabled={disabled} sx={{ my: 1 }} fullWidth onClick={onClick}>
        {!disabled && "Load more posts"}
      </Button>
      {loading && <LinearProgress sx={{ my: 1 }} />}
    </>
  );
};

export default PostLoader;
