import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Styles } from "../../types";
import { formatDateTime } from "../../utils";
import UserAvatar from "../users/UserAvatar";

type Props = {
  body: string;
  createdAt?: Date;
  name: string;
  avatarUrl?: string;
  userId: string;
  username: string;
  repeatedUser: boolean;
  nextUserRepeated: boolean;
  isGroupChat: boolean;
  showAvatar: boolean;
};

const Message = ({
  body,
  createdAt,
  name,
  avatarUrl,
  userId,
  username,
  repeatedUser,
  nextUserRepeated,
  isGroupChat,
  showAvatar,
}: Props) => {
  const { user } = useUser();
  const isOtherUser = username !== user?.username;
  const styles = getStyles(repeatedUser);
  const alignSelf = isOtherUser ? styles.flexStart : styles.flexEnd;
  const showName = !nextUserRepeated && isOtherUser && isGroupChat;
  const showUserAvatar = isOtherUser && showAvatar;
  const [showDate, setShowDate] = useState(false);

  const toggleShowDate = () => setShowDate((showDate) => !showDate);

  const dateContent = (
    <Typography
      variant="caption"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        whiteSpace: "nowrap",
      }}
    >
      <Box>{formatDateTime(createdAt as Date)}</Box>
    </Typography>
  );

  return (
    <Box
      sx={{ ...styles.root, ...alignSelf } as object}
      onClick={toggleShowDate}
    >
      <Box sx={styles.avatarContainer}>
        {showUserAvatar && (
          <UserAvatar
            userId={userId}
            username={username}
            avatarUrl={avatarUrl}
            AvatarProps={{ sx: styles.avatar }}
          />
        )}
      </Box>
      <Box>
        {showName && (
          <Typography variant="caption" color="textSecondary" ml={1.5}>
            {name}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {showDate && !isOtherUser && dateContent}
          <Box sx={styles.content}>
            <Typography variant="body1">{body}</Typography>
          </Box>
          {showDate && isOtherUser && dateContent}
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
    maxWidth: "fit-content",
  },
});

export default Message;
