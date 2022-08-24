import { useState } from "react";

export type PostDialogState = {
  open: boolean;
  parentPostId?: string;
};

export const DEFAULT_POST_DIALOG_STATE: PostDialogState = {
  open: false,
  parentPostId: undefined,
};

const usePostDialog = () => {
  const [postDialog, setPostDialog] = useState<PostDialogState>(
    DEFAULT_POST_DIALOG_STATE
  );

  const onNewPost = () => {
    setPostDialog({ open: true });
  };

  const onCloseDialog = () => {
    setPostDialog({ ...postDialog, open: false });
  };

  const onReply = (parentPostId: string) => {
    setPostDialog({ open: true, parentPostId });
  };

  return {
    postDialog,
    setPostDialog,
    onNewPost,
    onCloseDialog,
    onReply,
  };
};

export default usePostDialog;
