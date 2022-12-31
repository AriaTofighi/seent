import moment from "moment";
import { MouseEvent } from "react";
import { PaginatedResult, UserEntity } from "../types";

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
  } else {
    return date.format("MMM D YYYY, h:mm a");
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

  const otherUsers = room?.users.filter(
    (u: UserEntity) => u.userId !== user?.userId
  );
  return otherUsers.map((roomUser: any) => roomUser.user.name).join(", ");
};
