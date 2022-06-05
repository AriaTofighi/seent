import { Box } from "@mui/material";
import { ReactElement } from "react";
import useSWR from "swr";
import MainLayout from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";

const Settings: NextPageWithLayout = () => {
  const { data: posts, error, isValidating } = useSWR("posts");

  return <Box></Box>;
};

Settings.getLayout = (page: ReactElement): ReactElement => (
  <MainLayout>{page}</MainLayout>
);

export default Settings;
