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
import { getRoomsLayout } from "../../components/layouts/RoomsLayout";

const Rooms: NextPageWithLayout = () => {
  return (
    <>
      <Title title="Rooms" />
      <Box sx={styles.root}>
        Join or create a room to send messages to other people.
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

Rooms.getLayout = getRoomsLayout;

export default Rooms;
