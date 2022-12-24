import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

type CreateMessageDto = {
  body: string;
  messageUserId: string;
};

export const createRoom = async (message: CreateMessageDto) => {
  try {
    const response = await axios.post("messages", message);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (messageId: string) => {
  try {
    const response = await axios.delete(`messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
