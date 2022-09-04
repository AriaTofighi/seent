import { Avatar, Button, Fade, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import PostsList from "../../components/posts/PostList";
import PostListSorting from "../../components/posts/PostListSorting";
import EditProfileDialog from "../../components/profile/EditProfileDialog";
import Title from "../../components/UI/Title";
import { useUser } from "../../contexts/UserContext";
import { createImage, updateImage } from "../../services/api/imageAxios";
import { NextPageWithLayout, Styles } from "../../types/types";
import { fileToBase64, infiniteSWRToFlat } from "../../utils/helpers";
import { POSTS_SORT_MODES } from "../feed";

const styles: Styles = {
  images: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    my: 2,
  },
};

const Profile: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { user } = useUser();
  const fileInputRef = useRef<any>();
  const [chosenImage, setChosenImage] = useState<any>();
  const [imageFile, setImageFile] = useState<any>();
  const {
    data: userRes,
    error: userErr,
    mutate: mutateUser,
    isValidating: userLoading,
  } = useSWR(query ? `users?username=${query.id}` : null);
  const [sortMode, setSortMode] = useState(POSTS_SORT_MODES.NEW);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);

  const profileUser = userRes?.data[0];
  const userIsOwner = profileUser?.userId === user?.userId;

  const handleBrowse = () => {
    // Reseting the file input to allow the user to pick the same file twice in a row.
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleSelectedPic = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const srcFile = await fileToBase64(file);
    setChosenImage(srcFile);
  };

  const handleUpload = async () => {
    if (!user) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", user.userId);
    formData.append("type", "USER_AVATAR");
    if (profileUser.images.length > 0 && profileUser.images[0]) {
      await updateImage(formData, profileUser.images[0].imageId);
    } else {
      await createImage(formData);
    }
  };

  useEffect(() => {
    if (!imageFile) return;
    handleUpload();
    mutateUser();
  }, [imageFile]);

  useEffect(() => {
    if (!user) return;
    mutateUser();
  }, [user]);

  const getPostsKey = (index: number): any =>
    profileUser
      ? `posts?page=${
          index + 1
        }&isChild=false&orderBy=${sortMode}&perPage=10&authorId=${
          profileUser.userId
        }`
      : null;

  const { data: postsRes, error: postsErr } = useSWRInfinite(
    getPostsKey
  ) as any;
  const posts = infiniteSWRToFlat(postsRes);

  const loading = (!userRes && !userErr) || (!postsRes && !postsErr);

  return (
    <>
      <Title title="Profile" />
      <TopAppBar title="Profile">
        <PostListSorting setMode={setSortMode} />
      </TopAppBar>
      {!loading ? (
        <>
          <Fade in timeout={700}>
            <Box
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                p: 3,
                position: "relative",
              }}
            >
              {userIsOwner && (
                <Button
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    m: 2,
                    color: "primary.main",
                  }}
                  variant="outlined"
                  onClick={() => setShowEditProfileDialog(true)}
                >
                  Edit Profile
                </Button>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  src={
                    profileUser.images ? profileUser?.images[0]?.url : undefined
                  }
                  sx={{
                    maxWidth: {
                      lg: 135,
                      xs: 75,
                    },
                    width: "100%",
                    height: "auto",
                    cursor: user ? "pointer" : "auto",
                  }}
                  onClick={user && handleBrowse}
                />
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="h5">{profileUser?.name}</Typography>
                  <Typography variant="subtitle2" color="primary.main">
                    {`@${profileUser.username}`}{" "}
                    {profileUser.location && ` | ${profileUser.location}`}
                    {profileUser.gender && ` | ${profileUser.gender}`}
                  </Typography>
                  <Typography sx={{ mt: 3, mb: 2 }}>
                    {profileUser.bio}
                  </Typography>
                </Stack>
              </Box>

              <Stack
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 2,
                    width: "50%",
                    flexWrap: "wrap",
                  }}
                >
                  <Stack sx={{ flexDirection: "column" }}>
                    <Typography fontWeight={600}>{posts?.length}</Typography>
                    <Typography variant="subtitle2">Posts</Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "column" }}>
                    <Typography fontWeight={600}>10</Typography>
                    <Typography variant="subtitle2">Likes</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Fade>

          <PostsList getPostsKey={getPostsKey} />

          <input
            type="file"
            accept="image/*"
            onChange={handleSelectedPic}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <EditProfileDialog
            open={showEditProfileDialog}
            setOpen={setShowEditProfileDialog}
          />
        </>
      ) : null}
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
