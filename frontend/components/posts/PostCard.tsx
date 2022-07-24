import {
  Avatar,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { MouseEvent, useState } from "react";
import { Styles } from "../../types/types";
import { formatDate, stopPropagation } from "../../utils/helpers";
import { deletePost } from "../../services/api/postAxios";
import { useUser } from "../../contexts/UserContext";
import { useSWRConfig } from "swr";
import Link from "next/link";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import { useRouter } from "next/router";

type Props = {
  post: any;
  onReply?: (parentPostId: string) => void;
};

const styles: Styles = {
  root: {
    p: 2,
    boxShadow: "0px 4px 6px -1px, 0px 2px 4px -1px",
    backgroundColor: "secondary.light",
    color: "background.default",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    cursor: "pointer",
    whiteSpace: "pre-line",
    "&:hover": {
      backgroundColor: "#e0dfdf",
    },
  },
};

const PostCard = ({ post, onReply }: Props) => {
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
  const router = useRouter();

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
    router.push("/feed");
  };

  const handleReply = () => {
    if (!onReply) return;
    onReply(postId);
  };

  const handleReact = (type: string) => {
    console.log(type);
  };

  const reaction = "unlike";

  return (
    <>
      <Card variant="elevation" sx={styles.root}>
        <Link href={`/posts/${postId}`}>
          <Box>
            <PostCardHeader
              author={author}
              userIsOwner={user?.userId === authorId}
              handleShowMenu={handleShowMenu}
              replyMode={Boolean(onReply)}
            />
            <PostCardBody body={body} />
            {onReply && (
              <PostCardFooter
                postDate={formattedDate}
                onReply={handleReply}
                onReact={handleReact}
                reaction={reaction}
              />
            )}
          </Box>
        </Link>
      </Card>
      <Menu anchorEl={anchorEl} open={showMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostCard;
