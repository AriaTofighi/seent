import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { stopPropagation } from "../../utils/helpers";
import { FavoriteOutlined } from "@mui/icons-material";
import { useUser } from "../../contexts/UserContext";
import usePostDialog from "../../hooks/usePostDialog";
import { toast } from "react-toastify";
import {
  createReaction,
  deleteReaction,
} from "../../services/api/reactionAxios";
import { useSWRConfig } from "swr";

const REACTION_TYPES = {
  LIKE: "LIKE",
  DISLIKE: "DISLIKE",
};

type Props = {
  postDate: string;
  userReaction: any;
  allReactions: any[];
  showActions: boolean;
  postId: string;
};

const PostCardFooter = ({
  allReactions,
  userReaction,
  postDate,
  showActions,
  postId,
}: Props) => {
  const { user } = useUser();
  const { onReply } = usePostDialog();
  const { mutate } = useSWRConfig();

  const handleReply = () => {
    if (!user) {
      return toast.info("Sign in to interact with others");
    }
    onReply(postId);
  };

  const handleReact = async (type: string) => {
    if (!user) {
      return toast.info("Sign in to interact with others");
    }
    if (Boolean(userReaction)) {
      await deleteReaction(userReaction.reactionId);
    } else {
      await createReaction(postId, user.userId, type);
    }
    mutate("posts");
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      mt={0.5}
    >
      <Box>
        <Typography variant="caption">{postDate}</Typography>
      </Box>
      {showActions && (
        <Stack direction="row" gap={2} onClick={stopPropagation}>
          <Box>
            <Typography variant="caption" sx={{ mr: 1.5 }}>
              {allReactions?.length > 0 && allReactions.length}
            </Typography>
            <Tooltip title="Like">
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleReact(REACTION_TYPES.LIKE)}
              >
                {userReaction?.type === REACTION_TYPES.LIKE ? (
                  <FavoriteOutlined fontSize="small" color="error" />
                ) : (
                  <FavoriteBorderIcon color="action" fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Reply">
            <IconButton sx={{ p: 0 }} onClick={handleReply}>
              <ReplyIcon color="action" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};

export default PostCardFooter;
