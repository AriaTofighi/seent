import React, { useState } from "react";
import { Box, SxProps } from "@mui/system";
import MenuItem from "./MenuItem";
import { Styles } from "../../types";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Button,
  Divider,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useUser } from "../../contexts/UserContext";
import AuthDialog from "../auth/AuthDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNav } from "../../contexts/NavContext";

const styles: Styles = {
  root: {
    color: "text.primary",
    position: "sticky",
    top: 0,
    minWidth: 240,
    height: "100vh",
    p: 2,
  },
};

const SideBar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));
  const { user, logout } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const { open, setOpen } = useNav();

  const content = (
    <Box sx={styles.root}>
      <Link href="/">
        <a>
          <Typography variant="h6" my={2}>
            Seent
          </Typography>
        </a>
      </Link>
      <MenuItem icon={<HomeIcon width="16" />} href="/feed">
        Feed
      </MenuItem>
      {user && (
        <>
          <MenuItem icon={<PersonIcon />} href={`/profiles/${user.username}`}>
            Profile
          </MenuItem>
          <MenuItem icon={<SettingsIcon />} href="/settings">
            Settings
          </MenuItem>
          <Divider />
          <MenuItem icon={<LogoutIcon />} onClick={logout}>
            Sign out
          </MenuItem>
        </>
      )}
      {!user && (
        <Button
          color="inherit"
          onClick={user ? logout : () => setShowLogin(!showLogin)}
          sx={{ textTransform: "initial", mt: 2 }}
          variant={user ? "text" : "outlined"}
          fullWidth={Boolean(!user)}
        >
          <Typography variant="h6">{user ? "Sign out" : "Sign up"}</Typography>
        </Button>
      )}
      <AuthDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </Box>
  );

  return mobileMode ? (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          backgroundColor: "background.default",
          backgroundImage: "none",
        },
      }}
      anchor="left"
      open={open}
      variant="temporary"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      ModalProps={{ keepMounted: true }}
    >
      {content}
    </SwipeableDrawer>
  ) : (
    <>{content}</>
  );
};

export default SideBar;
