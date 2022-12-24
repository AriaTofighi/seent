import { Box } from "@mui/system";
import React from "react";
import { MessageEntity, Styles } from "../../types";
import Message from "./Message";

type Props = {
  getMessagesKey: () => string;
};

const MessageList = ({ getMessagesKey }: Props) => {
  const messages: Partial<MessageEntity>[] = [
    { body: "hello" },
    { body: "yooo" },
  ];
  return (
    <Box sx={styles.root}>
      {messages.map((m) => (
        <Message key={m.body} body={m.body as string} />
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
    p: 2,
  },
};

export default MessageList;
