import { Avatar, Button, Fade, Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostsList from "../components/posts/PostList";
import PostListSorting from "../components/posts/PostListSorting";
import EditProfileDialog from "../components/profile/EditProfileDialog";
import Title from "../components/UI/Title";
import { useUser } from "../contexts/UserContext";
import { useAPI } from "../hooks/useAPI";
import useInfiniteAPI from "../hooks/useInfiniteAPI";
import {
  FriendshipEntity,
  FriendshipStatus,
  NextPageWithLayout,
  PaginatedResult,
  PostEntity,
  POSTS_SORT_MODES,
  UserEntity,
} from "../types";
import { infiniteSWRToFlat } from "../utils";
import styles from "../styles/[id].styles";
import UserAvatar from "../components/users/UserAvatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  createFriendship,
  deleteFriendship,
  updateFriendship,
} from "../services/api/friendshipAxios";

const Profile: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { user } = useUser();
  const {
    data: userRes,
    error: userErr,
    mutate: mutateUser,
    loading: userLoading,
  } = useAPI<UserEntity[]>(query ? `users?username=${query.id}` : null);

  const profileUser = userRes?.[0];
  const userIsOwner = profileUser?.userId === user?.userId;

  const {
    data: friendshipRes,
    error: friendshipErr,
    mutate: mutateFriendship,
    loading: friendshipLoading,
  } = useAPI<FriendshipEntity>(
    !userIsOwner && user && profileUser
      ? `friendships/pair?userIdOne=${user?.userId}&userIdTwo=${profileUser?.userId}`
      : null
  );

  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);

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

  const onAcceptFriendRequest = async () => {
    if (!friendshipRes) return;
    await updateFriendship(friendshipRes.friendshipId, {
      status: FriendshipStatus.ACCEPTED as keyof typeof FriendshipStatus,
    });
    mutateFriendship();
  };

  const onSendFriendRequest = async () => {
    if (!profileUser || !user) return;
    await createFriendship({
      recipientId: profileUser.userId,
      senderId: user.userId,
      status: FriendshipStatus.PENDING as keyof typeof FriendshipStatus,
    });
    mutateFriendship();
  };

  const onUnfriend = async () => {
    if (!friendshipRes) return;
    await deleteFriendship(friendshipRes.friendshipId);
    mutateFriendship(undefined);
  };

  const onFriendButtonClick = () => {
    if (friendshipRes?.status === (FriendshipStatus.PENDING as any)) {
      if (friendshipRes?.recipientId === user?.userId) {
        onAcceptFriendRequest();
      } else {
        onUnfriend();
      }
    } else if (friendshipRes?.status === (FriendshipStatus.ACCEPTED as any)) {
      onUnfriend();
    } else {
      onSendFriendRequest();
    }
  };

  const getFriendshipText = () => {
    if (
      friendshipRes?.status === (FriendshipStatus.PENDING as any) &&
      friendshipRes?.recipientId === user?.userId
    ) {
      return "Accept Request";
    }
    if (
      friendshipRes?.status === (FriendshipStatus.PENDING as any) &&
      friendshipRes?.senderId === user?.userId
    ) {
      return "Cancel Request";
    }
    if (friendshipRes?.status === (FriendshipStatus.ACCEPTED as any)) {
      return "Unfriend";
    }
    return "Add Friend";
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

              {!userIsOwner && (
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    sx={styles.editBtn}
                    variant="outlined"
                    onClick={onFriendButtonClick}
                  >
                    <PersonAddIcon />
                    {getFriendshipText()}
                  </Button>
                </Stack>
              )}

              <Box sx={styles.profileHeader}>
                <UserAvatar
                  userId={profileUser.userId}
                  username={profileUser.username}
                  avatarUrl={profileUser.images?.[0]?.url}
                  AvatarProps={{ sx: styles.avatar }}
                />
                <Stack
                  sx={{ justifyContent: "center", alignItems: "center", mb: 1 }}
                >
                  <Typography variant="h4">{profileUser?.name}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
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

          <PostsList
            getPostsKey={getPostsKey}
            repliesMode={profileUser.userId !== user?.userId}
          />

          <EditProfileDialog
            open={showEditProfileDialog}
            setOpen={setShowEditProfileDialog}
            onSave={onSaveProfile}
          />
        </>
      ) : (
        <Box p={2}>Loading...</Box>
      )}
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
