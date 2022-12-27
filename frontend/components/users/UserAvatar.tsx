import { Avatar, AvatarProps } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
  username: string;
  avatarUrl: string;
  AvatarProps?: AvatarProps;
};

const UserAvatar = ({ username, avatarUrl, AvatarProps }: Props) => {
  return (
    <Link href={`/profiles/${username}`}>
      <a style={{ display: "inline-block" }}>
        <Avatar src={avatarUrl} {...AvatarProps} />
      </a>
    </Link>
  );
};

export default UserAvatar;
