import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
import usePostDialog from "../../hooks/usePostDialog";
import { Styles } from "../../types/types";
import { infiniteSWRToFlat } from "../../utils";
import FloatingButton from "../UI/buttons/FloatingButton";
import PostCard from "./PostCard";
import PostLoader from "./PostLoader";

const PostDialog = dynamic(() => import("./PostDialog"), {
  ssr: false,
});

const styles: Styles = {
  posts: { display: "flex", flexDirection: "column", gap: 0 },
};

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
    mutate: mutatePosts,
    isValidating,
  } = useSWRInfinite(getPostsKey) as any;

  const posts: any[] = infiniteSWRToFlat(postsRes);

  const isLoading = !postsRes && !postsErr;

  return (
    <>
      {!isLoading && (
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
            postsRes={postsRes}
            size={size}
            setSize={setSize}
            loading={isLoading}
          />
          {!repliesMode && (
            <>
              <FloatingButton onClick={onNewPost} />
              <PostDialog
                open={postDialog.open}
                setPostDialog={setPostDialog}
                onClose={onCloseDialog}
                parentPost={posts?.find(
                  (p: any) => p.postId === postDialog.parentPostId
                )}
                postsRes={postsRes}
                mutatePostList={mutatePosts}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PostList;
