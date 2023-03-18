import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createNotification = async (notification: any) => {
  try {
    const response = await axios.post("notifications", notification);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateNotification = async (
  formData: FormData,
  notificationId: string
) => {
  try {
    const response = await axios.patch(
      `notifications/${notificationId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const markNotificationsRead = async (
  notificationIds: string[],
  read: boolean
) => {
  try {
    const response = await axios.patch("notifications", {
      notificationIds,
      read,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
