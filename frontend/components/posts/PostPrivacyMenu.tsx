import { Menu, Typography, MenuItem } from "@mui/material";
import React from "react";

type Props = {
  anchorEl: any;
  handleClose: (event: React.SyntheticEvent) => void;
  open: boolean;
  handleMenuItemClick: (
    event: React.SyntheticEvent,
    privacyMode: string
  ) => void;
};

const PostPrivacyMenu = ({
  anchorEl,
  handleClose,
  open,
  handleMenuItemClick,
}: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Typography p={1.5}>Who should see this post?</Typography>
      <MenuItem onClick={(event) => handleMenuItemClick(event, "public")}>
        Everyone
      </MenuItem>
      <MenuItem onClick={(event) => handleMenuItemClick(event, "friends")}>
        Friends Only
      </MenuItem>
    </Menu>
  );
};

export default PostPrivacyMenu;
