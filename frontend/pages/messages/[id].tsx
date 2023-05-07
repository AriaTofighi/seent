import SendIcon from "@mui/icons-material/Send";
import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/controls/TextInput";
import { getMessagesLayout } from "../../components/layouts/MessagesLayout";
import MessageList from "../../components/messages/MessageList";
import Header from "../../components/UI/Header";
import Title from "../../components/UI/Title";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import { createMessage } from "../../services/api/messageAxios";
import {
  NotificationEntity,
  RoomEntity,
  RoomUserEntity,
  Styles,
  ThemedStyles,
} from "../../types";
import { mutate } from "swr";
import { getDisplayedRoomTitle } from "../../utils";
import { useAppSocket } from "../../contexts/SocketContext";
import useSocketEvent from "../../hooks/useSocketEvent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OptionsIcon from "@mui/icons-material/MoreVert";
import UserAvatar from "../../components/users/UserAvatar";
import { useRoomInfo } from "../../hooks/useRoomInfo";
import { markNotificationsRead } from "../../services/api/notificationAxios";
import useMenu from "../../hooks/useMenu";
import { deleteRoomUser } from "../../services/api/roomAxios";
import { useTypingUsers } from "../../hooks/useTypingUsers";
import { useRoomNotifications } from "../../hooks/useRoomNotifications";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const { anchorEl, handleClick, handleClose, open } = useMenu();
  const [shouldGetNotis, setShouldGetNotis] = useState(false);

  const {
    data: room,
    loading: roomLoading,
    error: roomError,
    mutate: mutateRoom,
  } = useAPI<RoomEntity>(id ? `rooms/${id}` : null);

  const { renderTypingUsers } = useTypingUsers(
    id as string,
    room as RoomEntity,
    user
  );

  const { mutateRoomNotifications } = useRoomNotifications({
    roomId: id as string,
    userId: user?.userId as string,
    shouldGetNotis,
  });

  const [typingTimeout, setTypingTimeout] = useState<any>(null);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { message: "" },
  });
  const formRef = useRef();
  const roomUserId = room?.roomUsers?.find(
    (u: RoomUserEntity) => u.userId === user?.userId
  )?.roomUserId;
  const { socket } = useAppSocket();
  const title = getDisplayedRoomTitle(room, user as any);
  const { userId, username, avatarUrl } = useRoomInfo(room);

  const handleSendMessage = async (data: any) => {
    const { message } = data;
    if (isInvalidByClick()) return;
    await createMessage({ body: message, roomUserId: roomUserId as string });
    socket?.emit("sendMessage", { roomId: id, message });
    reset();
  };

  const isInvalidByClick = () => {
    const form = formRef.current as unknown as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return true;
    }
  };

  const handleTyping = useCallback(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    socket?.emit("userTyping", { roomId: id, isTyping: true });

    const newTimeout = setTimeout(() => {
      socket?.emit("userTyping", { roomId: id, isTyping: false });
    }, 2000);

    setTypingTimeout(newTimeout);
  }, [socket, id, typingTimeout]);

  const getMessagesKey = () => `messages?roomId=${id}`;

  const onNewMessage = async () => {
    mutateRoom();
    mutate(getMessagesKey());
  };

  useSocketEvent("newMessage", onNewMessage);

  const handleLeaveConversation = async () => {
    if (!roomUserId) return;

    await deleteRoomUser(roomUserId);
    await mutateRoom();
    await mutate(`rooms?userId=${user?.userId}`);
    router.push("/messages");
  };

  useEffect(() => {
    (async () => {
      if (!room) return;
      if (shouldGetNotis) {
        await mutateRoomNotifications();
      } else {
        setShouldGetNotis(true);
      }
    })();
  }, [room, shouldGetNotis]);

  useEffect(() => {
    if (!watch("message")) return;
    handleTyping();
  }, [watch("message")]);

  if (roomError) return <Box p={2.5}>Error</Box>;

  return (
    <>
      {roomLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Title title={title} />
          <Header>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                maxWidth: "90%",
              }}
            >
              <IconButton onClick={() => router.push("/messages")}>
                <ArrowBackIcon />
              </IconButton>
              <UserAvatar
                userId={userId}
                username={username}
                avatarUrl={avatarUrl}
              />{" "}
              <Typography
                variant="h6"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Typography>
            </Box>
            <IconButton onClick={handleClick}>
              <OptionsIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleLeaveConversation}>
                Leave conversation
              </MenuItem>
            </Menu>
          </Header>
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit(handleSendMessage)}
            sx={styles.root as Styles}
          >
            <MessageList
              getMessagesKey={getMessagesKey}
              isGroupChat={(room?.roomUsers?.length ?? 0) > 2}
            />

            {renderTypingUsers()}

            <Box sx={styles.messageInputContainer as Styles}>
              <TextInput
                name="message"
                control={control}
                type="text"
                autoComplete="off"
                placeholder="Message..."
                InputProps={{
                  sx: styles.messageInput as Styles,
                }}
                fullWidth
              />
              <IconButton onClick={handleSubmit(handleSendMessage)}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

const styles: ThemedStyles = {
  root: {
    p: 1.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: (theme) =>
      `calc(100% - 10px - ${theme.mixins.toolbar.minHeight as number}px)`,
  },
  messageInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: 1,
  },
  messageInput: {
    height: 40,
    borderRadius: 7,
  },
};

Room.getLayout = getMessagesLayout;

export default Room;
