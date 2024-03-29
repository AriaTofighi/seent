import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { useAppSocket } from "../../contexts/SocketContext";
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
  const { socket } = useAppSocket();
  const [submittingPost, setSubmittingPost] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(PRIVACY_MODES.PUBLIC);
  const {
    image,
    imagePreview,
    handleImageChange,
    setImage,
    handleBrowse,
    fileInputRef,
  } = useImageUpload();
  const { control, reset, handleSubmit, setValue, getValues, trigger, watch } =
    useForm<DefaultValueType>({
      defaultValues,
    });
  const tags = watch("tags");

  const handleSubmitPost = async (formValues: DefaultValueType) => {
    if (!user) return;
    setSubmittingPost(true);

    const { body: rawBody } = formValues;
    const body = rawBody.trim();

    const formDataVals = {
      body,
      authorId: user.userId,
      isPublic: String(privacyMode === PRIVACY_MODES.PUBLIC),
      images: image as Blob,
      tags: tags.map((tag: any) => tag.tagId),
    };

    type FormDataVals = typeof formDataVals;

    const formData = new FormData();
    Object.keys(formDataVals).forEach((key) => {
      const value = formDataVals[key as keyof FormDataVals];

      // Special handling for 'tags' key.
      if (key === "tags" && Array.isArray(value)) {
        // If 'value' is an array of strings, convert it to a JSON string.
        formData.append(key, JSON.stringify(value));
      } else if (key === "images" && Array.isArray(value)) {
        // If 'value' is an array of Blobs (images), append each Blob individually.
        value.forEach((item, index) => {
          if (item instanceof Blob) {
            formData.append(`${key}[${index}]`, item);
          }
        });
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    if (parentPost) {
      formData.append("parentPostId", parentPost.postId);
    }

    await createPost(formData);
    if (parentPost) {
      socket?.emit("postEngagement", {
        recipientId: parentPost.authorId,
      });
    }
    mutatePostList();
    mutate(`users/${user.userId}`);
    setPostDialog(DEFAULT_POST_DIALOG_STATE);
    setSubmittingPost(false);
    setImage(undefined);
    reset();
  };

  const handleSelectPrivacy = (privacyMode: string) => {
    setPrivacyMode(privacyMode);
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleImageChange(e);
  };

  const validateBody = (value: string) => {
    if (!value.trim() && !Boolean(image)) {
      return "Please write something or upload an image";
    }
    return true;
  };

  useEffect(() => {
    if (!image) return;
    trigger("body");
  }, [image, trigger]);

  return (
    <Modal open={open} onClose={onClose} fullWidth>
      <Box>
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
            <PostCard post={parentPost} showActions={false} />
          </Box>
        ) : (
          <Typography variant="h5">What's on your mind?</Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitPost)}
          sx={{ position: "relative" }}
        >
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
            required={false}
            rules={{
              validate: validateBody,
            }}
          />
          {tags.length > 0 && (
            <Box sx={{ py: 1, display: "flex", gap: 1 }}>
              {tags.map((tag: any) => (
                <Chip
                  key={tag.tagId}
                  label={tag.name}
                  onDelete={() => {
                    setValue(
                      "tags",
                      watch("tags").filter((t: any) => t.tagId !== tag.tagId)
                    );
                  }}
                />
              ))}
            </Box>
          )}

          <PostDialogActions
            setValue={setValue}
            getValues={getValues}
            handleBrowse={handleBrowse}
            handleSelectPrivacy={handleSelectPrivacy}
            privacyMode={privacyMode}
            control={control}
            watch={watch}
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
          <Button
            variant="contained"
            type="submit"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            disabled={submittingPost}
            fullWidth
          >
            {submittingPost ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              "Post"
            )}
          </Button>
          <FileUpload innerRef={fileInputRef} onChange={onImageChange} />
        </Box>
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
  tags: any[];
};

const defaultValues = {
  body: "",
  tags: [],
};

const PRIVACY_MODES = {
  PUBLIC: "public",
  FRIENDS: "friends",
};

export default PostDialog;
