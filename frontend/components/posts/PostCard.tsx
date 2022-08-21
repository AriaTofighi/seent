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
import usePostDialog from "../../hooks/usePostDialog";
import dynamic from "next/dynamic";
import { Styles } from "../../types/types";
import {
  createReaction,
  deleteReaction,
} from "../../services/api/reactionAxios";
import { toast } from "react-toastify";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

type Props = {
  postId: string;
  expandable?: boolean;
  depth?: number;
  showActions?: boolean;
};

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.main,
  transition: "all 0.5s cubic-bezier(.25,.8,.25,1)",
  cursor: "pointer",
  whiteSpace: "pre-line",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const styles: Styles = {
  textBtn: {
    textTransform: "none",
    ml: 1,
    mt: 1,
  },
};

const PostCard = ({
  postId,
  depth = 0,
  expandable = false,
  showActions = true,
}: Props) => {
  const { data: posts, error: postsErr } = useSWR(`posts`);
  const { mutate } = useSWRConfig();

  const post = posts?.find((p: any) => p.postId === postId);

  const { onReply, postDialog, setPostDialog, onCloseDialog } = usePostDialog();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { user } = useUser();
  const showMenu = Boolean(anchorEl);
  const router = useRouter();
  const formattedDate = formatDate(post?.createdAt);
  const maxExpansionDepth = 2;
  const showViewMore =
    post?.childPosts?.length > 0 &&
    !expanded &&
    expandable &&
    depth <= maxExpansionDepth;
  const showViewFullPost =
    post?.childPosts?.length > 0 && depth > maxExpansionDepth;
  const userReaction = post.reactions.find(
    (r: any) => r.userId === user?.userId
  );

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

  const handleReply = () => {
    if (!onReply) return;
    if (!user) {
      return toast.info("Sign in to interact with others");
    }
    onReply(postId);
  };

  const handleReact = async (type: string) => {
    if (!user) {
      return toast.info("Sign in to interact with others");
    }
    if (Boolean(userReaction)) {
      await deleteReaction(postId, user.userId);
    } else {
      await createReaction(postId, user.userId, type);
    }
    mutate("posts");
  };

  if (!posts && !postsErr) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <StyledCard variant="elevation">
        <Link href={`/posts/${postId}`}>
          <Box>
            <PostCardHeader
              author={post?.author.name}
              userIsOwner={user?.userId === post?.authorId}
              handleShowMenu={handleShowMenu}
              replyMode={Boolean(onReply)}
            />
            <PostCardBody
              body={post?.body}
              replyAuthor={post?.parentPost?.author.name}
            />
            <PostCardFooter
              postDate={formattedDate}
              onReply={handleReply}
              onReact={handleReact}
              userReaction={userReaction}
              allReactions={post.reactions}
              showActions={showActions}
            />
          </Box>
        </Link>
      </StyledCard>

      {!showViewMore && (
        <Button sx={styles.textBtn} onClick={() => setExpanded(false)}>
          <Box>Hide replies</Box>
        </Button>
      )}

      {expanded &&
        post?.childPosts.map((p: any) => (
          <Box sx={{ mt: 1, ml: 3 }} key={p.postId}>
            <PostCard postId={p.postId} expandable depth={depth + 1} />
          </Box>
        ))}

      {showViewMore && (
        <Button sx={styles.textBtn} onClick={() => setExpanded(true)}>
          View {post?.childPosts?.length}{" "}
          {post?.childPosts?.length > 1 ? "replies" : "reply"}
        </Button>
      )}

      {showViewFullPost && (
        <Button
          sx={styles.textBtn}
          onClick={() => router.push(`/posts/${postId}`)}
        >
          View more replies in full post
        </Button>
      )}

      <Menu anchorEl={anchorEl} open={showMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
      <PostDialog
        open={postDialog.open}
        setPostDialog={setPostDialog}
        onClose={onCloseDialog}
        parentPost={posts?.find(
          (p: any) => p.postId === postDialog?.parentPostId
        )}
      />
    </>
  );
};

export default PostCard;
