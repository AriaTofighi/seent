import { Avatar, Button, Fade, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import PostsList from "../../components/posts/PostList";
import PostListSorting from "../../components/posts/PostListSorting";
import EditProfileDialog from "../../components/profile/EditProfileDialog";
import Title from "../../components/UI/Title";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import {
  NextPageWithLayout,
  PaginatedResult,
  PostEntity,
  POSTS_SORT_MODES,
  UserEntity,
} from "../../types";
import { infiniteSWRToFlat } from "../../utils";
import styles from "../../styles/profiles/[id].styles";

const Profile: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { user } = useUser();
  const {
    data: userRes,
    error: userErr,
    mutate: mutateUser,
    loading: userLoading,
  } = useAPI<UserEntity[]>(query ? `users?username=${query.id}` : null);
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);

  const profileUser = userRes?.[0];
  const userIsOwner = profileUser?.userId === user?.userId;

  const getPostsKey = (index: number) =>
    profileUser
      ? `posts?page=${
          index + 1
        }&isChild=false&orderBy=${sortMode}&perPage=10&authorId=${
          profileUser.userId
        }`
      : null;

  const {
    data: postsRes,
    error: postsErr,
    loading: postsLoading,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostsKey);

  const posts = infiniteSWRToFlat(postsRes);

  const loading = userLoading || postsLoading || !profileUser;

  const onSaveProfile = () => {
    mutateUser();
    setShowEditProfileDialog(false);
  };

  if (userErr || postsErr) {
    return <Box>Error loading data</Box>;
  }

  return (
    <>
      <Title title="Profile" />
      <TopAppBar title="Profile">
        <PostListSorting setMode={setSortMode} />
      </TopAppBar>
      {!loading ? (
        <>
          <Fade in timeout={700}>
            <Box sx={styles.profileHeaderContainer}>
              {userIsOwner && (
                <Button
                  sx={styles.editBtn}
                  variant="outlined"
                  onClick={() => setShowEditProfileDialog(true)}
                >
                  Edit
                </Button>
              )}

              <Box sx={styles.profileHeader}>
                <Avatar
                  src={
                    profileUser.images ? profileUser?.images[0]?.url : undefined
                  }
                  sx={styles.avatar}
                />
                <Stack
                  sx={{ justifyContent: "center", alignItems: "center", mb: 1 }}
                >
                  <Typography variant="h5">{profileUser?.name}</Typography>
                  <Typography variant="subtitle2" color="primary.main">
                    {`@${profileUser.username}`}{" "}
                    {profileUser.location && ` | ${profileUser.location}`}
                    {profileUser.gender && ` | ${profileUser.gender}`}
                  </Typography>
                  {profileUser.bio && (
                    <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                      {profileUser.bio}
                    </Typography>
                  )}
                </Stack>
              </Box>

              <Stack sx={styles.profileStatsContainer}>
                <Stack sx={styles.profileStats}>
                  <Stack sx={{ flexDirection: "column" }}>
                    <Typography fontWeight={600}>{posts.length}</Typography>
                    <Typography variant="subtitle2">
                      {posts.length === 1 ? "Post" : "Posts"}
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "column" }}>
                    <Typography fontWeight={600}>
                      {profileUser._count?.reactions}
                    </Typography>
                    <Typography variant="subtitle2">
                      {profileUser._count?.reactions === 1 ? "Like" : "Likes"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Fade>

          <PostsList getPostsKey={getPostsKey} />

          <EditProfileDialog
            open={showEditProfileDialog}
            setOpen={setShowEditProfileDialog}
            onSave={onSaveProfile}
          />
        </>
      ) : null}
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
