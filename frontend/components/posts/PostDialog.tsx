import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Styles } from "../../types/types";
import TextInput from "../controls/TextInput";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import ShieldIcon from "@mui/icons-material/Shield";
import { useUser } from "../../contexts/UserContext";
import { createPost } from "../../services/api/postAxios";
import { useSWRConfig } from "swr";

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
  const { control, reset, handleSubmit } = useForm({ defaultValues });
  const [privacyMode, setPrivacyMode] = useState(PRIVACY_MODES.PUBLIC);
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const handleSubmitPost = async (formValues: any) => {
    const { body } = formValues;
    const newPost = await createPost(user.userId, privacyMode, body);
    mutate("posts");
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
              <Stack gap={1} direction="row" p={1}>
                <Tooltip title="Emoji">
                  <EmojiEmotionsIcon />
                </Tooltip>
                <Tooltip title="Media">
                  <ImageIcon />
                </Tooltip>
                <Tooltip title="Privacy">
                  <ShieldIcon />
                </Tooltip>
              </Stack>
            </Box>
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
