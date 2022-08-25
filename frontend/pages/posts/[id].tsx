import useSWR from "swr";
import Head from "next/head";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import PostCard from "../../components/posts/PostCard";
import { NextPageWithLayout } from "../../types/types";
import { PostEntity } from "../../../backend/src/types";
import { Button, Stack, Typography } from "@mui/material";
import { getMainLayout } from "../../components/layouts/MainLayout";

const PostDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const router = useRouter();

  const { data: post, error: postErr } = useSWR<PostEntity>(
    query.id ? `posts/${query.id}` : null
  );

  const { data: postsData, error: postsErr } = useSWR<{
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

  console.log(replies);

  return (
    <>
      <Head>
        <title>Post - {post?.author?.name}</title>
        <meta property="og:title" content="Feed" key="title" />
      </Head>

      <Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="flex-start"
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Post
          </Typography>
          {post?.parentPost && (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => router.push(`/posts/${post.parentPostId}`)}
            >
              View original post
            </Button>
          )}
        </Stack>
        <PostCard postId={post?.postId ?? ""} post={post as any} />
        {replies.length > 0 && (
          <Typography variant="h5" sx={{ my: 2 }}>
            Replies
          </Typography>
        )}

        {replies.map((r: PostEntity) => {
          return (
            <Box key={r.postId} sx={{ mb: 1 }}>
              <PostCard postId={r.postId} post={r} expandable />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default PostDetails;

PostDetails.getLayout = getMainLayout;
