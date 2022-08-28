import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createImage = async (formData: FormData) => {
  try {
    const response = await axios.post("images", formData);
    toast.success("Created image successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateImage = async (formData: FormData, imageId: string) => {
  try {
    const response = await axios.patch(`images/${imageId}`, formData);
    toast.success("Updated image successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
