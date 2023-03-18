import { FavoriteOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useUser } from "../../contexts/UserContext";
import {
  createReaction,
  deleteReaction,
} from "../../services/api/reactionAxios";
import { Styles, ThemedStyles } from "../../types";
import { stopPropagation } from "../../utils";
import ReactionsModal from "../reactions/ReactionsModal";

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
  mutatePosts: any;
  childPostsCount: number;
  isMainPost: boolean;
};

const PostCardFooter = ({
  allReactions,
  userReaction,
  postDate,
  showActions,
  postId,
  onReply,
  mutatePosts,
  childPostsCount,
  isMainPost,
}: Props) => {
  const { user } = useUser();
  const [showReactions, setShowReactions] = useState(false);

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
    const deleteMode = Boolean(userReaction);

    if (deleteMode) {
      await deleteReaction(userReaction.reactionId);
    } else {
      await createReaction(postId, user.userId, type);
    }

    mutatePosts();
    mutate(`users/${user.userId}`);
  };

  const handleViewReactions = () => {
    setShowReactions(true);
  };

  const reactionCount = allReactions.length;

  return (
    <Stack direction="column" gap={1}>
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
      {isMainPost && reactionCount > 0 && (
        <>
          <Stack alignItems="flex-start">
            <Button
              onClick={handleViewReactions}
              sx={{
                textTransform: "none",
                py: 0.5,
              }}
              variant="text"
            >
              Likes
            </Button>
          </Stack>
          <ReactionsModal
            open={showReactions}
            setOpen={setShowReactions}
            reactions={allReactions}
          />
        </>
      )}
    </Stack>
  );
};

const styles: ThemedStyles = {
  count: {
    ml: 1,
  },
};

export default PostCardFooter;
