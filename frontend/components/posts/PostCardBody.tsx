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
          component="span"o
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
          sx={{
            maxWidth: "100%",
            height: 500,
            maxHeight: "33vh",
            position: "relative",
            my: 1,
            border: "1px solid",
            borderColor: "background.default",
            borderRadius: 1,
            bgcolor: "background.dark",
          }}
        >
          <Image
            layout="fill"
            objectFit="contain"
            src={image?.url}
            // style={{ borderRadius: 4 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostCardBody;
