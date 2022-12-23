import { NextPageWithLayout } from "../types";
import { getMainLayout } from "../components/layouts/MainLayout";
import Title from "../components/UI/Title";
import TopAppBar from "../components/navigation/TopAppBar";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Title title="Settings" />
      <TopAppBar title="Settings" />
    </>
  );
};

Settings.getLayout = getMainLayout;

export default Settings;
