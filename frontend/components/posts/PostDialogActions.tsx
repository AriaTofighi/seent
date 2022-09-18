import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import styles from "../navigation/MenuItem.styles";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import ShieldIcon from "@mui/icons-material/Shield";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { DefaultValueType } from "./PostDialog";
import { useState } from "react";

type Props = {
  setValue: UseFormSetValue<DefaultValueType>;
  getValues: UseFormGetValues<DefaultValueType>;
  handleBrowse: () => void;
};

const PostDialogActions = ({ setValue, getValues, handleBrowse }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (_event: any, emojiObject: IEmojiData) => {
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  return (
    <>
      <Box
        sx={{
          mb: 1,
        }}
      >
        <Stack direction="row">
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
            <IconButton>
              <ShieldIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          pickerStyle={styles.emojiPicker as KeyValuePair}
        />
      )}
    </>
  );
};

type KeyValuePair = {
  [property: string]: string;
};

export default PostDialogActions;
