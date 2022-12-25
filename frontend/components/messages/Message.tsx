import { Box } from "@mui/material";
import React from "react";

type Props = {
  body: string;
  createdAt?: string;
  name?: string;
  avatarUrl?: string;
};

const Message = ({ body, createdAt, name, avatarUrl }: Props) => {
  return <Box>{body}</Box>;
};

export default Message;
