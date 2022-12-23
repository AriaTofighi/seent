import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import Title from "../../components/UI/Title";
import { NextPageWithLayout, Styles } from "../../types";
import AddIcon from "@mui/icons-material/Add";
import CreateRoomModal from "../../components/rooms/CreateRoomModal";
import { useState } from "react";

const Rooms: NextPageWithLayout = () => {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);

  return (
    <>
      <Title title="Rooms" />
      <TopAppBar title="Rooms">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <IconButton onClick={() => setCreateRoomOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>
      </TopAppBar>
      <CreateRoomModal open={createRoomOpen} setOpen={setCreateRoomOpen} />
    </>
  );
};

const styles: Styles = {
  root: {
    p: 2.5,
  },
};

Rooms.getLayout = getMainLayout;

export default Rooms;
