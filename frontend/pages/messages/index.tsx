import { Button, IconButton, Stack, Typography } from "@mui/material";
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

const Messages: NextPageWithLayout = () => {
  return (
    <>
      <Title title="Messages" />
      <Box sx={styles.root}>
        Send messages to other people, in private or group conversations.
      </Box>
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
