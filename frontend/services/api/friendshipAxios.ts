import { FriendshipStatus } from "./../../types/index";
import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

type CreateFriendshipDto = {
  recipientId: string;
  senderId: string;
  status: typeof FriendshipStatus;
};

export const createFriendship = async (friendship: CreateFriendshipDto) => {
  try {
    const response = await axios.post("friendships", friendship);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFriendship = async (
  friendshipId: string,
  friendship: any
) => {
  try {
    const response = await axios.patch(
      `friendships/${friendshipId}`,
      friendship
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteFriendship = async (friendshipId: string) => {
  try {
    const response = await axios.delete(`friendships/${friendshipId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
