import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Styles } from "../../types/types";
import TextInput from "../controls/TextInput";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "../../services/api/userAxios";

const EditProfileDialog = ({ open, setOpen }: Props) => {
  const { control, reset, handleSubmit } = useForm({ defaultValues });
  const { user, mutate } = useUser();

  const handleSave = async (data: any) => {
    await updateUser(user?.userId ?? "", data);
    mutate();
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio ?? "",
        location: user.location ?? "",
        gender: user.gender ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [user]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="xs"
      fullWidth
      sx={{ m: -2 }}
    >
      <DialogContent>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Typography variant="h5">Edit Profile</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ m: 0 }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <form onSubmit={handleSubmit(handleSave)}>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <TextInput name="name" label="Name" control={control} fullWidth />
            <TextInput
              name="bio"
              label="Bio"
              control={control}
              required={false}
              fullWidth
            />
            <TextInput
              name="location"
              label="Location"
              control={control}
              required={false}
              fullWidth
            />
            <TextInput
              name="gender"
              label="Gender"
              control={control}
              required={false}
              fullWidth
            />
            <Button fullWidth type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const defaultValues = {
  name: "",
  bio: "",
  location: "",
  gender: "",
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const styles: Styles = {
  root: {},
};

export default EditProfileDialog;
