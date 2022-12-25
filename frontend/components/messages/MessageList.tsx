import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useAPI } from "../../hooks/useAPI";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import { MessageEntity, Styles } from "../../types";
import Message from "./Message";

type Props = {
  getMessagesKey: () => string;
};

const MessageList = ({ getMessagesKey }: Props) => {
  const { data: messages, loading: messagesLoading } =
    useAPI<MessageEntity[]>(getMessagesKey);
  const boxRef = useRef<HTMLDivElement>(null);

  useScrollToBottom(boxRef, messages);

  if (messagesLoading) return <Box p={2.5}>Loading...</Box>;

  return (
    <Box sx={styles.root} ref={boxRef}>
      {messages?.map((m) => (
        <Message key={m.messageId} body={m.body as string} />
      ))}
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
  },
};

export default MessageList;
