import React, { MouseEvent, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Stack,
  Avatar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { deletePost } from "../../services/api/postAxios";
import { useSWRConfig } from "swr";
import { stopPropagation } from "../../utils/helpers";

const PostCardHeader = ({ postId, author, userIsOwner, showActions }: any) => {
  const { mutate } = useSWRConfig();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);

  const handleShowMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    stopPropagation(event);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    await deletePost(postId);
    mutate("posts");
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src="" />
          <Typography variant="subtitle2">{author}</Typography>
        </Stack>
        <Box>
          {userIsOwner && handleShowMenu && showActions && (
            <IconButton onClick={handleShowMenu}>
              <MoreHorizIcon color="action" />
            </IconButton>
          )}
        </Box>
      </Stack>
      <Menu anchorEl={anchorEl} open={showMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostCardHeader;
