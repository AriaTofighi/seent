import { Box, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import { useRoomInfo } from "../../hooks/useRoomInfo";
import { Styles } from "../../types";
import { formatDateTimeAgo, getDisplayedRoomTitle } from "../../utils";
import MenuItem, { Props as MenuItemProps } from "../navigation/MenuItem";
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
  const { user, paletteMode } = useUser();
  const darkMode = paletteMode === "dark";
  const styles = getStyles(room, darkMode);
  const { latestMessage, name, body, userId, avatarUrl } = useRoomInfo(room);

  return (
    <MenuItem
      sx={styles.root}
      key={room.roomId}
      href={`/messages/${room.roomId}`}
      {...rest}
    >
      <UserAvatar userId={userId} avatarUrl={avatarUrl} />
      <Box>
        <Typography variant="body1" sx={styles.nowrap}>
          {getDisplayedRoomTitle(room, user as any)}
        </Typography>
        {latestMessage && (
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={styles.nowrap}
            >
              {name} {body}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              · {formatDateTimeAgo(latestMessage?.createdAt)}
            </Typography>
          </Box>
        )}
      </Box>
    </MenuItem>
  );
};

const getStyles: (room: any, darkMode: boolean) => Styles = (
  room,
  darkMode
) => ({
  root: {
    borderBottom: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    bgcolor: room.notification ? "primary.main" : "transparent",
  },
  nowrap: {
    whiteSspace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: room.notification ? "bold" : "normal",
  },
});

export default RoomMenuItem;
