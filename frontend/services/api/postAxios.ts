import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createPost = async (formData: FormData) => {
  try {
    const response = await axios.post("posts", formData);
    toast.success("Created post successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`posts/${postId}`);
    toast.success("Deleted post successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
