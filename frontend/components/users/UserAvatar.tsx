import { Avatar, AvatarProps, Box, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useAppSocket } from "../../contexts/SocketContext";
import { Styles } from "../../types";

type Props = {
  userId: string;
  username?: string;
  avatarUrl?: string;
  AvatarProps?: AvatarProps;
};

const UserAvatar = ({ userId, username, avatarUrl, AvatarProps }: Props) => {
  const { onlineUsers } = useAppSocket();
  const userIsOnline = onlineUsers.some((uid: string) => uid === userId);

  const avatarContent = (
    <>
      <Avatar src={avatarUrl} {...AvatarProps} />
      {userIsOnline ? (
        <Tooltip title="Online" placement="top" enterDelay={400}>
          <Box sx={{ ...styles.status, ...styles.onlineStatus } as object} />
        </Tooltip>
      ) : (
        <Tooltip title="Offline" placement="top" enterDelay={400}>
          <Box sx={{ ...styles.status, ...styles.offlineStatus } as object} />
        </Tooltip>
      )}
    </>
  );

  return (
    <>
      {!username ? (
        <Box
          sx={{ display: "inline-block", position: "relative", flexShrink: 0 }}
        >
          {avatarContent}
        </Box>
      ) : (
        <Link href={`/${username}`}>
          <a style={{ display: "inline-block", position: "relative" }}>
            {avatarContent}
          </a>
        </Link>
      )}
    </>
  );
};

const styles: Styles = {
  status: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: "50%",
    width: 10,
    height: 10,
    borderColor: "text.primary",
    border: "1px solid",
  },
  onlineStatus: {
    bgcolor: "green",
  },
  offlineStatus: {
    bgcolor: "#4a4a4a",
  },
};

export default UserAvatar;
