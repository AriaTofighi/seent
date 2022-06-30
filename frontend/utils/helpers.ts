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
