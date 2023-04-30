import { toast } from "react-toastify";
import { DEFAULT_API as axios } from "./AxiosInstance";

export const createTag = async (name: string, creatorId: string) => {
  try {
    const response = await axios.post("tags", {
      name,
      creatorId,
    });
    toast.success("Tag created successfully");
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
