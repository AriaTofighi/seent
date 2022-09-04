import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const uploadUserImage = async (convertedFile: any, userId: string) => {
  try {
    const response = await axios.post("user_images", {
      convertedFile,
      userId,
    });
    toast.success("Uploaded photo successfully");
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error("Error uploading photo");
  }
};

export const updateUser = async (userId: string, user: any) => {
  try {
    const response = await axios.patch(`users/${userId}`, user);
    toast.success("Updated user successfully");
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error("Error updating user");
  }
};
