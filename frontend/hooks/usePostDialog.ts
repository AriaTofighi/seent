import { useState } from "react";
export type PostDialogState = {
  open: boolean;
  parentPostId?: string;
};

export const DEFAULT_POST_DIALOG_STATE = {
  open: false,
  parentPostId: undefined,
};

const usePostDialog = () => {
  const [postDialog, setPostDialog] = useState<PostDialogState>(
    DEFAULT_POST_DIALOG_STATE
  );

  const handleNewPost = () => {
    setPostDialog({ open: true });
  };

  const handleCloseNewPost = () => {
    setPostDialog({ ...postDialog, open: false });
  };

  const onReply = (parentPostId: string) => {
    setPostDialog({ open: true, parentPostId });
  };

  return {
    postDialog,
    setPostDialog,
    handleNewPost,
    handleCloseNewPost,
    onReply,
  };
};

export default usePostDialog;
