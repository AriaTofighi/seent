import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { ReactionEntity } from "../../types";
import Modal from "../UI/Modal";
import UserCard from "../users/UserCard";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  reactions: any[];
};

const ReactionsModal = ({ open, setOpen, reactions }: Props) => {
  const onClose = () => {
    setOpen(false);
  };

  console.log(reactions);

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h6">Likes</Typography>
      {reactions.map((reaction) => (
        <UserCard key={reaction.reactionId} user={reaction.user} />
      ))}
    </Modal>
  );
};

export default ReactionsModal;
