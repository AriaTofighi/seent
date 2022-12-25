import { Box, IconButton } from "@mui/material";
import { Styles, ThemedStyles } from "../../types";
import TopAppBar from "../navigation/TopAppBar";
import CreateRoomModal from "../rooms/CreateRoomModal";
import { getMainLayout } from "./MainLayout";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import MenuItem from "../navigation/MenuItem";
import { getDisplayedRoomTitle } from "../../utils";

type Props = {
  children: React.ReactNode;
};

const RoomsLayout = ({ children }: Props) => {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  // Make it so user is always considered defined with typescript
  const { user } = useUser();
  const { data: rooms, mutate: mutateRooms } = useAPI<any[]>(
    `rooms?userId=${user?.userId}`
  );
  // const inARoom = window.location.pathname.includes("/rooms/");

  return (
    <>
      {/* {!inARoom && ( */}
      <TopAppBar title="Rooms">
        <Box sx={styles.appBar}>
          <IconButton onClick={() => setCreateRoomOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>
      </TopAppBar>
      {/* )} */}

      <Box sx={styles.root}>
        <Box sx={styles.roomList}>
          {rooms?.map((room) => (
            <MenuItem
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
              key={room.roomId}
              href={`/rooms/${room.roomId}`}
            >
              {getDisplayedRoomTitle(room, user as any)}
            </MenuItem>
          ))}
        </Box>
        <Box sx={styles.room}>{children}</Box>
      </Box>
      {createRoomOpen && (
        <CreateRoomModal
          open={createRoomOpen}
          setOpen={setCreateRoomOpen}
          mutateRooms={mutateRooms}
        />
      )}
    </>
  );
};

const styles: ThemedStyles = {
  root: {
    height: (theme) =>
      `calc(100% - 10px - ${theme.mixins.toolbar.minHeight}px)`,
    maxHeight: (theme) =>
      `calc(100vh - 10px - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
  },
  roomList: {
    display: "flex",
    flexDirection: "column",
    width: {
      sm: 300,
      xs: "100%",
    },
    borderRight: {
      md: "1px solid",
      sm: "none",
    },
    borderBottom: {
      md: "1px solid",
      sm: "none",
    },
    borderColor: {
      md: "divider",
    },
  },
  room: {
    width: {
      sm: "70%",
      xs: "100%",
    },
    borderBottom: {
      md: "1px solid",
      sm: "none",
    },
    borderColor: {
      md: "divider",
    },
    height: "100%",
  },
  appBar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
};

export const getRoomsLayout = (page: React.ReactNode) =>
  getMainLayout(<RoomsLayout>{page}</RoomsLayout>);

export default RoomsLayout;
