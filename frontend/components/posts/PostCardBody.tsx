import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const PostCardBody = ({ body, replyAuthor }: any) => {
  return (
    <Box sx={{ mt: 1 }}>
      {/* {replyAuthor && (
        <Typography
          variant="body1"
          component="span"
          sx={{ mr: 0.5, fontWeight: "bold" }}
        >
          @{replyAuthor}
        </Typography>
      )} */}

      <Typography variant="body1" component="span">
        {body}
      </Typography>
    </Box>
  );
};

export default PostCardBody;
