import { Icon, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import Title from "../../components/UI/Title";
import { NextPageWithLayout, Styles } from "../../types";

const Room: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Title title={`Room`} />
      <TopAppBar title="Room"></TopAppBar>
      <Typography variant="h5">Room {id}</Typography>
    </>
  );
};

const styles: Styles = {
  root: {
    p: 2.5,
  },
};

Room.getLayout = getMainLayout;

export default Room;
