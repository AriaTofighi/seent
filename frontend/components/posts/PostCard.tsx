import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import StyledCard from "../UI/StyledCard";
import PostCardBody from "./PostCardBody";
import { Styles } from "../../types/types";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";
import { formatDate } from "../../utils/helpers";
import { useUser } from "../../contexts/UserContext";
import usePostDialog from "../../hooks/usePostDialog";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

type Props = {
  postId: string;
  expandable?: boolean;
  depth?: number;
  showActions?: boolean;
};

const styles: Styles = {
  textBtn: {
    textTransform: "none",
    ml: 1,
    mt: 1,
  },
};

const MAX_POST_DEPTH = 2;

const PostCard = ({
  postId,
  depth = 0,
  expandable = false,
  showActions = true,
}: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(false);
  const { data: postsData, error: postsErr } = useSWR(`posts`);
  const { postDialog, setPostDialog, onCloseDialog } = usePostDialog();

  const posts = postsData?.data ?? [];
  const post = posts?.find((p: any) => p.postId === postId);
  const formattedDate = formatDate(post?.createdAt);

  const showViewMore =
    post?.childPosts?.length > 0 &&
    !expanded &&
    expandable &&
    depth <= MAX_POST_DEPTH;
  const showViewFullPost =
    post?.childPosts?.length > 0 && depth > MAX_POST_DEPTH;
  const userReaction = post?.reactions.find(
    (r: any) => r.userId === user?.userId
  );

  if (!post && !postsErr) {
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
              showActions={showActions}
            />
            <PostCardBody
              body={post?.body}
              image={post?.image}
              replyAuthor={post?.parentPost?.author.name}
            />
            <PostCardFooter
              postDate={formattedDate}
              userReaction={userReaction}
              allReactions={post.reactions}
              showActions={showActions}
              postId={postId}
            />
          </Box>
        </Link>
      </StyledCard>

      {expanded &&
        post?.childPosts.map((p: any) => (
          <>
            <Button sx={styles.textBtn} onClick={() => setExpanded(false)}>
              Hide replies
            </Button>
            <Box sx={{ mt: 1, ml: 3 }} key={p.postId}>
              <PostCard postId={p.postId} expandable depth={depth + 1} />
            </Box>
          </>
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
