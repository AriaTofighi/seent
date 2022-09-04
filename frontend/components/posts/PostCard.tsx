import { Button } from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { PostEntity, ReactionEntity } from "../../../backend/src/types";
import { useUser } from "../../contexts/UserContext";
import usePostDialog from "../../hooks/usePostDialog";
import { Styles } from "../../types/types";
import { formatDateTime } from "../../utils/helpers";
import StyledCard from "../UI/StyledCard";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

type Props = {
  postId: string;
  expandable?: boolean;
  depth?: number;
  showActions?: boolean;
  post: PostEntity;
  postsRes: any;
  mutatePost?: () => void;
  mutatePostList: () => void;
};

const getStyles = (depth: number): Styles => {
  return {
    textBtn: {
      textTransform: "none",
    },
    footerBtn: {
      pb: 1,
      pl: 1,
      borderBottom: "1px solid",
      borderLeft: depth > 0 ? "1px solid" : "none",
      width: "100%",
      borderColor: "divider",
    },
  };
};

const MAX_POST_DEPTH_PER_PAGE = 2;

const PostCard = ({
  postId,
  post,
  mutatePost,
  mutatePostList,
  postsRes,
  depth = 0,
  expandable = false,
  showActions = true,
}: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const childPostsLength = post?._count?.childPosts;
  const [expanded, setExpanded] = useState<boolean>(false);
  const { data: childPostsData, mutate: mutateNestedReplies } = useSWR(
    expanded ? `posts?parentPostId=${postId}` : null
  );
  const { onReply, postDialog, setPostDialog, onCloseDialog } = usePostDialog();

  const childPosts = childPostsData?.data ?? [];
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
    await mutatePostList();
    await mutateNestedReplies?.();
    mutatePost?.();
  };

  if (!post || !post.images) {
    return <Box>Loading...</Box>;
  }

  useEffect(() => {
    if (childPostsLength < 1) {
      setExpanded(false);
    }
  }, [childPostsLength]);

  return (
    <>
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
              postsRes={postsRes}
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

          {childPosts.map((p: PostEntity) => (
            <Box sx={{ ml: 3 }} key={p.postId}>
              <PostCard
                postId={p.postId}
                post={p}
                expandable
                depth={depth + 1}
                mutatePost={mutatePost}
                mutatePostList={() => {
                  mutateAllPosts();
                }}
                postsRes={postsRes}
              />
            </Box>
          ))}
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
        postsRes={postsRes}
        mutatePost={mutatePost}
        mutatePostList={mutateAllPosts}
      />
    </>
  );
};

export default PostCard;
