import React, { useState } from "react";
import { Box, SxProps } from "@mui/system";
import MenuItem from "./MenuItem";
import { Styles } from "../../types/types";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const styles: Styles = {
  root: {
    background: "background.default",
    color: "text.primary",
    position: "sticky",
    top: 0,
    borderRight: "1px solid",
    borderColor: "primary.light",
    width: 240,
  },
  inner: {
    position: "sticky",
  },
};

const SideBar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSideBar, setOpenSideBar] = useState(false);

  const content = (
    <>
      <Typography variant="h6" my={1.5} p={2}>
        Seent
      </Typography>
      <MenuItem icon={<HomeIcon />} href="/feed">
        Feed
      </MenuItem>
      <MenuItem icon={<PersonIcon />} href="/profile">
        Profile
      </MenuItem>
      <MenuItem icon={<SettingsIcon />} href="/settings">
        Settings
      </MenuItem>
    </>
  );

  return mobileMode ? (
    <SwipeableDrawer
      anchor="left"
      open={openSideBar}
      variant="temporary"
      onClose={() => setOpenSideBar(false)}
      onOpen={() => setOpenSideBar(true)}
      ModalProps={{ keepMounted: true }}
    >
      {content}
    </SwipeableDrawer>
  ) : (
    <Box sx={styles.root}>{content}</Box>
  );
};

export default SideBar;
