import React from "react";

type Props = {
  body: string;
  createdAt?: string;
};

const Message = ({ body, createdAt }: Props) => {
  return <p>{body}</p>;
};

export default Message;
