import React from "react";
import MenuItem from "../navigation/MenuItem";
import StyledCard from "../UI/StyledCard";
import { Props as MenuItemProps } from "../navigation/MenuItem";
import { formatDateTime, getDisplayedRoomTitle } from "../../utils";
import { useUser } from "../../contexts/UserContext";
import { Avatar, Box, Typography } from "@mui/material";
import UserAvatar from "../users/UserAvatar";

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
    let user: any;

    room.users.forEach((roomUser: any) => {
      roomUser.messages.forEach((message: any) => {
        if (
          !latestMessage ||
          new Date(message.createdAt) > new Date(latestMessage.createdAt)
        ) {
          latestMessage = message;
          user = roomUser.user;
        }
      });
    });

    return { message: latestMessage, user };
  };

  const latestMessage = getLatestMessage(room);
  const name = room.users.length > 2 ? `${latestMessage.user.name}:` : "";
  const body = latestMessage.message.body;

  const previewUser =
    room.users.length > 2
      ? latestMessage.user
      : room.users.find((u: any) => u.userId !== user?.userId).user;
  const { userId } = previewUser;
  const avatarUrl = previewUser.images?.[0]?.url;

  return (
    <MenuItem
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      }}
      key={room.roomId}
      href={`/messages/${room.roomId}`}
      {...rest}
    >
      {/* <Avatar src={avatarUrl} /> */}
      <UserAvatar userId={userId} avatarUrl={avatarUrl} />
      <Box>
        {getDisplayedRoomTitle(room, user as any)}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            whiteSspace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name} {body} ·{" "}
          <Typography variant="caption">
            {formatDateTime(latestMessage.message.createdAt)}
          </Typography>
        </Typography>
      </Box>
    </MenuItem>
  );
};

export default RoomMenuItem;
