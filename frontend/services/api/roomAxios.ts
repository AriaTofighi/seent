import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

type CreateRoomDto = {
  title: string;
  userIds: string[];
  ownerId: string;
};

export const createRoom = async ({
  title,
  userIds,
  ownerId,
}: CreateRoomDto) => {
  try {
    const response = await axios.post("rooms", {
      title,
      userIds,
      ownerId,
    });
    toast.success("Created room successfully");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    const response = await axios.delete(`rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
