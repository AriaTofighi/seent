import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import usePostDialog from "../../hooks/usePostDialog";
import { PaginatedResult, PostEntity, Styles } from "../../types";
import { infiniteSWRToFlat } from "../../utils";
import FloatingButton from "../UI/buttons/FloatingButton";
import PostCard from "./PostCard";
import PostLoader from "./Loader";
import Loader from "./Loader";

const PostDialog = dynamic(() => import("./PostDialog"), {
  ssr: false,
});

type Props = {
  getPostsKey: (index: number) => string | null;
  repliesMode?: boolean;
};

const PostList = ({ getPostsKey, repliesMode = false }: Props) => {
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
                    postId={postId}
                    post={{ ...rest, postId }}
                    key={postId}
                    postsRes={postsRes}
                    mutatePostList={mutatePosts}
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
          {!repliesMode && (
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
