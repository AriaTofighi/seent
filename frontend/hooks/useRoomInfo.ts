import { useUser } from "../contexts/UserContext";
import { RoomEntity, RoomUserEntity, UserEntity } from "../types";
import { getLatestMessage } from "../utils";

export const useRoomInfo = (room: RoomEntity | undefined) => {
  const { user } = useUser();

  if (!room || !user) return {};

  const latestMessage = getLatestMessage(room);
  const name = getName(room, user, latestMessage);
  const body = latestMessage?.body ?? "";
  const previewUser =
    room.roomUsers?.length > 2
      ? latestMessage?.user
      : room.roomUsers?.find((u: RoomUserEntity) => u.userId !== user?.userId)
          ?.user;
  const userId = previewUser?.userId;
  const username = previewUser?.username;
  const avatarUrl = previewUser?.images?.[0]?.url;

  return { latestMessage, name, body, userId, avatarUrl, username };
};
const getName = (room: RoomEntity, user: UserEntity, latestMessage: any) => {
  const isGroupChat = room.roomUsers?.length > 2;
  const latestMessageIsFromUser = latestMessage?.user?.userId === user?.userId;
  if (latestMessageIsFromUser) {
    return "You: ";
  } else if (isGroupChat) {
    return latestMessage?.user?.username + ": ";
  } else {
    return "";
  }
};
