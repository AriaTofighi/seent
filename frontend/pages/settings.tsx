import { NextPageWithLayout } from "../types/types";
import { getMainLayout } from "../components/layouts/MainLayout";
import Title from "../components/UI/Title";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Title title="Settings" />
    </>
  );
};

Settings.getLayout = getMainLayout;

export default Settings;
