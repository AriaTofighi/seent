import { Avatar, Card, Fade, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Styles } from "../types/types";
import { formatDate } from "../utils/helpers";

type Props = {
  body: string;
  author: string;
  createdAt: Date;
};

const styles: Styles = {
  root: {
    p: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    backgroundColor: "secondary.light",
    color: "background.default",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  },
  body: {
    backgroundColor: "secondary.light",
  },
};

const PostCard = ({ body, author, createdAt }: Props) => {
  const formattedDate = formatDate(createdAt);

  return (
    <Box>
      <Fade in>
        <Card sx={styles.root} variant="outlined">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar src="" />
            <Typography variant="subtitle2">{author}</Typography>
          </Stack>

          <Typography variant="body1" mt={1.5} sx={styles.body}>
            {body}
          </Typography>

          <Stack>
            <Box>
              <Typography variant="caption">{formattedDate}</Typography>
            </Box>
            <Box></Box>
          </Stack>
        </Card>
      </Fade>
    </Box>
  );
};

export default PostCard;
