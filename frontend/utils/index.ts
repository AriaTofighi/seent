import moment from "moment";
import { MouseEvent } from "react";
import { PaginatedResult, RoomEntity, UserEntity } from "../types";

export const formatDate = (inputDate: Date) => {
  return moment(inputDate).format("MMM D YYYY, h:mm a");
};

export const formatDateTime = (inputDate: Date) => {
  const today = moment().startOf("day");
  const yesterday = moment(today).subtract(1, "day");
  const tomorrow = moment(today).add(1, "day");

  const date = moment(inputDate);

  if (date.isSame(today, "d")) {
    return `Today, ${date.format("h:mm a")}`;
  } else if (date.isSame(yesterday, "d")) {
    return `Yesterday, ${date.format("h:mm a")}`;
  } else if (date.isSame(tomorrow, "d")) {
    return `Tomorrow, ${date.format("h:mm a")}`;
  } else if (date.isSame(today, "y")) {
    return date.format("MMM D, h:mm a");
  } else {
    return date.format("MMM D YYYY, h:mm a");
  }
};

export const formatDateTimeAgo = (inputDate: Date) => {
  const date = moment(inputDate);
  const now = moment();

  const days = now.diff(date, "days");
  const weeks = now.diff(date, "weeks");
  const months = now.diff(date, "months");
  const years = now.diff(date, "years");

  if (days < 1) {
    return date.format("h:mm a");
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 5) {
    return `${weeks}w`;
  } else if (months < 12) {
    return `${months}mo`;
  } else {
    return `${years}y`;
  }
};

export const convertDateForPicker = (d: Date) => {
  return moment(d).format("yyyy-MM-DD");
};

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const infiniteSWRToFlat = (
  paginatedObjArray: PaginatedResult<any>[] | undefined
) => {
  return paginatedObjArray?.map((res: any) => res.data).flat() ?? [];
};

export const getDisplayedRoomTitle = (room: any, user: UserEntity) => {
  if (room?.title !== "") {
    return room?.title;
  }

  const otherUsers = room?.roomUsers.filter(
    (u: UserEntity) => u.userId !== user?.userId
  );
  return otherUsers.map((roomUser: any) => roomUser.user.name).join(", ");
};

export const getLatestMessage = (room: RoomEntity) => {
  let latestMessage: any;

  room.roomUsers?.forEach((roomUser: any) => {
    roomUser.messages.forEach((message: any) => {
      if (
        !latestMessage ||
        new Date(message.createdAt) > new Date(latestMessage.createdAt)
      ) {
        latestMessage = message;
        latestMessage.user = roomUser.user;
      }
    });
  });

  return latestMessage;
};

export const sortRoomsByLatestMessage = (rooms: RoomEntity[] | undefined) => {
  return rooms?.sort((a, b) => {
    const aLatestMessage = getLatestMessage(a);
    const bLatestMessage = getLatestMessage(b);

    if (!aLatestMessage && !bLatestMessage) {
      return 0;
    } else if (!aLatestMessage) {
      return 1;
    } else if (!bLatestMessage) {
      return -1;
    }
    return (
      (new Date(bLatestMessage.createdAt) as any) -
      (new Date(aLatestMessage.createdAt) as any)
    );
  });
};
