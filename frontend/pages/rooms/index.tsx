import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import Title from "../../components/UI/Title";
import { NextPageWithLayout, Styles, UserEntity } from "../../types";
import AddIcon from "@mui/icons-material/Add";
import CreateRoomModal from "../../components/rooms/CreateRoomModal";
import { useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { useUser } from "../../contexts/UserContext";
import RoomCard from "../../components/rooms/RoomCard";
import MenuItem from "../../components/navigation/MenuItem";

const Rooms: NextPageWithLayout = () => {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const { user } = useUser();
  const { data: rooms } = useAPI<any[]>(`rooms?userId=${user?.userId}`);

  return (
    <>
      <Title title="Rooms" />
      <TopAppBar title="Rooms">
        <Box sx={styles.appBar}>
          <IconButton onClick={() => setCreateRoomOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>
      </TopAppBar>
      <Box sx={styles.root}>
        <Box sx={styles.roomList}>
          {rooms?.map((room) => (
            <MenuItem key={room.roomId}>{room.title}</MenuItem>
          ))}
        </Box>
      </Box>

      <CreateRoomModal open={createRoomOpen} setOpen={setCreateRoomOpen} />
    </>
  );
};

const styles: Styles = {
  root: {
    // Height should be 100% - top app bar height
    height: "calc(100% - 65px)",
  },
  roomList: {
    display: "flex",
    flexDirection: "column",

    height: "100%",
    // borderColor: "divider",
    width: {
      sm: "30%",
      xs: "100%",
    },
    borderRight: {
      md: "1px solid",
      sm: "none",
    },
    borderColor: {
      md: "divider",
    },
  },
  appBar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
};

Rooms.getLayout = getMainLayout;

export default Rooms;
