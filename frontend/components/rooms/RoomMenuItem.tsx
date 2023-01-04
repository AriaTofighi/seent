import React from "react";
import MenuItem from "../navigation/MenuItem";
import StyledCard from "../UI/StyledCard";
import { Props as MenuItemProps } from "../navigation/MenuItem";
import { formatDateTime, getDisplayedRoomTitle } from "../../utils";
import { useUser } from "../../contexts/UserContext";
import { Avatar, Box, Typography } from "@mui/material";
import UserAvatar from "../users/UserAvatar";
import { useRoomInfo } from "../../hooks/useRoomInfo";

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
  const { latestMessage, name, body, userId, avatarUrl } = useRoomInfo(room);

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
            {formatDateTime(latestMessage.createdAt)}
          </Typography>
        </Typography>
      </Box>
    </MenuItem>
  );
};

export default RoomMenuItem;
