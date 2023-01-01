import React from "react";
import MenuItem from "../navigation/MenuItem";
import StyledCard from "../UI/StyledCard";
import { Props as MenuItemProps } from "../navigation/MenuItem";
import { getDisplayedRoomTitle } from "../../utils";
import { useUser } from "../../contexts/UserContext";
import { Typography } from "@mui/material";

type Props = {
  children?: React.ReactNode;
  room: any;
};

const RoomMenuItem = ({
  children,
  room,
  ...rest
}: Props & Omit<MenuItemProps, "children">) => {
  const { user } = useUser();

  const getLatestMessage = (room: any) => {
    let latestMessage: any;
    let name: string = "";

    room.users.forEach((roomUser: any) => {
      roomUser.messages.forEach((message: any) => {
        if (
          !latestMessage ||
          new Date(message.createdAt) > new Date(latestMessage.createdAt)
        ) {
          latestMessage = message;
          name = roomUser.user.name;
        }
      });
    });

    return { message: latestMessage, name };
  };

  const latestMessage = getLatestMessage(room);

  return (
    <MenuItem
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        height: 70,
      }}
      key={room.roomId}
      href={`/messages/${room.roomId}`}
      {...rest}
    >
      {getDisplayedRoomTitle(room, user as any)}
      <Typography variant="body2" color="textSecondary">
        {latestMessage.name}: {latestMessage.message.body}
      </Typography>
    </MenuItem>
  );
};

export default RoomMenuItem;
