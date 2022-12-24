import { FormControl, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "../../components/controls/TextInput";
import { getRoomsLayout } from "../../components/layouts/RoomsLayout";
import TopAppBar from "../../components/navigation/TopAppBar";
import Title from "../../components/UI/Title";
import { useAPI } from "../../hooks/useAPI";
import { RoomEntity, Styles, ThemedStyles } from "../../types";
import SendIcon from "@mui/icons-material/Send";
import Header from "../../components/UI/Header";
import { useRef } from "react";
import MessageList from "../../components/messages/MessageList";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: room, loading: roomLoading } = useAPI<RoomEntity>(
    `rooms/${id}`
  );
  const { control, handleSubmit } = useForm({ defaultValues: { message: "" } });
  const formRef = useRef();

  const handleSendMessage = (data: any) => {
    if (isInvalidByClick()) return;

    console.log(data);
  };

  const isInvalidByClick = () => {
    const form = formRef.current as unknown as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return true;
    }
  };

  return (
    <>
      {roomLoading ? (
        <Box p={2.5}>Loading...</Box>
      ) : (
        <>
          <Title title={room?.title as string} />
          <Header>{room?.title}</Header>
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit(handleSendMessage)}
            sx={styles.root as Styles}
          >
            <MessageList getMessagesKey={() => "messages"} />
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
    p: 2,
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

Room.getLayout = getRoomsLayout;

export default Room;
