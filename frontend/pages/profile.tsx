import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import useSWR from "swr";
import { getMainLayout } from "../components/layouts/MainLayout";
import { useUser } from "../contexts/UserContext";
import { createImage } from "../services/api/imageAxios";
import { uploadUserImage } from "../services/api/userAxios";
import { NextPageWithLayout, Styles } from "../types/types";
import { fileToBase64 } from "../utils/helpers";

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
  const { user } = useUser();
  const fileInputRef = useRef<any>();
  const [chosenImage, setChosenImage] = useState<any>();
  const [imageFile, setImageFile] = useState<any>();
  const { data: userData, error: postsErr } = useSWR(
    user ? `users/${user.userId}` : null
  );

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
    const formData = new FormData();
    console.log(imageFile);
    formData.append("image", imageFile);
    formData.append("userId", user.userId);
    formData.append("type", "USER_AVATAR");
    await createImage(formData);
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta property="og:title" content="Profile" key="title" />
      </Head>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Card
        sx={{ width: "100%", bgcolor: "background.default", p: 2 }}
        variant="outlined"
      >
        <Typography variant="body2">Profile Picture</Typography>
      </Card>

      {chosenImage && (
        <Box sx={styles.images}>
          <Image
            src={chosenImage}
            width="250"
            height="200"
            alt="Post"
            layout="fixed"
          />
        </Box>
      )}
      <Button onClick={handleBrowse}>Browse</Button>
      <Button onClick={() => setChosenImage(null)}>Remove</Button>
      <Button onClick={handleUpload}>Upload</Button>
      <input
        type="file"
        accept="image/*"
        onChange={handleSelectedPic}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      {userData?.image && (
        <Box sx={styles.images}>
          <Image
            src={userData?.image?.url}
            width="250"
            height="200"
            alt="Post"
            layout="fixed"
          />
        </Box>
      )}

      <Card
        sx={{ width: "100%", bgcolor: "background.default", p: 2 }}
        variant="outlined"
      >
        <Typography variant="body2">Email</Typography>
      </Card>
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
