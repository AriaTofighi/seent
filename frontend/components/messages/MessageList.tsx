import { Box } from "@mui/system";
import React, { useRef } from "react";
import { useAPI } from "../../hooks/useAPI";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import { MessageEntity, Styles } from "../../types";
import Message from "./Message";
import { LinearProgress } from "@mui/material";

type Props = {
  getMessagesKey: () => string;
  isGroupChat: boolean;
};

const MessageList = ({ getMessagesKey, isGroupChat }: Props) => {
  const { data: messages, loading: messagesLoading } =
    useAPI<MessageEntity[]>(getMessagesKey);
  const boxRef = useRef<HTMLDivElement>(null);

  useScrollToBottom(boxRef, messages);

  if (messagesLoading) return <LinearProgress sx={{ m: -1.5 }} />;

  return (
    <Box sx={styles.root} ref={boxRef}>
      {messages?.map((m, index) => {
        const msgUserId = m.roomUser?.user?.userId;
        const previousMsgUserId = messages[index - 1]?.roomUser?.user?.userId;
        const msgUserSameAsPrevious = msgUserId === previousMsgUserId;
        const avatarUrl = m.roomUser?.user?.images[0]?.url;
        const nextUserRepeated =
          msgUserId === messages[index + 1]?.roomUser?.user?.userId;

        return (
          <Message
            key={m.messageId}
            body={m.body as string}
            avatarUrl={avatarUrl}
            showAvatar={!msgUserSameAsPrevious}
            createdAt={m.createdAt as Date}
            name={m.roomUser?.user?.name as string}
            userId={m.roomUser?.user?.userId as string}
            username={m.roomUser?.user?.username as string}
            repeatedUser={msgUserSameAsPrevious}
            nextUserRepeated={nextUserRepeated}
            isGroupChat={isGroupChat}
          />
        );
      })}
    </Box>
  );
};

const styles: Styles = {
  root: {
    display: "flex",
    flexDirection: "column-reverse",
    overflowY: "auto",
    height: "100%",
    p: 1,
    gap: 1,
  },
};

export default MessageList;
