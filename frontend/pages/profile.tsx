import { Typography } from "@mui/material";
import Head from "next/head";
import React, { ChangeEvent } from "react";
import { getMainLayout } from "../components/layouts/MainLayout";
import { useUser } from "../contexts/UserContext";
import { uploadUserImage } from "../services/api/userAxios";
import { NextPageWithLayout } from "../types/types";

const Profile: NextPageWithLayout = () => {
  const { user } = useUser();

  const onSelectFile = async (event: any) => {
    const file = event?.target?.files[0];
    const convertedFile = await convertToBase64(file);
    const imageURL = await uploadUserImage(convertedFile, user.userId);
    console.log(imageURL);
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
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
      <Typography variant="body2">Upload Profile Picture</Typography>
      <input type="file" accept="image/*" onChange={onSelectFile} />
    </>
  );
};

Profile.getLayout = getMainLayout;

export default Profile;
