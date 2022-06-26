import {
  Avatar,
  Card,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { MouseEvent, useState } from "react";
import { Styles } from "../../types/types";
import { formatDate } from "../../utils/helpers";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deletePost } from "../../services/api/postAxios";
import { useUser } from "../../contexts/UserContext";
import { useSWRConfig } from "swr";

type Props = {
  post: any;
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

const PostCard = ({ post }: Props) => {
  const {
    author: { name: author },
    authorId,
    createdAt,
    body,
    postId,
  } = post;
  const formattedDate = formatDate(createdAt);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const handleShowMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    await deletePost(postId);
    mutate("posts");
  };

  return (
    <Box>
      <Fade in>
        <Card sx={styles.root} variant="elevation">
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={2} direction="row" alignItems="center">
              <Avatar src="" />
              <Typography variant="subtitle2">{author}</Typography>
            </Stack>
            <Box>
              {user?.userId === authorId && (
                <IconButton onClick={handleShowMenu}>
                  <MoreHorizIcon color="primary" />
                </IconButton>
              )}
            </Box>
          </Stack>
          <Typography variant="body1" mt={1.5} sx={styles.body}>
            {body}
          </Typography>

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Box>
              <Typography variant="caption">{formattedDate}</Typography>
            </Box>
            <Stack direction="row" gap={2}>
              <Typography variant="caption">Like</Typography>
              <Typography variant="caption">Comment</Typography>
            </Stack>
          </Stack>
        </Card>
      </Fade>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={showMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default PostCard;
