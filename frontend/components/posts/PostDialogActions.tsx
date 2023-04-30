import { Box, Stack, Tooltip, IconButton, Typography } from "@mui/material";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import ShieldIcon from "@mui/icons-material/Shield";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { DefaultValueType } from "./PostDialog";
import { useState } from "react";
import { Styles } from "../../types";
import useMenu from "../../hooks/useMenu";
import PostPrivacyMenu from "./PostPrivacyMenu";
import TagIcon from "@mui/icons-material/Tag";
import AddTagsMenu from "../tags/AddTagsMenu";

type Props = {
  setValue: UseFormSetValue<DefaultValueType>;
  getValues: UseFormGetValues<DefaultValueType>;
  handleBrowse: () => void;
  handleSelectPrivacy: (privacyMode: string) => void;
  privacyMode: string;
  control: any;
  watch: any;
};

const PostDialogActions = ({
  setValue,
  getValues,
  handleBrowse,
  handleSelectPrivacy,
  privacyMode,
  control,
  watch,
}: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { anchorEl, handleClick, handleClose, open } = useMenu();
  const {
    anchorEl: tagsAnchorEl,
    handleClick: tagsHandleClick,
    handleClose: tagsHandleClose,
    open: tagsOpen,
  } = useMenu();

  const onEmojiClick = (_event: any, emojiObject: IEmojiData) => {
    const body = getValues("body");
    setValue("body", body + emojiObject.emoji);
  };

  const handleMenuItemClick = (
    event: React.SyntheticEvent,
    privacyMode: string
  ) => {
    handleSelectPrivacy(privacyMode);
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          mb: 1,
        }}
      >
        <Stack direction="row" alignItems="center">
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
          <Tooltip title="Tags">
            <IconButton onClick={tagsHandleClick}>
              <TagIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Privacy">
            <IconButton onClick={handleClick}>
              <ShieldIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" mt={0.5}>
            {privacyMode === "public"
              ? "Visible to everyone"
              : "Visible to friends"}
          </Typography>
        </Stack>
      </Box>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          pickerStyle={styles.emojiPicker as KeyValuePair}
        />
      )}
      <AddTagsMenu
        {...{
          anchorEl: tagsAnchorEl,
          handleClose: tagsHandleClose,
          open: tagsOpen,
          setValue,
          getValues,
          control,
          watch,
        }}
      />
      <PostPrivacyMenu
        {...{ anchorEl, handleClose, open, handleMenuItemClick }}
      />
    </>
  );
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

type KeyValuePair = {
  [property: string]: string;
};

export default PostDialogActions;
