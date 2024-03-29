import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Styles } from "../../types";
import TextInput from "../controls/TextInput";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "../../services/api/userAxios";
import { useImageUpload } from "../../hooks/useImageUpload";
import FileUpload from "../controls/FileUpload";
import { createImage, updateImage } from "../../services/api/imageAxios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Modal from "../UI/Modal";
import { useRouter } from "next/router";

const defaultValues = {
  name: "",
  bio: "",
  location: "",
  gender: "",
  username: "",
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
};

const EditProfileDialog = ({ open, setOpen, onSave }: Props) => {
  const { control, reset, handleSubmit } = useForm({ defaultValues });
  const { image, handleImageChange, fileInputRef, handleBrowse } =
    useImageUpload();
  const { user, mutate } = useUser();
  const router = useRouter();

  const handleSave = async (data: typeof defaultValues) => {
    const res = await updateUser(user?.userId as string, data);
    if (!res) return;
    mutate();
    onSave();
    router.push(`/${res.username}`);
  };

  const handleUpload = async () => {
    if (!user) return;
    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("userId", user.userId);
    formData.append("type", "USER_AVATAR");
    if (user.images?.[0]) {
      await updateImage(formData, user.images[0].imageId as string);
    } else {
      await createImage(formData);
    }
    onSave();
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio ?? "",
        location: user.location ?? "",
        gender: user.gender ?? "",
        username: user.username,
      });
    } else {
      reset(defaultValues);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      if (image) {
        await handleUpload();
        mutate();
      }
    })();
  }, [image]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} maxWidth="xs">
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Typography variant="h5">Edit Profile</Typography>
      </Stack>

      <form onSubmit={handleSubmit(handleSave)}>
        <Stack
          sx={{
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={handleBrowse}
          >
            <FileUploadIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: 1,
                transform: "translate(-50%, -50%)",
              }}
            />
            <Avatar
              src={user?.images ? user.images[0]?.url : undefined}
              sx={{
                maxWidth: {
                  lg: 135,
                  xs: 75,
                },
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
          <TextInput name="name" label="Name" control={control} fullWidth />
          <TextInput
            name="username"
            label="Username"
            control={control}
            fullWidth
          />
          <TextInput
            name="bio"
            label="Bio"
            control={control}
            required={false}
            placeholder="Tell us about yourself"
            fullWidth
          />
          <TextInput
            name="location"
            label="Location"
            control={control}
            required={false}
            fullWidth
          />
          <Button fullWidth type="submit" variant="contained">
            Save
          </Button>
        </Stack>
        <FileUpload onChange={handleImageChange} innerRef={fileInputRef} />
      </form>
    </Modal>
  );
};

const styles: Styles = {
  root: {},
};

export default EditProfileDialog;
