import { useEffect } from "react";
import { mutate } from "swr";
import { markNotificationsRead } from "../services/api/notificationAxios";
import { NotificationEntity, RoomEntity } from "../types";
import { useAPI } from "./useAPI";

interface UseNotificationsParams {
  userId: string | null;
  roomId: string | null;
  shouldGetNotis: boolean;
}

export const useRoomNotifications = ({
  userId,
  roomId,
  shouldGetNotis,
}: UseNotificationsParams) => {
  const { data: roomNotifications, mutate: mutateRoomNotifications } = useAPI<
    any[]
  >(
    shouldGetNotis
      ? `notifications?roomId=${roomId}&read=false&recipientId=${userId}`
      : null
  );

  const refreshNotifications = async () => {
    mutate(`notifications?recipientId=${userId}&type=MESSAGE&read=false`);
    const notificationIds = roomNotifications?.map(
      (n: NotificationEntity) => n.notificationId
    ) as string[];
    if (notificationIds && notificationIds.length > 0) {
      await markNotificationsRead(notificationIds, true);
      mutate(`notifications?recipientId=${userId}&type=MESSAGE&read=false`);
    }
  };

  useEffect(() => {
    refreshNotifications();
  }, [roomNotifications]);

  return { roomNotifications, refreshNotifications, mutateRoomNotifications };
};
