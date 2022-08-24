import React from "react";
import Image from "next/image";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

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
        <Box
          sx={{ width: "100%", height: "33vh", position: "relative", my: 1 }}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src={image?.url}
            style={{ borderRadius: 4 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostCardBody;
