import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { stopPropagation } from "../../utils/helpers";
import { FavoriteOutlined } from "@mui/icons-material";

const REACTION_TYPES = {
  LIKE: "LIKE",
  DISLIKE: "DISLIKE",
};

type Props = {
  postDate: string;
  onReply: () => void;
  onReact: (type: string) => void;
  userReaction: any;
  allReactions: any[];
  showActions: boolean;
};

const PostCardFooter = ({
  allReactions,
  userReaction,
  postDate,
  onReply,
  onReact,
  showActions,
}: Props) => {
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
                onClick={() => onReact(REACTION_TYPES.LIKE)}
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
            <IconButton sx={{ p: 0 }} onClick={onReply}>
              <ReplyIcon color="action" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};

export default PostCardFooter;
