import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Styles } from "../../types/types";
import TextInput from "../controls/TextInput";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import ShieldIcon from "@mui/icons-material/Shield";
import { useUser } from "../../contexts/UserContext";
import { createPost } from "../../services/api/postAxios";
import { useSWRConfig } from "swr";
import EmojiPicker from "emoji-picker-react";

type Props = {
  open: boolean;
  onClose: () => void;
  setOpen: (open: boolean) => void;
};

const styles: Styles = {
  root: {},
};

const defaultValues = {
  body: "",
};

const PRIVACY_MODES = {
  PUBLIC: true,
  PRIVATE: false,
};

const PostDialog = ({ open, setOpen }: Props) => {
  const { control, reset, handleSubmit, setValue, getValues } = useForm({
    defaultValues,
  });
  const [privacyMode, setPrivacyMode] = useState(PRIVACY_MODES.PUBLIC);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const onEmojiClick = (event: MouseEvent, emojiObject: any) => {
    setChosenEmoji(emojiObject);
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  const handleSubmitPost = async (formValues: any) => {
    const { body } = formValues;
    await createPost(user.userId, privacyMode, body);
    mutate("posts");
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth={"xs"}
    >
      <DialogContent>
        <Box sx={styles.root}>
          <Typography variant="h5" mb={3}>
            What's on your mind?
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitPost)}>
            <TextInput
              name="body"
              label=""
              placeholder="Write here"
              control={control}
              type="text"
              sx={{ mb: 1 }}
              fullWidth
              multiline
              rows={4}
              InputLabelProps={{ required: false }}
            />
            {/* Emojis and Options */}
            <Box sx={{ mb: 1 }}>
              <Stack direction="row">
                <Tooltip title="Emoji">
                  <IconButton
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Media">
                  <IconButton>
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
                pickerStyle={{
                  width: "100%",
                  marginBottom: "20px",
                  boxShadow: "none",
                }}
              />
            )}
            <Button variant="contained" type="submit" fullWidth>
              Post
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
