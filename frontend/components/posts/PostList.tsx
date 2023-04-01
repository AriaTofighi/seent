import { Box, LinearProgress, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import usePostDialog from "../../hooks/usePostDialog";
import { PaginatedResult, PostEntity, Styles } from "../../types";
import { infiniteSWRToFlat } from "../../utils";
import FloatingButton from "../UI/FloatingButton";
import PostCard from "./PostCard";
import Loader from "../UI/Loader";
import { useRouter } from "next/router";
import { useUser } from "../../contexts/UserContext";

const PostDialog = dynamic(() => import("./PostDialog"), {
  ssr: false,
});

type Props = {
  getPostsKey: (index: number) => string | null;
  repliesMode?: boolean;
  feedMode?: boolean;
};

const PostList = ({
  getPostsKey,
  feedMode = false,
  repliesMode = false,
}: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const { query } = router;

  const ownProfile = query.id === user?.username;

  const { onNewPost, postDialog, setPostDialog, onCloseDialog } =
    usePostDialog();
  const {
    data: postsRes,
    size,
    setSize,
    loading,
    mutate: mutatePosts,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostsKey);

  const posts = infiniteSWRToFlat(postsRes);
  const hasMore = postsRes?.[postsRes.length - 1].meta?.next;
  const noResults = posts.length === 0 && !loading;

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      {!loading && (
        <>
          <Box sx={styles.posts}>
            {noResults && <Typography p={2}>No results</Typography>}
            {posts?.map(({ postId, ...rest }) => {
              const hasParent = !!rest.parentPostId;
              if (repliesMode || !hasParent) {
                return (
                  <PostCard
                    post={{ ...rest, postId }}
                    key={postId}
                    mutatePostList={mutatePosts}
                    nestParent={repliesMode}
                  />
                );
              }
            })}
          </Box>
          <Loader
            disabled={!hasMore}
            onClick={() => setSize(size + 1)}
            loading={loading}
          />
          {(ownProfile || feedMode) && (
            <>
              <FloatingButton onClick={onNewPost} />
              <PostDialog
                open={postDialog.open}
                setPostDialog={setPostDialog}
                onClose={onCloseDialog}
                parentPost={posts?.find(
                  (p) => p.postId === postDialog.parentPostId
                )}
                mutatePostList={mutatePosts}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

const styles: Styles = {
  posts: { display: "flex", flexDirection: "column", gap: 0 },
};

export default PostList;
