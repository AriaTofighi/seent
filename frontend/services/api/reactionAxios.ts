import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createReaction = async (
  postId: string,
  userId: string,
  type: string
) => {
  try {
    const response = await axios.post("reactions", {
      postId,
      userId,
      type,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReaction = async (reactionId: string) => {
  try {
    const response = await axios.delete(`reactions/${reactionId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
