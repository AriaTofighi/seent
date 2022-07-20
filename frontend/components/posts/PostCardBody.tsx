import { Typography } from "@mui/material";
import React from "react";

const PostCardBody = ({ body }: any) => {
  return (
    <Typography variant="body1" mt={1.5}>
      {body}
    </Typography>
  );
};

export default PostCardBody;
