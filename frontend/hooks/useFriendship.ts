import { useAppSocket } from "../contexts/SocketContext";
import {
  updateFriendship,
  createFriendship,
  deleteFriendship,
} from "../services/api/friendshipAxios";
import { FriendshipEntity, FriendshipStatus, UserEntity } from "../types";
import { useAPI } from "./useAPI";

export const useFriendship = (
  userIsOwner: boolean,
  user?: UserEntity,
  profileUser?: UserEntity
) => {
  const { socket } = useAppSocket();

  const { data: friendshipData, mutate: mutateFriendship } =
    useAPI<FriendshipEntity>(
      !userIsOwner && user && profileUser
        ? `friendships/pair?userIdOne=${user?.userId}&userIdTwo=${profileUser?.userId}`
        : null
    );

  const onAcceptFriendRequest = async () => {
    if (!profileUser || !friendshipData) return;
    await updateFriendship(friendshipData.friendshipId, {
      status: FriendshipStatus.ACCEPTED as keyof typeof FriendshipStatus,
    });
    mutateFriendship();
    socket?.emit("friendAccept", {
      recipientId: profileUser.userId,
    });
  };

  const onSendFriendRequest = async () => {
    if (!profileUser || !user) return;
    await createFriendship({
      recipientId: profileUser.userId,
      senderId: user.userId,
      status: FriendshipStatus.PENDING as keyof typeof FriendshipStatus,
    });
    mutateFriendship();
    socket?.emit("friendRequest", {
      recipientId: profileUser.userId,
    });
  };

  const onUnfriend = async () => {
    if (!friendshipData) return;
    await deleteFriendship(friendshipData.friendshipId);
    mutateFriendship(undefined);
  };

  const onFriendButtonClick = () => {
    if (friendshipData?.status === FriendshipStatus.PENDING) {
      if (friendshipData?.recipientId === user?.userId) {
        onAcceptFriendRequest();
      } else {
        onUnfriend();
      }
    } else if (friendshipData?.status === FriendshipStatus.ACCEPTED) {
      onUnfriend();
    } else {
      onSendFriendRequest();
    }
  };

  const getFriendshipText = () => {
    if (
      friendshipData?.status === FriendshipStatus.PENDING &&
      friendshipData?.recipientId === user?.userId
    ) {
      return "Accept Request";
    }
    if (
      friendshipData?.status === FriendshipStatus.PENDING &&
      friendshipData?.senderId === user?.userId
    ) {
      return "Cancel Request";
    }
    if (friendshipData?.status === FriendshipStatus.ACCEPTED) {
      return "Unfriend";
    }
    return "Add Friend";
  };

  return {
    friendshipData,
    onFriendButtonClick,
    getFriendshipText,
  };
};
