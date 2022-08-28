import { Typography } from "@mui/material";
import Head from "next/head";
import { getMainLayout } from "../components/layouts/MainLayout";
import Header from "../components/UI/Header";
import { NextPageWithLayout } from "../types/types";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta property="og:title" content="Settings" key="title" />
      </Head>
      <Header>Settings</Header>
    </>
  );
};

Settings.getLayout = getMainLayout;

export default Settings;
