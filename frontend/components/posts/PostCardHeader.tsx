import React, { MouseEvent, MouseEventHandler, useState } from "react";
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
import { stopPropagation } from "../../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import useMenu from "../../hooks/useMenu";

const PostCardHeader = ({
  postId,
  author,
  userIsOwner,
  showActions,
  avatar,
  mutatePosts,
}: any) => {
  const { anchorEl, handleClick, handleClose, open } = useMenu();
  const router = useRouter();

  const handleShowMenu = (event: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(event);
    handleClick(event);
  };

  const handleCloseMenu = (event: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(event);
    handleClose();
  };

  const handleDeletePost = async (event: React.SyntheticEvent) => {
    stopPropagation(event as MouseEvent);
    await deletePost(postId);
    mutatePosts();
    if (router.asPath.startsWith("posts/")) {
      router.push("/feed");
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center">
          <Link href={`/${author.username}`}>
            <a>
              <Avatar src={avatar} />
            </a>
          </Link>

          <Typography variant="subtitle2">{author.name}</Typography>
        </Stack>
        <Box>
          {userIsOwner && showActions && (
            <IconButton onClick={handleShowMenu}>
              <MoreHorizIcon color="action" />
            </IconButton>
          )}
        </Box>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostCardHeader;
