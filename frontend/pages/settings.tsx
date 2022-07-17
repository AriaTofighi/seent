import { Box } from "@mui/material";
import useSWR from "swr";
import { getMainLayout } from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "../types/types";

const Settings: NextPageWithLayout = () => {
  const { data: posts, error, isValidating } = useSWR("posts");

  return <Box>Settings</Box>;
};

Settings.getLayout = getMainLayout;

export default Settings;
