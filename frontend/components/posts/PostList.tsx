import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import usePostDialog from "../../hooks/usePostDialog";
import { PaginatedResult, PostEntity, Styles } from "../../types";
import { infiniteSWRToFlat } from "../../utils";
import FloatingButton from "../UI/buttons/FloatingButton";
import PostCard from "./PostCard";
import PostLoader from "./PostLoader";

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
    error: postsErr,
    size,
    setSize,
    loading,
    mutate: mutatePosts,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostsKey);

  const posts = infiniteSWRToFlat(postsRes);

  return (
    <>
      {!loading && (
        <>
          <Box sx={styles.posts}>
            {posts?.map(({ postId, ...rest }) => {
              if (!{ ...rest }.parentPostId) {
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
          <PostLoader
            disabled={!(postsRes && postsRes[size - 1].meta?.next)}
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
