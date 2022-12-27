import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Styles } from "../../types";
import { formatDateTime } from "../../utils";
import UserAvatar from "../users/UserAvatar";

type Props = {
  body: string;
  createdAt?: Date;
  name: string;
  avatarUrl?: string;
  username: string;
  repeatedUser: boolean;
  nextUserRepeated: boolean;
  isGroupChat: boolean;
};

const Message = ({
  body,
  createdAt,
  name,
  avatarUrl,
  username,
  repeatedUser,
  nextUserRepeated,
  isGroupChat,
}: Props) => {
  const { user } = useUser();
  const isOtherUser = username !== user?.username;
  const styles = getStyles(repeatedUser);
  const alignSelf = isOtherUser ? styles.flexStart : styles.flexEnd;

  return (
    <Box sx={{ ...styles.root, ...alignSelf } as object}>
      <Box sx={styles.avatarContainer}>
        {avatarUrl && isOtherUser && (
          <UserAvatar
            username={username}
            avatarUrl={avatarUrl}
            AvatarProps={{ sx: styles.avatar }}
          />
        )}
      </Box>
      <Box>
        {!nextUserRepeated && isOtherUser && isGroupChat && (
          <Typography variant="caption" color="textSecondary" ml={1.5}>
            {name}
          </Typography>
        )}
        <Box sx={styles.content}>
          <Typography variant="body1">{body}</Typography>
          {/* <Typography variant="caption">
          {formatDateTime(createdAt as Date)}
        </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

const getStyles = (repeatedUser: boolean): Styles => ({
  root: {
    display: "flex",
    gap: 1.5,
    maxWidth: "60%",
    mb: repeatedUser ? 0 : 1,
  },
  flexStart: {
    alignSelf: "flex-start",
  },
  flexEnd: {
    alignSelf: "flex-end",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    pb: 0,
    minWidth: 28,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  content: {
    p: 1.5,
    border: 1,
    borderRadius: 5,
    borderColor: "divider",
  },
});

export default Message;
