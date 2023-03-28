import { Menu, Typography, MenuItem } from "@mui/material";
import React from "react";
import useMenu from "../../hooks/useMenu";

type Props = {
  anchorEl: any;
  handleClose: () => void;
  open: boolean;
  handleMenuItemClick: (privacyMode: string) => void;
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
      <MenuItem onClick={() => handleMenuItemClick("public")}>
        Everyone
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("friends")}>
        Friends Only
      </MenuItem>
    </Menu>
  );
};

export default PostPrivacyMenu;
