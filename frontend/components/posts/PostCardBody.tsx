import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";

const PostCardBody = ({ body, replyAuthor, image }: any) => {
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

      <Typography
        variant="body1"
        sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
      >
        {body}
      </Typography>
      {image && (
        <Box sx={{ width: "100%", height: "33vh", position: "relative" }}>
          <Image layout="fill" objectFit="cover" src={image?.url} />
        </Box>
      )}
    </Box>
  );
};

export default PostCardBody;
