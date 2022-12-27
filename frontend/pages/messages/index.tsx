import {
  Button,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { getMainLayout } from "../../components/layouts/MainLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import Title from "../../components/UI/Title";
import { NextPageWithLayout, Styles, UserEntity } from "../../types";
import CreateRoomModal from "../../components/rooms/CreateRoomModal";
import { useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { useUser } from "../../contexts/UserContext";
import RoomCard from "../../components/rooms/RoomCard";
import MenuItem from "../../components/navigation/MenuItem";
import { getMessagesLayout } from "../../components/layouts/MessagesLayout";
import { useRouter } from "next/router";

const Messages: NextPageWithLayout = () => {
  const router = useRouter();
  const inARoom = router.pathname.startsWith("/messages/");
  const breakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  return (
    <>
      <Title title="Messages" />
      {breakpoint && (
        <Box sx={styles.root}>
          <Typography variant="body1" textAlign="center">
            Send messages to other people, in private or group conversations.
          </Typography>
        </Box>
      )}
    </>
  );
};

const styles: Styles = {
  root: {
    height: "100%",
    p: 2.5,
    display: "grid",
    placeContent: "center",
  },
};

Messages.getLayout = getMessagesLayout;

export default Messages;
