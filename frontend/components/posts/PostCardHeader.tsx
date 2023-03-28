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
import { deletePost, updatedPost } from "../../services/api/postAxios";
import { stopPropagation } from "../../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import useMenu from "../../hooks/useMenu";
import UserAvatar from "../users/UserAvatar";
import PostPrivacyMenu from "./PostPrivacyMenu";

const PostCardHeader = ({
  postId,
  author,
  userIsOwner,
  showActions,
  avatar,
  mutatePosts,
  isPublic,
}: any) => {
  const { anchorEl, handleClick, handleClose, open } = useMenu();
  const {
    anchorEl: anchorElPrivacy,
    handleClick: handleClickPrivacy,
    handleClose: handleClosePrivacy,
    open: openPrivacy,
  } = useMenu();

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

  const handleShowSelectPrivacy = (event: React.SyntheticEvent) => {
    stopPropagation(event as MouseEvent);
    handleClickPrivacy(event as any);
  };

  const handleSelectPrivacy = async (privacyMode: string) => {
    await updatedPost(postId, { isPublic: privacyMode === "public" });
    await mutatePosts();
    handleClosePrivacy();
    handleClose();
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center">
          <UserAvatar
            userId={author.userId}
            username={author.username}
            avatarUrl={avatar}
          />
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
        <MenuItem onClick={handleShowSelectPrivacy}>{`Set visibility (${
          isPublic ? "Everyone" : "Friends Only"
        })`}</MenuItem>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
      <PostPrivacyMenu
        anchorEl={anchorElPrivacy}
        open={openPrivacy}
        handleClose={handleClosePrivacy}
        handleMenuItemClick={handleSelectPrivacy}
      />
    </>
  );
};

export default PostCardHeader;
