import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import PostCard from "../../components/posts/PostCard";
import PostListSorting from "../../components/posts/PostListSorting";
import Header from "../../components/UI/Header";
import PostLoader from "../../components/UI/Loader";
import Title from "../../components/UI/Title";
import { useAPI } from "../../hooks/useAPI";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import {
  NextPageWithLayout,
  PaginatedResult,
  PostEntity,
  POSTS_SORT_MODES,
  Styles,
} from "../../types";
import { infiniteSWRToFlat } from "../../utils";

const PostDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);

  const {
    data: post,
    error: postErr,
    mutate: mutatePost,
    loading: postLoading,
  } = useAPI<PostEntity>(query.id ? `posts/${query.id}` : null);

  const getPostsKey = (index: number) =>
    query.id
      ? `posts?parentPostId=${query.id}&page=${
          index + 1
        }&perPage=10&orderBy=${sortMode}`
      : null;

  const {
    data: repliesRes,
    error: repliesErr,
    mutate: mutateReplies,
    size,
    setSize,
    loading: repliesLoading,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostsKey);

  const replies = infiniteSWRToFlat(repliesRes);

  if (postErr) {
    router.push("/feed");
    return null;
  }

  if (postLoading || repliesLoading || !post) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Title title={`Post - ${post?.author?.name}`} />
      <Box>
        <TopAppBar title="Post">
          <Stack width="100%" direction="row" justifyContent="flex-end">
            {post?.parentPost && (
              <Button
                sx={{ textTransform: "none", m: 0 }}
                onClick={() => router.push(`/posts/${post.parentPostId}`)}
              >
                View parent post
              </Button>
            )}
          </Stack>
        </TopAppBar>
        <PostCard
          post={post}
          mutatePost={mutatePost}
          mutatePostList={mutateReplies}
        />
        <Header>
          <Typography variant="h5">Replies</Typography>
          <PostListSorting setMode={setSortMode} />
        </Header>

        {replies.length > 0 ? (
          <>
            {replies.map((r) => {
              return (
                <Box key={r.postId}>
                  <PostCard
                    post={r}
                    expandable
                    mutatePost={mutatePost}
                    mutatePostList={mutateReplies}
                  />
                </Box>
              );
            })}
            <PostLoader
              disabled={!(repliesRes && repliesRes[size - 1].meta?.next)}
              onClick={() => setSize(size + 1)}
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
