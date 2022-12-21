import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/UserContext";
import { useImageUpload } from "../../hooks/useImageUpload";
import { DEFAULT_POST_DIALOG_STATE } from "../../hooks/usePostDialog";
import { createPost } from "../../services/api/postAxios";
import { Styles } from "../../types";
import FileUpload from "../controls/FileUpload";
import TextInput from "../controls/TextInput";
import ImagePreview from "../images/ImagePreview";
import Modal from "../UI/Modal";
import PostCard from "./PostCard";
import PostDialogActions from "./PostDialogActions";

const PostDialog = ({
  open,
  setPostDialog,
  parentPost,
  onClose,
  mutatePostList,
}: Props) => {
  const { user } = useUser();
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
    mutatePostList();
    setPostDialog(DEFAULT_POST_DIALOG_STATE);
    setImage(undefined);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} fullWidth>
      <Box>
        {/* <Stack
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
        </Stack> */}
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
          <PostDialogActions
            setValue={setValue}
            getValues={getValues}
            handleBrowse={handleBrowse}
          />
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
    </Modal>
  );
};

type PostDialog = {
  open: boolean;
  parentPostId?: undefined;
};

type Props = {
  open: boolean;
  onClose: () => void;
  setPostDialog: any;
  parentPost?: any;
  mutatePostList: () => void;
};

const styles: Styles = {
  root: {},
  images: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    my: 2,
    justifyContent: "center",
  },
};

export type DefaultValueType = {
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
