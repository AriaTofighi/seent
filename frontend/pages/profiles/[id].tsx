import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import Header from "../../components/UI/Header";
import { fileToBase64 } from "../../utils/helpers";
import { useUser } from "../../contexts/UserContext";
import PostCard from "../../components/posts/PostCard";
import { PostEntity } from "../../../backend/src/types";
import React, { useEffect, useRef, useState } from "react";
import { Styles, NextPageWithLayout } from "../../types/types";
import { getMainLayout } from "../../components/layouts/MainLayout";
import { updateImage, createImage } from "../../services/api/imageAxios";
import { Avatar, Fade, LinearProgress, Stack, Typography } from "@mui/material";

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
  const { user, loading } = useUser();
  const fileInputRef = useRef<any>();
  const [chosenImage, setChosenImage] = useState<any>();
  const [imageFile, setImageFile] = useState<any>();
  const {
    data: userRes,
    error: userErr,
    mutate: mutateUser,
  } = useSWR(query ? `users?username=${query.id}` : null);
  const {
    data: posts,
    error: postsErr,
    mutate: mutatePosts,
  } = useSWR(
    userRes ? `posts?authorId=${userRes.data[0].userId}&isChild=false` : null
  );
  const profileUser = userRes?.data[0];
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

  if (!profileUser && !userErr) {
    return <LinearProgress />;
  }
  console.log(user);
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta property="og:title" content="Profile" key="title" />
      </Head>
      <Header>Profile</Header>
      <Fade in timeout={500}>
        <Box sx={{ borderBottom: "1px solid", borderColor: "divider", p: 3 }}>
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
              src={profileUser.images ? profileUser?.images[0]?.url : undefined}
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
            <Typography>{profileUser?.name}</Typography>
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
                <Typography variant="subtitle2">Posts</Typography>
                <Typography fontWeight={600}>{posts?.data.length}</Typography>
              </Stack>
              <Stack sx={{ flexDirection: "column" }}>
                <Typography variant="subtitle2">Likes</Typography>
                <Typography fontWeight={600}>10</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography>{profileUser?.bio}</Typography>
        </Box>
      </Fade>

      {posts?.data?.map(({ postId, ...rest }: PostEntity) => {
        if (!{ ...rest }.parentPostId) {
          return (
            <PostCard
              postId={postId}
              post={{ ...rest, postId }}
              key={postId}
              mutate={mutatePosts}
            />
          );
        }
      })}
      {/* {chosenImage && (
        <Box sx={styles.images}>
          <Image
            src={chosenImage}
            width="250"
            height="200"
            alt="Post"
            layout="fixed"
          />
        </Box>
      )} */}
      {/* <Button onClick={handleBrowse}>Browse</Button>
      <Button onClick={() => setChosenImage(null)}>Remove</Button>
      <Button onClick={handleUpload}>Upload</Button> */}
      <input
        type="file"
        accept="image/*"
        onChange={handleSelectedPic}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      {/* {userData?.image && (
        <Box sx={styles.images}>
          <Image
            src={userData?.image?.url}
            width="250"
            height="200"
            alt="Post"
            layout="fixed"
          />
        </Box>
      )} */}
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
