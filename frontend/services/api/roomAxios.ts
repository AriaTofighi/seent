import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

type CreateRoomDto = {
  title: string;
  userIds: string[];
  ownerId: string;
};

export const createRoom = async (room: CreateRoomDto) => {
  try {
    const response = await axios.post("rooms", room);
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

export const deleteRoomUser = async (roomUserId: string) => {
  try {
    const response = await axios.delete(`room-users/${roomUserId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
