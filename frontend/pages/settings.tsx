import { Typography } from "@mui/material";
import Head from "next/head";
import { getMainLayout } from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "../types/types";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta property="og:title" content="Settings" key="title" />
      </Head>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Settings
      </Typography>
    </>
  );
};

Settings.getLayout = getMainLayout;

export default Settings;
