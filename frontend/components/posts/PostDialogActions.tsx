import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import ShieldIcon from "@mui/icons-material/Shield";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { DefaultValueType } from "./PostDialog";
import { useState } from "react";
import { Styles } from "../../types";
import useMenu from "../../hooks/useMenu";

type Props = {
  setValue: UseFormSetValue<DefaultValueType>;
  getValues: UseFormGetValues<DefaultValueType>;
  handleBrowse: () => void;
  handleSelectPrivacy: (privacyMode: string) => void;
  privacyMode: string;
};

const PostDialogActions = ({
  setValue,
  getValues,
  handleBrowse,
  handleSelectPrivacy,
  privacyMode,
}: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { anchorEl, handleClick, handleClose, open } = useMenu();

  const onEmojiClick = (_event: any, emojiObject: IEmojiData) => {
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  const handleMenuItemClick = (privacyMode: string) => {
    handleSelectPrivacy(privacyMode);
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          mb: 1,
        }}
      >
        <Stack direction="row" alignItems="center">
          <Tooltip title="Emoji">
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <EmojiEmotionsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Media">
            <IconButton onClick={handleBrowse}>
              <ImageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Privacy">
            <IconButton onClick={handleClick}>
              <ShieldIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" mt={0.5}>
            {privacyMode === "public"
              ? "Visible to everyone"
              : "Visible to friends"}
          </Typography>
        </Stack>
      </Box>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          pickerStyle={styles.emojiPicker as KeyValuePair}
        />
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography p={1.5}>Who should see this post?</Typography>
        <MenuItem onClick={() => handleMenuItemClick("public")}>
          Everyone
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("friends")}>
          Friends
        </MenuItem>
      </Menu>
    </>
  );
};

const styles: Styles = {
  root: {
    mt: -1,
  },
  images: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    my: 2,
    justifyContent: "center",
  },
  emojiPicker: {
    width: "100%",
    marginBottom: "20px",
    boxShadow: "none",
  },
};

type KeyValuePair = {
  [property: string]: string;
};

export default PostDialogActions;
