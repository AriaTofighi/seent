import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { stopPropagation } from "../../utils/helpers";

type Props = {
  postDate: string;
  onReply: () => void;
};

const PostCardFooter = ({ postDate, onReply }: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      mt={1}
    >
      <Box>
        <Typography variant="caption">{postDate}</Typography>
      </Box>
      <Stack direction="row" gap={2} onClick={stopPropagation}>
        <Tooltip title="Like">
          <IconButton sx={{ p: 0 }}>
            <FavoriteBorderIcon color="secondary" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reply">
          <IconButton sx={{ p: 0 }} onClick={onReply}>
            <ReplyIcon color="secondary" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default PostCardFooter;
