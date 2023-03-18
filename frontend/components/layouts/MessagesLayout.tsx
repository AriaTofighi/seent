import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Theme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { mutate } from "swr";
import { useAppSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import useSocketEvent from "../../hooks/useSocketEvent";
import { ThemedStyles } from "../../types";
import { sortRoomsByLatestMessage } from "../../utils";
import TopAppBar from "../navigation/TopAppBar";
import CreateRoomModal from "../rooms/CreateRoomModal";
import RoomMenuItem from "../rooms/RoomMenuItem";
import { getMainLayout } from "./MainLayout";

type Props = {
  children: React.ReactNode;
};

const MessagesLayout = ({ children }: Props) => {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const { user } = useUser();
  const { socket } = useAppSocket();
  const { data: rooms, mutate: mutateRooms } = useAPI<any[]>(
    `rooms?userId=${user?.userId}`
  );
  const { data: notifications } = useAPI<any[]>(
    `notifications?recipientId=${user?.userId}&type=MESSAGE&read=false`
  );
  const router = useRouter();
  const inARoom = router.pathname.startsWith("/messages/");
  const tabletOrMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );
  const showRoomList = !inARoom || !tabletOrMobile;

  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const showRoom = inARoom || !mobile;

  const roomsWithUnreadNotifications = rooms?.map((room) => {
    const notification = notifications?.find(
      (notification) => notification.roomId === room.roomId
    );
    return {
      ...room,
      notification,
    };
  });

  const onNewMessage = useCallback(() => {
    mutateRooms();
    mutate(`notifications?recipientId=${user?.userId}&type=MESSAGE&read=false`);
  }, [user?.userId]);

  useSocketEvent("newMessage", onNewMessage);

  useSocketEvent("newRoom", onNewMessage);

  const joinRooms = () => {
    rooms?.forEach(({ roomId }) => {
      socket?.emit("joinRoom", { roomId });
    });
  };

  useEffect(() => {
    if (!rooms) return;

    socket?.on("connect", () => {
      joinRooms();
    });

    joinRooms();

    return () => {
      rooms.forEach(({ roomId }) => {
        socket?.emit("leaveRoom", { roomId });
      });
    };
  }, [rooms, socket]);

  return (
    <>
      <TopAppBar title="Messages">
        <Box sx={styles.appBar}>
          <IconButton onClick={() => setCreateRoomOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>
      </TopAppBar>

      <Box sx={styles.root}>
        {showRoomList && (
          <Box sx={styles.roomList}>
            {sortRoomsByLatestMessage(roomsWithUnreadNotifications)?.map(
              (room) => (
                <RoomMenuItem key={room.roomId} room={room} />
              )
            )}
          </Box>
        )}
        {showRoom && <Box sx={styles.room}>{children}</Box>}
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
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: {
      sm: 300,
      xs: "100%",
    },
    borderRight: {
      sm: 1,
    },
    borderBottom: {
      md: 1,
    },
    borderColor: {
      xs: "divider",
      sm: "divider",
      md: "divider",
    },
  },
  room: {
    flex: 1,
    width: {
      sm: "calc(100% - 300px)",
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

export const getMessagesLayout = (page: React.ReactNode) =>
  getMainLayout(<MessagesLayout>{page}</MessagesLayout>);

export default MessagesLayout;
