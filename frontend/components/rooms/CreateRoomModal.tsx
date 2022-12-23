import React, { useState } from "react";
import Modal from "../UI/Modal";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CreateRoomModal = ({ open, setOpen }: Props) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Create Room">
      Create a new room to chat with friends.
    </Modal>
  );
};

export default CreateRoomModal;
