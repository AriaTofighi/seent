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
import { stopPropagation } from "../../utils/helpers";
import { useRouter } from "next/router";
import Link from "next/link";

const PostCardHeader = ({
  postId,
  author,
  userIsOwner,
  showActions,
  avatar,
  mutatePosts,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);
  const router = useRouter();

  const handleShowMenu = (event: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(event);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(event);
    setAnchorEl(null);
  };

  const handleDeletePost = async (event: any) => {
    stopPropagation(event);
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
          <Link href={`/profiles/${author.username}`}>
            <a>
              <Avatar
                src={avatar}
                // onClick={(event) => {
                //   stopPropagation(event);
                //   router.push(`/profiles/${author.username}`);
                // }}
              />
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
      <Menu anchorEl={anchorEl} open={showMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostCardHeader;
