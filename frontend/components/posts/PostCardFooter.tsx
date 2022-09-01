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
import { Styles } from "../../types/types";

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
  childPostsCount: number;
};
const styles: Styles = {
  count: {
    ml: 1,
  },
};

const PostCardFooter = ({
  allReactions,
  userReaction,
  postDate,
  showActions,
  postId,
  onReply,
  mutate,
  childPostsCount,
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

  const reactionCount = allReactions.length;

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
          gap={4}
          onClick={stopPropagation}
          alignItems="flex-start"
        >
          <Box sx={{ minWidth: 70 }}>
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

            <Typography
              variant="caption"
              sx={{
                ...styles.count,
                visibility: reactionCount > 0 ? "initial" : "hidden",
              }}
            >
              {reactionCount}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 70 }}>
            <Tooltip title="Reply">
              <IconButton sx={{ mt: -0.1, p: 0.5 }} onClick={handleReply}>
                <ReplyIcon color="action" fontSize="small" />
              </IconButton>
            </Tooltip>
            <Typography
              variant="caption"
              sx={{
                ...styles.count,
                visibility: childPostsCount > 0 ? "initial" : "hidden",
              }}
            >
              {childPostsCount}
            </Typography>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default PostCardFooter;
