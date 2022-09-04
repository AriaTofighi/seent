import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { PostEntity } from "../../../backend/src/types";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import PostCard from "../../components/posts/PostCard";
import PostListSorting from "../../components/posts/PostListSorting";
import PostLoader from "../../components/posts/PostLoader";
import Title from "../../components/UI/Title";
import { NextPageWithLayout, Styles } from "../../types/types";
import { infiniteSWRToFlat } from "../../utils/helpers";
import { POSTS_SORT_MODES } from "../feed";

const styles: Styles = {
  header: {
    p: 2,
    borderBottom: "1px solid",
    width: "100%",
    borderColor: "divider",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
};

const PostDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);

  const {
    data: post,
    error: postErr,
    mutate: mutatePost,
  } = useSWR<PostEntity>(query.id ? `posts/${query.id}` : null);
  const getPostsKey = (index: number) =>
    query.id
      ? `posts?parentPostId=${query.id}&page=${
          index + 1
        }&perPage=10&orderBy=${sortMode}`
      : null;
  const {
    data: postsRes,
    error: postsErr,
    mutate: mutateReplies,
    size,
    setSize,
  } = useSWRInfinite(getPostsKey) as any;

  const replies = infiniteSWRToFlat(postsRes);

  const postLoading = !postErr && !post;
  const repliesLoading = !postsRes && !postsErr;

  if (postLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  if (postErr) {
    router.push("/feed");
  }

  return (
    <>
      <Title title={`Post - ${post?.author.name}`} />
      <Box>
        <TopAppBar title="Post">
          <Stack width="100%" direction="row" justifyContent="flex-end">
            {post?.parentPost && (
              <Button
                sx={{ textTransform: "none", m: 0 }}
                onClick={() => router.push(`/posts/${post.parentPostId}`)}
              >
                View original post
              </Button>
            )}
          </Stack>
        </TopAppBar>
        <PostCard
          postId={post?.postId ?? ""}
          post={post as any}
          postsRes={postsRes}
          mutatePost={mutatePost}
          mutatePostList={async () => {
            await mutatePost();
            mutateReplies();
          }}
        />
        <Box sx={styles.header}>
          <Typography variant="h5">Replies</Typography>
          <PostListSorting setMode={setSortMode} />
        </Box>

        {replies.length > 0 ? (
          <>
            {replies.map((r: PostEntity) => {
              return (
                <Box key={r.postId}>
                  <PostCard
                    postId={r.postId}
                    post={r}
                    expandable
                    postsRes={postsRes}
                    mutatePost={mutatePost}
                    mutatePostList={async () => {
                      await mutateReplies();
                      mutatePost();
                    }}
                  />
                </Box>
              );
            })}
            <PostLoader
              postsRes={postsRes}
              size={size}
              setSize={setSize}
              loading={repliesLoading}
            />
          </>
        ) : (
          <Typography sx={{ p: 3, textAlign: "center" }}>
            There are no replies yet.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default PostDetails;

PostDetails.getLayout = getMainLayout;
