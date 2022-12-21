import { Button } from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import usePostDialog from "../../hooks/usePostDialog";
import { PostEntity, ReactionEntity, Styles } from "../../types";
import { formatDateTime } from "../../utils";
import StyledCard from "../UI/StyledCard";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

const getStyles = (depth: number): Styles => {
  return {
    textBtn: {
      textTransform: "none",
      p: 1.5,
      width: "100%",
      justifyContent: "flex-start",
      fontSize: "0.9em",
    },
    footerBtn: {
      borderBottom: "1px solid",
      borderLeft: depth > 0 ? "1px solid" : "none",
      width: "100%",
      borderColor: "divider",
    },
  };
};

const MAX_POST_DEPTH_PER_PAGE = 2;

type Props = {
  postId: string;
  post: PostEntity;
  isLast?: boolean;
  expandable?: boolean;
  depth?: number;
  showActions?: boolean;
  postsRes?: any;
  mutatePost?: () => void;
  mutatePostList?: () => void;
};

const PostCard = ({
  postId,
  post,
  mutatePost,
  mutatePostList,
  postsRes,
  isLast = true,
  depth = 0,
  expandable = false,
  showActions = true,
}: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const childPostsLength = post?._count?.childPosts;
  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    data: nestedRepliesRes,
    mutate: mutateNestedReplies,
    error: nestedRepliesErr,
    loading: nestedRepliesLoading,
  } = useAPI<PostEntity[]>(expanded ? `posts?parentPostId=${postId}` : null);
  const { onReply, postDialog, setPostDialog, onCloseDialog } = usePostDialog();

  const nestedReplies = nestedRepliesRes ?? [];
  const formattedDate = formatDateTime(post?.createdAt);
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

  const getBoxStyles = () => {
    let styles = {};
    if (childPostsLength > 0 && expandable) {
      styles = { borderBottom: "none" };
    }
    if (depth > 0) {
      styles = { ...styles, borderLeft: 1, borderColor: "divider" };
    }
    return styles;
  };

  const mutateAllPosts = async () => {
    mutatePostList?.();
    mutateNestedReplies?.();
    if (router.query?.id) {
      mutatePost?.();
    }
  };

  useEffect(() => {
    if (childPostsLength < 1) {
      setExpanded(false);
    }
  }, [childPostsLength]);

  if (!post || !post.images) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <StyledCard
        variant="outlined"
        sx={{ ...getBoxStyles(), cursor: "pointer", pb: 1.5 }}
      >
        <Link href={`/posts/${postId}`}>
          <Box>
            <PostCardHeader
              author={post?.author}
              userIsOwner={user?.userId === post?.authorId}
              showActions={showActions}
              postId={postId}
              avatar={post.author.images[0]?.url}
              mutatePosts={mutateAllPosts}
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
              mutatePosts={mutateAllPosts}
              childPostsCount={post._count?.childPosts ?? 0}
            />
          </Box>
        </Link>
      </StyledCard>

      {expanded && (
        <>
          <Box sx={getStyles(depth).footerBtn}>
            <Button
              sx={getStyles(depth).textBtn}
              onClick={() => setExpanded(false)}
            >
              Hide replies
            </Button>
          </Box>
          {nestedRepliesErr ? (
            <Box>Error loading replies</Box>
          ) : (
            <>
              {nestedReplies.map((p: PostEntity, index) => (
                <Box sx={{ display: "flex", width: "100%" }} key={index}>
                  <Box
                    sx={{
                      width: 24,
                      borderBottom: isLast ? "none" : "1px solid",
                      borderColor: "divider",
                      alignSelf: "stretch",
                    }}
                    key={p.postId}
                  />
                  <PostCard
                    postId={p.postId}
                    post={p}
                    expandable
                    depth={depth + 1}
                    mutatePost={mutatePost}
                    mutatePostList={() => {
                      mutatePostList?.();
                      mutateNestedReplies?.();
                    }}
                    postsRes={postsRes}
                    isLast={index === nestedReplies.length - 1}
                  />
                </Box>
              ))}
            </>
          )}
        </>
      )}

      {showViewMore && (
        <Box sx={getStyles(depth).footerBtn}>
          <Button
            sx={getStyles(depth).textBtn}
            onClick={() => setExpanded(true)}
          >
            View {childPostsLength} {childPostsLength > 1 ? "replies" : "reply"}
          </Button>
        </Box>
      )}

      {showViewFullPost && (
        <Box sx={getStyles(depth).footerBtn}>
          <Button
            sx={getStyles(depth).textBtn}
            onClick={() => router.push(`/posts/${postId}`)}
          >
            View more replies in full post
          </Button>
        </Box>
      )}

      <PostDialog
        open={postDialog.open}
        setPostDialog={setPostDialog}
        onClose={onCloseDialog}
        parentPost={post}
        mutatePostList={mutateAllPosts}
      />
    </Box>
  );
};

export default PostCard;
