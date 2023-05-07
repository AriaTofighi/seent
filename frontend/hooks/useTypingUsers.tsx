import { Typography } from "@mui/material";
import { useState, useCallback } from "react";
import { RoomEntity, RoomUserEntity, UserEntity } from "../types";
import useSocketEvent from "./useSocketEvent";
import UserAvatar from "../components/users/UserAvatar";

export const useTypingUsers = (
  roomId: string,
  room: RoomEntity,
  user: UserEntity | undefined
) => {
  const [typingUsers, setTypingUsers] = useState<{ [userId: string]: string }>(
    {}
  );

  const onUserTyping = useCallback(
    (data: { userId: string; isTyping: boolean }) => {
      const { userId, isTyping } = data;

      setTypingUsers((prevState) => {
        const updatedTypingUsers = { ...prevState };

        if (isTyping) {
          updatedTypingUsers[userId] = userId;
        } else {
          delete updatedTypingUsers[userId];
        }

        return updatedTypingUsers;
      });
    },
    [roomId]
  );

  useSocketEvent("userTyping", onUserTyping);

  const renderTypingUsers = () => {
    if (!room) return null;

    const typingUserIds = Object.keys(typingUsers);
    const typingUserNames = typingUserIds
      .filter((userId) => userId !== user?.userId)
      .map((userId) => {
        const roomUser = room.roomUsers.find(
          (roomUser: RoomUserEntity) => roomUser.userId === userId
        );
        return roomUser?.user?.name;
      });

    const onlyUserIsTyping =
      typingUserIds.length === 1 && typingUserIds[0] === user?.userId;
    const noUsersAreTyping = typingUserNames.length === 0;

    if (onlyUserIsTyping || noUsersAreTyping) {
      return null;
    }

    const typingMessage = `${typingUserNames.join(", ")} ${
      typingUserNames.length > 1 ? "are" : "is"
    } typing...`;

    return (
      <>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: "0.8rem",
            color: "text.secondary",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {typingMessage}
        </Typography>
      </>
    );
  };

  return { typingUsers, renderTypingUsers };
};
