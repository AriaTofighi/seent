import { Stack, Avatar, Typography, Box, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const PostCardHeader = ({ author, userIsOwner, handleShowMenu }: any) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar src="" />
        <Typography variant="subtitle2">{author}</Typography>
      </Stack>
      <Box>
        {userIsOwner && handleShowMenu && (
          <IconButton onClick={handleShowMenu}>
            <MoreHorizIcon color="primary" />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default PostCardHeader;
