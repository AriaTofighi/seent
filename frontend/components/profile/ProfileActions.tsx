import { Button, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "../../styles/[id].styles";

type Props = {
  userIsOwner: boolean;
  onEditProfileClick: () => void;
  onFriendButtonClick: () => void;
  getFriendshipText: () => string;
};

const ProfileActions = ({
  userIsOwner,
  onEditProfileClick,
  onFriendButtonClick,
  getFriendshipText,
}: Props) => {
  return (
    <Stack direction="row" justifyContent="flex-end" p={2}>
      {userIsOwner ? (
        <Button
          sx={styles.editBtn}
          variant="outlined"
          onClick={onEditProfileClick}
        >
          Edit
        </Button>
      ) : (
        <Button
          sx={styles.editBtn}
          variant="outlined"
          onClick={onFriendButtonClick}
        >
          <PersonAddIcon />
          {getFriendshipText()}
        </Button>
      )}
    </Stack>
  );
};

export default ProfileActions;
