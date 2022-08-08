import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getMainLayout } from "../../components/layouts/MainLayout";
import PostCard from "../../components/posts/PostCard";
import usePostDialog from "../../hooks/usePostDialog";
import { NextPageWithLayout } from "../../types/types";

const PostDialog = dynamic(() => import("../../components/posts/PostDialog"), {
  ssr: false,
});

const PostDetails: NextPageWithLayout = ({}: any) => {
  const { query } = useRouter();
  const router = useRouter();

  const { onReply, postDialog, setPostDialog, onCloseDialog } = usePostDialog();

  const { data: post, error: postErr } = useSWR(
    query.id ? `posts/${query.id}` : null
  );

  const { data: posts, error: postsErr } = useSWR("posts");

  const replies = posts?.filter((p: any) => p.parentPostId === query.id);

  const postLoading = !postErr && !post;
  const repliesLoading = !posts && !postsErr;

  if (postLoading || repliesLoading) {
    return <div>Loading...</div>;
  }

  if (postErr) {
    return <div>Error fetching data</div>;
  }

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
          {post.parentPost && (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => router.push(`/posts/${post.parentPostId}`)}
            >
              View parent post
            </Button>
          )}
        </Stack>
        <PostCard post={post} onReply={onReply} />
        {replies.length > 0 && (
          <Typography variant="h5" sx={{ my: 2 }}>
            Replies
          </Typography>
        )}

        {replies.map((r: any) => {
          return (
            <Box key={r.postId} sx={{ mb: 1 }}>
              <PostCard post={r} onReply={onReply} expandable />
            </Box>
          );
        })}
      </Box>
      <PostDialog
        open={postDialog.open}
        setPostDialog={setPostDialog}
        onClose={onCloseDialog}
        parentPost={posts?.find(
          (p: any) => p.postId === postDialog?.parentPostId
        )}
      />
    </>
  );
};

export default PostDetails;

PostDetails.getLayout = getMainLayout;
