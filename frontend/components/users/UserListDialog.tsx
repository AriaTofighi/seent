import React from "react";
import { UserEntity } from "../../types";
import Modal from "../UI/Modal";
import UserCard from "./UserCard";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  users: UserEntity[] | undefined;
};

const UserListModal = ({ open, setOpen, users }: Props) => {
  const onUserClick = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Friends">
      {users?.map((user) => (
        <UserCard key={user.userId} user={user} onClick={onUserClick} />
      ))}
    </Modal>
  );
};

export default UserListModal;
