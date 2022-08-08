import { Button, Card, Menu, MenuItem } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { MouseEvent, useState } from "react";
import { formatDate, stopPropagation } from "../../utils/helpers";
import { deletePost } from "../../services/api/postAxios";
import { useUser } from "../../contexts/UserContext";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import { useRouter } from "next/router";
import { alpha } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type Props = {
  post: any;
  onReply?: (parentPostId: string) => void;
  expandable?: boolean;
  depth?: number;
};

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.main,
  transition: "all 0.5s cubic-bezier(.25,.8,.25,1)",
  cursor: "pointer",
  whiteSpace: "pre-line",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const PostCard = ({ post, onReply, depth = 0, expandable = false }: Props) => {
  const {
    author: { name: author },
    authorId,
    createdAt,
    body,
    postId,
    childPosts,
  } = post;
  const useFullPost = childPosts === undefined;

  const { data: fullPost, error: fullPostErr } = useSWR(
    useFullPost ? `posts/${postId}` : null
  );

  const subPosts = useFullPost ? fullPost?.childPosts : childPosts;
  const formattedDate = formatDate(createdAt);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);
  const { user } = useUser();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  // const [expanded, setExpanded] = useState<boolean>(expandable && depth < 1);
  const [expanded, setExpanded] = useState<boolean>(false);

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

  if (useFullPost && !fullPost && !fullPostErr) {
    return <Box></Box>;
  }

  return (
    <>
      <StyledCard variant="elevation">
        <Link href={`/posts/${postId}`}>
          <Box>
            <PostCardHeader
              author={author}
              userIsOwner={user?.userId === authorId}
              handleShowMenu={handleShowMenu}
              replyMode={Boolean(onReply)}
            />
            <PostCardBody
              body={body}
              replyAuthor={fullPost?.parentPost.author.name}
            />
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
      </StyledCard>

      {subPosts?.length > 0 && expanded && (
        <Button
          sx={{
            textTransform: "none",
            mt: 1,
            ml: 1,
          }}
          onClick={() => setExpanded(false)}
        >
          <Box>Hide replies</Box>
          <ExpandLessIcon sx={{ mr: -0.5 }} />
        </Button>
      )}

      {expanded &&
        subPosts.map((p: any) => (
          <Box sx={{ mt: 1, ml: 3 }} key={p.postId}>
            <PostCard post={p} onReply={onReply} expandable depth={depth + 1} />
          </Box>
        ))}

      {subPosts?.length > 0 && !expanded && expandable && depth <= 3 && (
        <Button
          sx={{ textTransform: "none", ml: 1, mt: 1 }}
          onClick={() => setExpanded(true)}
        >
          View {subPosts?.length} {subPosts?.length > 1 ? "replies" : "reply"}
          <ExpandMoreIcon sx={{ mr: -0.5 }} />
        </Button>
      )}

      {subPosts?.length > 0 && depth > 3 && (
        <Button
          sx={{ textTransform: "none", ml: 1, mt: 1 }}
          onClick={() => router.push(`/posts/${postId}`)}
        >
          View more replies in full post
        </Button>
      )}

      <Menu anchorEl={anchorEl} open={showMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default PostCard;
