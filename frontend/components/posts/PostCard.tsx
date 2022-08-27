import useSWR, { KeyedMutator } from "swr";
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
import { PostEntity, ReactionEntity } from "../../../backend/src/types";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

type Props = {
  postId: string;
  expandable?: boolean;
  depth?: number;
  showActions?: boolean;
  post: PostEntity;
  mutate?: () => void;
};

const styles: Styles = {
  textBtn: {
    textTransform: "none",
    ml: 1,
    mt: 1,
  },
};

const MAX_POST_DEPTH_PER_PAGE = 2;

const PostCard = ({
  postId,
  post,
  depth = 0,
  mutate,
  expandable = false,
  showActions = true,
}: Props) => {
  const childPostsLength = post?._count?.childPosts;
  const { user } = useUser();
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    data: childPostsData,
    error: childPostsErr,
    mutate: mutateChildPosts,
  } = useSWR(expanded ? `posts?parentPostId=${postId}` : null);
  const { onReply, postDialog, setPostDialog, onCloseDialog } = usePostDialog();

  const childPosts = childPostsData?.data ?? [];
  const formattedDate = formatDate(post?.createdAt);
  const showViewMore =
    childPostsLength > 0 &&
    !expanded &&
    expandable &&
    depth <= MAX_POST_DEPTH_PER_PAGE;
  const showViewFullPost =
    childPostsLength > 0 && depth > MAX_POST_DEPTH_PER_PAGE;
  const userReaction = post?.reactions.find(
    (r: ReactionEntity) => r.userId === user?.userId
  );

  const mutateAll = () => {
    if (mutate) {
      mutate();
    }
    mutateChildPosts();
  };

  if (!post || !post.images) {
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
              postId={postId}
              avatar={post.author.images[0].url}
              mutate={mutate}
            />
            <PostCardBody
              body={post?.body}
              image={post?.images[0]}
              replyAuthor={post?.parentPost?.author.name}
            />
            <PostCardFooter
              postDate={formattedDate}
              userReaction={userReaction}
              allReactions={post.reactions}
              showActions={showActions}
              postId={postId}
              onReply={onReply}
              mutate={mutateAll}
            />
          </Box>
        </Link>
      </StyledCard>

      {expanded && (
        <>
          <Button sx={styles.textBtn} onClick={() => setExpanded(false)}>
            Hide replies
          </Button>
          {childPosts.map((p: PostEntity) => (
            <Box sx={{ mt: 1, ml: 3 }} key={p.postId}>
              <PostCard
                postId={p.postId}
                post={p}
                expandable
                depth={depth + 1}
                mutate={mutateChildPosts}
              />
            </Box>
          ))}
        </>
      )}

      {showViewMore && (
        <Button sx={styles.textBtn} onClick={() => setExpanded(true)}>
          View {childPostsLength} {childPostsLength > 1 ? "replies" : "reply"}
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
        parentPost={post}
        mutate={mutateAll}
      />
    </>
  );
};

export default PostCard;
