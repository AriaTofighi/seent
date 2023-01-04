import { useUser } from "../contexts/UserContext";
import { getLatestMessage } from "../utils";

export const useRoomInfo = (room: any) => {
  const { user } = useUser();
  if (!room) return {};
  const latestMessage = getLatestMessage(room);
  const name = room.users.length > 2 ? `${latestMessage.user.name}:` : "";
  const body = latestMessage.body;

  const previewUser =
    room.users.length > 2
      ? latestMessage.user
      : room.users.find((u: any) => u.userId !== user?.userId).user;
  const { userId, username } = previewUser;
  const avatarUrl = previewUser.images?.[0]?.url;

  return { latestMessage, name, body, userId, avatarUrl, username };
};
