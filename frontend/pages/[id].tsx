import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Button,
  Fade,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import Title from "../components/UI/Title";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostList from "../components/posts/PostList";
import PostListSorting from "../components/posts/PostListSorting";
import EditProfileDialog from "../components/profile/EditProfileDialog";
import UserAvatar from "../components/users/UserAvatar";
import { useAppSocket } from "../contexts/SocketContext";
import { useUser } from "../contexts/UserContext";
import { useAPI } from "../hooks/useAPI";
import useInfiniteAPI from "../hooks/useInfiniteAPI";
import {
  createFriendship,
  deleteFriendship,
  updateFriendship,
} from "../services/api/friendshipAxios";
import styles from "../styles/[id].styles";
import {
  FriendshipEntity,
  FriendshipStatus,
  NextPageWithLayout,
  POSTS_SORT_MODES,
  PaginatedResult,
  PostEntity,
  UserEntity,
} from "../types";
import UserListModal from "../components/users/UserListDialog";

const TABS = ["posts", "replies"];

const Profile: NextPageWithLayout = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { t = TABS[0] } = query;
  const value = TABS.indexOf(t as string);
  const { user } = useUser();
  const { socket } = useAppSocket();
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [showFriendsDialog, setShowFriendsDialog] = useState(false);

  const {
    data: userRes,
    error: userErr,
    mutate: mutateUser,
    loading: userLoading,
  } = useAPI<UserEntity[]>(query?.id ? `users?username=${query.id}` : null);

  const profileUser = userRes?.[0];
  const userIsOwner = profileUser?.userId === user?.userId;

  const { data: reactionCount } = useAPI<number>(
    profileUser ? `users/${profileUser.userId}/posts/reactions/count` : null
  );

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

  const { data: friends } = useAPI<UserEntity[]>(
    profileUser ? `users/${profileUser?.userId}/friends` : null
  );

  const getPostsKey = (index: number) =>
    profileUser
      ? `posts?page=${
          index + 1
        }&isChild=false&orderBy=${sortMode}&perPage=10&authorId=${
          profileUser.userId
        }`
      : null;

  const getPostRepliesKey = (index: number) =>
    profileUser
      ? `posts?page=${
          index + 1
        }&isChild=true&orderBy=${sortMode}&perPage=10&authorId=${
          profileUser.userId
        }`
      : null;

  const {
    data: postsRes,
    error: postsErr,
    loading: postsLoading,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostsKey);

  const {
    data: postRepliesRes,
    error: postRepliesErr,
    loading: postRepliesLoading,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostRepliesKey);

  const onSaveProfile = () => {
    mutateUser();
    setShowEditProfileDialog(false);
  };

  const onAcceptFriendRequest = async () => {
    if (!profileUser || !friendshipRes) return;
    await updateFriendship(friendshipRes.friendshipId, {
      status: FriendshipStatus.ACCEPTED as keyof typeof FriendshipStatus,
    });
    mutateFriendship();
    socket?.emit("friendAccept", {
      recipientId: profileUser.userId,
    });
  };

  const onSendFriendRequest = async () => {
    if (!profileUser || !user) return;
    await createFriendship({
      recipientId: profileUser.userId,
      senderId: user.userId,
      status: FriendshipStatus.PENDING as keyof typeof FriendshipStatus,
    });
    mutateFriendship();
    socket?.emit("friendRequest", {
      recipientId: profileUser.userId,
    });
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

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const tab = TABS[newValue];
    if (tab === TABS[0]) {
      router.push(`/${query.id}`);
    } else {
      router.push(`/${query.id}?t=${tab}`);
    }
  };

  const loading =
    userLoading ||
    (t === "posts" && postsLoading) ||
    (t === "replies" && postRepliesLoading) ||
    !profileUser;

  if (
    userErr ||
    (t === "posts" && postsErr) ||
    (t === "replies" && postRepliesErr)
  ) {
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
              <Stack direction="row" justifyContent="flex-end">
                {userIsOwner && (
                  <Button
                    sx={styles.editBtn}
                    variant="outlined"
                    onClick={() => setShowEditProfileDialog(true)}
                  >
                    Edit
                  </Button>
                )}

                {!userIsOwner && user && (
                  <Button
                    sx={styles.editBtn}
                    variant="outlined"
                    onClick={onFriendButtonClick}
                  >
                    <PersonAddIcon />
                    {getFriendshipText()}
                  </Button>
                )}
              </Stack>

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
                    <Typography fontWeight={600}>
                      {postsRes?.[0].meta.total}
                    </Typography>
                    <Typography variant="subtitle2">Posts</Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "column" }}>
                    <Typography fontWeight={600}>
                      {postRepliesRes?.[0].meta.total}
                    </Typography>
                    <Typography variant="subtitle2">Replies</Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "column" }}>
                    <Typography fontWeight={600}>{reactionCount}</Typography>
                    <Typography variant="subtitle2">
                      {reactionCount === 1 ? "Like" : "Likes"}
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "column" }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowFriendsDialog(true)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        color: "text.primary",
                        textTransform: "none",
                        m: 0,
                      }}
                    >
                      <Typography fontWeight={600}>
                        {friends?.length}
                      </Typography>
                      <Typography variant="subtitle2">
                        {friends?.length === 1 ? "Friend" : "Friends"}
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Fade>

          <Tabs value={value} onChange={handleChange} sx={{ display: "flex" }}>
            {TABS.map((tab, index) => (
              <Tab key={index} label={tab} sx={{ flex: 1 }} />
            ))}
          </Tabs>
          {t === "posts" ? (
            <PostList getPostsKey={getPostsKey} repliesMode={false} />
          ) : (
            <PostList getPostsKey={getPostRepliesKey} repliesMode />
          )}

          <EditProfileDialog
            open={showEditProfileDialog}
            setOpen={setShowEditProfileDialog}
            onSave={onSaveProfile}
          />

          <UserListModal
            open={showFriendsDialog}
            setOpen={setShowFriendsDialog}
            users={friends}
          />
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
