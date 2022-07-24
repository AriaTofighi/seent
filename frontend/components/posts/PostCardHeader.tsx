import { Stack, Avatar, Typography, Box, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const PostCardHeader = ({
  author,
  userIsOwner,
  handleShowMenu,
  replyMode,
}: any) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar src="" />
        <Typography variant="subtitle2">{author}</Typography>
      </Stack>
      <Box>
        {userIsOwner && handleShowMenu && replyMode && (
          <IconButton onClick={handleShowMenu}>
            <MoreHorizIcon color="primary" />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default PostCardHeader;
