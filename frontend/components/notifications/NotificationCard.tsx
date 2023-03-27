import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import { formatDateTime } from "../../utils";
import StyledCard from "../UI/StyledCard";
import UserAvatar from "../users/UserAvatar";

const NotificationCard = ({ message, url, sender, createdAt, post }: any) => {
  const { userId, username, images } = sender;

  return (
    <StyledCard
      sx={{ cursor: "pointer", borderBottom: 1, borderColor: "divider" }}
    >
      <Link href={url}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <UserAvatar
            userId={userId}
            username={username}
            avatarUrl={images[0].url}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "85%",
            }}
          >
            <Typography
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {message} {post?.body}
            </Typography>
            <Typography variant="caption">
              {formatDateTime(createdAt)}
            </Typography>
          </Box>
        </Box>
      </Link>
    </StyledCard>
  );
};

export default NotificationCard;
