import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import ShieldIcon from "@mui/icons-material/Shield";
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
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/UserContext";
import { useImageUpload } from "../../hooks/useImageUpload";
import { DEFAULT_POST_DIALOG_STATE } from "../../hooks/usePostDialog";
import { createPost } from "../../services/api/postAxios";
import { Styles } from "../../types";
import FileUpload from "../controls/FileUpload";
import TextInput from "../controls/TextInput";
import ImagePreview from "../images/ImagePreview";
import PostCard from "./PostCard";

const PostDialog = ({
  open,
  setPostDialog,
  parentPost,
  onClose,
  postsRes,
  mutatePost,
  mutatePostList,
}: Props) => {
  const { user } = useUser();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(PRIVACY_MODES.PUBLIC);
  const {
    image,
    imagePreview,
    handleImageChange,
    setImage,
    handleBrowse,
    fileInputRef,
  } = useImageUpload();
  const { control, reset, handleSubmit, setValue, getValues } =
    useForm<DefaultValueType>({
      defaultValues,
    });

  const onEmojiClick = (event: MouseEvent, emojiObject: any) => {
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  const handleSubmitPost = async (formValues: DefaultValueType) => {
    if (!user) return;
    const { body } = formValues;
    const formData = new FormData();
    formData.append("images", image as Blob);
    formData.append("body", body);
    formData.append("authorId", user.userId);
    formData.append("isPublic", "true");
    if (parentPost) {
      formData.append("parentPostId", parentPost.postId);
    }
    await createPost(formData);
    mutatePost?.();
    mutatePostList();
    setPostDialog(DEFAULT_POST_DIALOG_STATE);
    reset();
    setImage;
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
            <Box
              sx={{
                borderLeft: "1px solid",
                borderRight: "1px solid",
                borderTop: "1px solid",
                borderRadius: 1,
                borderColor: "divider",
              }}
            >
              <PostCard
                postId={parentPost.postId}
                post={parentPost}
                showActions={false}
                postsRes={postsRes}
                mutatePost={mutatePost}
                mutatePostList={mutatePostList}
              />
            </Box>
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
            {imagePreview && (
              <Box sx={styles.images}>
                <ImagePreview
                  onClose={() => {
                    setImage(undefined);
                  }}
                  src={imagePreview as string}
                  alt="Image Preview"
                />
              </Box>
            )}
            <Button variant="contained" type="submit" fullWidth>
              Post
            </Button>
            <FileUpload innerRef={fileInputRef} onChange={handleImageChange} />
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

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
  postsRes: any;
  mutatePost?: () => void;
  mutatePostList: () => void;
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

type DefaultValueType = {
  body: string;
};

const defaultValues = {
  body: "",
};

const PRIVACY_MODES = {
  PUBLIC: true,
  PRIVATE: false,
};

export default PostDialog;
