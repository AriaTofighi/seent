import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
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
import useSocket from "../../hooks/useSocket";
import { getDisplayedRoomTitle } from "../../utils";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const { data: room, loading: roomLoading } = useAPI<any>(`rooms/${id}`);
  const { control, handleSubmit } = useForm({ defaultValues: { message: "" } });
  const formRef = useRef();
  const roomUserId = room?.users?.find(
    (u: any) => u.userId !== user?.userId
  )?.roomUserId;
  const socket = useSocket("messages");
  const title = getDisplayedRoomTitle(room, user as any);

  const handleSendMessage = async (data: any) => {
    const { message } = data;
    if (isInvalidByClick()) return;
    await createMessage({ body: message, roomUserId: roomUserId as string });
    // mutate(getMessagesKey());
    socket?.emit("sendMessage", { roomId: id, message });
  };

  const isInvalidByClick = () => {
    const form = formRef.current as unknown as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return true;
    }
  };

  const getMessagesKey = () => `messages?roomId=${id}`;

  useEffect(() => {
    socket?.on("newMessage", async (data: any) => {
      console.log("test");
      await mutate(getMessagesKey());
    });
  }, [socket]);

  return (
    <>
      {roomLoading ? (
        <Box p={2.5}>Loading...</Box>
      ) : (
        <>
          <Title title={title} />
          <Header>{title}</Header>
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit(handleSendMessage)}
            sx={styles.root as Styles}
          >
            <MessageList getMessagesKey={getMessagesKey} />
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
      `calc(100% - 1px - ${theme.mixins.toolbar.minHeight as number}px)`,
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
