import React from "react";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import ReplyIcon from "@mui/icons-material/Reply";
import { useUser } from "../../contexts/UserContext";
import { stopPropagation } from "../../utils/helpers";
import usePostDialog from "../../hooks/usePostDialog";
import { FavoriteOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import {
  createReaction,
  deleteReaction,
} from "../../services/api/reactionAxios";

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
  onReply: (postId: string) => void;
  mutate: () => void;
};

const PostCardFooter = ({
  allReactions,
  userReaction,
  postDate,
  showActions,
  postId,
  onReply,
  mutate,
}: Props) => {
  const { user } = useUser();

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
    mutate();
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
        <Stack
          direction="row"
          gap={1}
          onClick={stopPropagation}
          alignItems="flex-start"
        >
          <Box>
            {allReactions?.length > 0 && (
              <Typography variant="caption" sx={{ mr: 1 }}>
                {allReactions.length}
              </Typography>
            )}
            <Tooltip title="Like">
              <IconButton
                sx={{ p: 0.5 }}
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
            <IconButton sx={{ mt: -0.1, p: 0.5 }} onClick={handleReply}>
              <ReplyIcon color="action" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};

export default PostCardFooter;
