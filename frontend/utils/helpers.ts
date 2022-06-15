import moment from "moment";

export const formatDate = (inputDate: Date) => {
  return moment(inputDate).format("MMM D YYYY, h:mm a");
};

export const convertDateForPicker = (d: Date) => {
  return moment(d).format("yyyy-MM-DD");
};
