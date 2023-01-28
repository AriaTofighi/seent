import SendIcon from "@mui/icons-material/Send";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/controls/TextInput";
import { getMessagesLayout } from "../../components/layouts/MessagesLayout";
import MessageList from "../../components/messages/MessageList";
import Header from "../../components/UI/Header";
import Title from "../../components/UI/Title";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import { createMessage } from "../../services/api/messageAxios";
import { Styles, ThemedStyles } from "../../types";
import { mutate } from "swr";
import { getDisplayedRoomTitle } from "../../utils";
import { useAppSocket } from "../../contexts/SocketContext";
import useSocketEvent from "../../hooks/useSocketEvent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OptionsIcon from "@mui/icons-material/MoreVert";
import UserAvatar from "../../components/users/UserAvatar";
import { useRoomInfo } from "../../hooks/useRoomInfo";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const {
    data: room,
    loading: roomLoading,
    error: roomError,
    mutate: mutateRoom,
  } = useAPI<any>(id ? `rooms/${id}` : null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { message: "" },
  });
  const formRef = useRef();
  const roomUserId = room?.users?.find(
    (u: any) => u.userId === user?.userId
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

  const getMessagesKey = () => `messages?roomId=${id}`;

  const onNewMessage = useCallback(() => {
    mutateRoom();
    mutate(getMessagesKey());
  }, [id]);

  useSocketEvent("newMessage", onNewMessage);

  if (roomError) return <Box p={2.5}>Error</Box>;

  return (
    <>
      {roomLoading ? (
        <Box p={2.5}>Loading...</Box>
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
            <IconButton onClick={() => alert("More options")}>
              <OptionsIcon />
            </IconButton>
          </Header>
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit(handleSendMessage)}
            sx={styles.root as Styles}
          >
            <MessageList
              getMessagesKey={getMessagesKey}
              isGroupChat={room.users.length > 2}
            />
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
  },
  messageInput: {
    height: 40,
    borderRadius: 7,
  },
};

Room.getLayout = getMessagesLayout;

export default Room;
