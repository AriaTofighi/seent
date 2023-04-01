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

  return (
    <Modal open={open} onClose={onClose} title="Likes">
      {reactions.map((reaction) => (
        <UserCard key={reaction.reactionId} user={reaction.user} />
      ))}
    </Modal>
  );
};

export default ReactionsModal;
