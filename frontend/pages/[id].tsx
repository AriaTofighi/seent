import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import Title from "../components/UI/Title";
import { getMainLayout } from "../components/layouts/MainLayout";
import TopAppBar from "../components/navigation/TopAppBar";
import PostListSorting from "../components/posts/PostListSorting";
import EditProfileDialog from "../components/profile/EditProfileDialog";
import { useUser } from "../contexts/UserContext";
import { useAPI } from "../hooks/useAPI";
import useInfiniteAPI from "../hooks/useInfiniteAPI";
import {
  NextPageWithLayout,
  POSTS_SORT_MODES,
  PaginatedResult,
  PostEntity,
  UserEntity,
} from "../types";
import UserListModal from "../components/users/UserListDialog";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileActions from "../components/profile/ProfileActions";
import ProfileTabs from "../components/profile/ProfileTabs";
import { useFriendship } from "../hooks/useFriendship";
import { useTabs } from "../hooks/useTabs";

const TABS = ["posts", "replies"];

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const { t = TABS[0] } = query;
  const { user } = useUser();
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [showFriendsDialog, setShowFriendsDialog] = useState(false);
  const { handleChange, tabIndex } = useTabs(TABS, TABS[0], t as string);

  const {
    data: userData,
    error: userError,
    mutate: mutateUser,
    loading: userLoading,
  } = useAPI<UserEntity[]>(query?.id ? `users?username=${query.id}` : null);

  const profileUser = userData?.[0];
  const userIsOwner = profileUser?.userId === user?.userId;

  const { getFriendshipText, onFriendButtonClick } = useFriendship(
    userIsOwner,
    user,
    profileUser
  );

  const { data: reactionCount, error: reactionCountError } = useAPI<number>(
    profileUser ? `users/${profileUser.userId}/posts/reactions/count` : null
  );

  const { data: friends, error: friendsError } = useAPI<UserEntity[]>(
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
    error: postsError,
    loading: postsLoading,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostsKey);

  const {
    data: postRepliesRes,
    error: postRepliesError,
    loading: postRepliesLoading,
  } = useInfiniteAPI<PaginatedResult<PostEntity>>(getPostRepliesKey);

  const onSaveProfile = () => {
    mutateUser();
    setShowEditProfileDialog(false);
  };

  const loading =
    userLoading ||
    (t === "posts" && postsLoading) ||
    (t === "replies" && postRepliesLoading) ||
    !profileUser;

  const renderContent = () => {
    if (
      userError ||
      reactionCountError ||
      friendsError ||
      (t === "posts" && postsError) ||
      (t === "replies" && postRepliesError)
    ) {
      return <Box p={2}>Error loading data</Box>;
    }

    if (loading) {
      return <LinearProgress />;
    }

    return (
      <>
        <ProfileActions
          getFriendshipText={getFriendshipText}
          onEditProfileClick={() => setShowEditProfileDialog(true)}
          onFriendButtonClick={onFriendButtonClick}
          userIsOwner={userIsOwner}
        />
        <ProfileHeader
          profileUser={profileUser}
          userIsOwner={userIsOwner}
          handleEditProfileClick={() => setShowEditProfileDialog(true)}
        />
        <ProfileStats
          friendsCount={friends?.length || 0}
          handleShowFriendsClick={() => setShowFriendsDialog(true)}
          postsCount={postsRes?.[0].meta.total || 0}
          reactionCount={reactionCount || 0}
          repliesCount={postRepliesRes?.[0].meta.total || 0}
        />
        <ProfileTabs
          getPostRepliesKey={getPostRepliesKey}
          getPostsKey={getPostsKey}
          onTabChange={handleChange}
          tabIndex={tabIndex}
        />
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
    );
  };

  return (
    <>
      <Title title="Profile" />
      <TopAppBar title="Profile">
        <PostListSorting setMode={setSortMode} />
      </TopAppBar>
      {renderContent()}
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
