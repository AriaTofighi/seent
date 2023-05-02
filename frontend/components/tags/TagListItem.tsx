import React from "react";
import { TagEntity } from "../../types";
import { Box, ButtonBase, Typography } from "@mui/material";
import { formatDateTime } from "../../utils";
import Link from "next/link";

type Props = {
  tag: TagEntity;
};

const TagListItem = ({ tag }: Props) => {
  return (
    <Link href={`/feed?tags=${tag.name}`}>
      <a>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            border: 1,
            borderColor: "divider",
            width: "100%",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Box>
            {tag?.name} - {tag?._count.postTags} posts
          </Box>

          <Typography variant="caption">
            {formatDateTime(tag?.createdAt)}
          </Typography>
        </Box>
      </a>
    </Link>
  );
};

export default TagListItem;
