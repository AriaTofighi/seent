import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCard from "./PostCard";
import { DEFAULT_POST_DIALOG_STATE } from "../../hooks/usePostDialog";

type PostDialog = {
  open: boolean;
  parentPostId?: undefined;
};

type Props = {
  open: boolean;
  onClose: () => void;
  setPostDialog: any;
  parentPost?: any;
};

const styles: Styles = {
  root: {
    mt: -1,
  },
};

const defaultValues = {
  body: "",
};

const PRIVACY_MODES = {
  PUBLIC: true,
  PRIVATE: false,
};

const PostDialog = ({ open, setPostDialog, parentPost, onClose }: Props) => {
  const { control, reset, handleSubmit, setValue, getValues } = useForm({
    defaultValues,
  });
  const [privacyMode, setPrivacyMode] = useState(PRIVACY_MODES.PUBLIC);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const onEmojiClick = (event: MouseEvent, emojiObject: any) => {
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  const handleSubmitPost = async (formValues: any) => {
    const { body } = formValues;
    await createPost(user.userId, privacyMode, body, parentPost?.postId);
    mutate("posts");
    setPostDialog(DEFAULT_POST_DIALOG_STATE);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogContent>
        <Box sx={styles.root}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <IconButton onClick={onClose} size="small" edge="start">
              <CloseIcon />
            </IconButton>
          </Stack>
          {parentPost?.body ? (
            <PostCard postId={parentPost.postId} showActions={false} />
          ) : (
            <Typography variant="h5">What's on your mind?</Typography>
          )}

          <form onSubmit={handleSubmit(handleSubmitPost)}>
            <TextInput
              name="body"
              label=""
              placeholder={parentPost ? "Write your reply here" : "Write here"}
              control={control}
              type="text"
              sx={{ mb: 1, mt: 2 }}
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
