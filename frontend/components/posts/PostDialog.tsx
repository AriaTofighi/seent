import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import PostCard from "./PostCard";
import { useForm } from "react-hook-form";
import { Styles } from "../../types/types";
import EmojiPicker from "emoji-picker-react";
import TextInput from "../controls/TextInput";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { fileToBase64 } from "../../utils/helpers";
import ShieldIcon from "@mui/icons-material/Shield";
import { useUser } from "../../contexts/UserContext";
import { createPost } from "../../services/api/postAxios";
import React, { MouseEvent, useRef, useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { DEFAULT_POST_DIALOG_STATE } from "../../hooks/usePostDialog";
import { CreatePostDto } from "../../../backend/src/types";

type PostDialog = {
  open: boolean;
  parentPostId?: undefined;
};

type KeyValuePair = {
  [property: string]: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  setPostDialog: any;
  parentPost?: any;
  mutate: () => void;
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
  },
  emojiPicker: {
    width: "100%",
    marginBottom: "20px",
    boxShadow: "none",
  },
};

type DefaultValueType = {
  body: string;
  images: File | undefined;
};

const defaultValues = {
  body: "",
  images: undefined,
};

const PRIVACY_MODES = {
  PUBLIC: true,
  PRIVATE: false,
};

const PostDialog = ({
  open,
  setPostDialog,
  parentPost,
  onClose,
  mutate,
}: Props) => {
  const { control, reset, handleSubmit, setValue, getValues, watch } =
    useForm<DefaultValueType>({
      defaultValues,
    });
  const [chosenImages, setChosenImages] = useState<any>();
  const [privacyMode, setPrivacyMode] = useState(PRIVACY_MODES.PUBLIC);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useUser();
  const fileInputRef = useRef<any>();

  const onEmojiClick = (event: MouseEvent, emojiObject: any) => {
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  const handleSubmitPost = async (formValues: any) => {
    const { body, images } = formValues;
    const formData = new FormData();
    formData.append("images", images);
    formData.append("body", body);
    formData.append("authorId", user.userId);
    formData.append("isPublic", "true");
    if (parentPost) {
      formData.append("parentPostId", parentPost.postId);
    }
    await createPost(formData);
    setPostDialog(DEFAULT_POST_DIALOG_STATE);
    mutate();
    reset();
  };

  const handleBrowse = () => {
    // Reseting the file input to allow the user to pick the same file twice in a row.
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleSelectedPic = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue("images", file);
    const srcFile = await fileToBase64(file);
    setChosenImages(srcFile);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={"sm"}
      sx={{ m: -2 }}
    >
      <DialogContent sx={{ p: 2 }}>
        <Box sx={styles.root}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <IconButton
              onClick={onClose}
              size="small"
              edge="start"
              sx={{ p: 0.5 }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          {parentPost?.body ? (
            <PostCard
              postId={parentPost.postId}
              post={parentPost}
              showActions={false}
            />
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
            {chosenImages && (
              <Box sx={styles.images}>
                <Image
                  src={chosenImages}
                  width="250"
                  height="200"
                  alt="Post"
                  layout="fixed"
                />
              </Box>
            )}
            <Button variant="contained" type="submit" fullWidth>
              Post
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleSelectedPic}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
