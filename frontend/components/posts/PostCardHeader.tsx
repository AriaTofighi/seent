import React, { MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Stack,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { deletePost, updatedPost } from "../../services/api/postAxios";
import { stopPropagation } from "../../utils";
import { useRouter } from "next/router";
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

  const handleCloseMenu = (event: React.SyntheticEvent) => {
    stopPropagation(event as MouseEvent);
    handleClose();
  };

  const handleShowSelectPrivacy = (event: React.SyntheticEvent) => {
    stopPropagation(event as MouseEvent);
    handleClickPrivacy(event as any);
  };

  const handleClosePrivacyMenu = (event: React.SyntheticEvent) => {
    stopPropagation(event as MouseEvent);
    handleCloseMenu(event);
    handleClosePrivacy();
  };

  const handleDeletePost = async (event: React.SyntheticEvent) => {
    stopPropagation(event as MouseEvent);
    await deletePost(postId);
    mutatePosts();
    if (router.asPath.startsWith("posts/")) {
      router.push("/feed");
    }
  };

  const handleSelectPrivacy = async (
    event: React.SyntheticEvent,
    privacyMode: string
  ) => {
    stopPropagation(event as MouseEvent);
    await updatedPost(postId, { isPublic: privacyMode === "public" });
    await mutatePosts();
    handleCloseMenu(event);
    handleClosePrivacyMenu(event);
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
        handleClose={handleClosePrivacyMenu}
        handleMenuItemClick={handleSelectPrivacy}
      />
    </>
  );
};

export default PostCardHeader;
