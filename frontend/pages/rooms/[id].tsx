import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Styles } from "../../types";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Typography variant="h5">Room {id}</Typography>
    </>
  );
};

const styles: Styles = {
  root: {
    p: 2.5,
  },
};

// Room.getLayout = getMainLayout;

export default Room;
