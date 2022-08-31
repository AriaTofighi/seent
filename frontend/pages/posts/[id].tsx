import useSWR, { mutate } from "swr";
import Head from "next/head";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import PostCard from "../../components/posts/PostCard";
import { NextPageWithLayout, Styles } from "../../types/types";
import { PostEntity } from "../../../backend/src/types";
import { Button, Stack, Typography } from "@mui/material";
import { getMainLayout } from "../../components/layouts/MainLayout";
import PageHead from "../../components/UI/Title";
import Title from "../../components/UI/Title";
import TopAppBar from "../../components/navigation/TopAppBar";

const styles: Styles = {
  header: {
    p: 2,
    borderBottom: "1px solid",
    width: "100%",
    borderColor: "divider",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const PostDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const router = useRouter();

  const {
    data: post,
    error: postErr,
    mutate: mutatePost,
  } = useSWR<PostEntity>(query.id ? `posts/${query.id}` : null);

  const {
    data: postsData,
    error: postsErr,
    mutate: mutateReplies,
  } = useSWR<{
    data: PostEntity[];
    meta: any;
  }>(query.id ? `posts?parentPostId=${query.id}` : null);
  const replies = postsData?.data ?? [];

  const postLoading = !postErr && !post;
  const repliesLoading = !postsData && !postsErr;

  if (postLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  if (postErr) {
    return <div>Error fetching data</div>;
  }

  const mutateAll = () => {
    mutateReplies();
    mutatePost();
  };

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
        {/* <Stack sx={styles.header}></Stack> */}
        <PostCard
          postId={post?.postId ?? ""}
          post={post as any}
          mutate={mutateAll}
        />
        <Typography variant="h5" sx={styles.header}>
          Replies
        </Typography>

        {replies.length > 0 ? (
          replies.map((r: PostEntity) => {
            return (
              <Box key={r.postId}>
                <PostCard
                  postId={r.postId}
                  post={r}
                  expandable
                  mutate={mutateAll}
                />
              </Box>
            );
          })
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
