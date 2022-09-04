import moment from "moment";
import { MouseEvent } from "react";

export const formatDate = (inputDate: Date) => {
  return moment(inputDate).format("MMM D YYYY, h:mm a");
};

export const convertDateForPicker = (d: Date) => {
  return moment(d).format("yyyy-MM-DD");
};

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const infiniteSWRToFlat = (
  paginatedObjArray: {
    data: any;
    meta: any;
  }[]
) => {
  return paginatedObjArray?.map((res: any) => res.data).flat() ?? [];
};
