import React, { useState } from "react";
import { Box, SxProps } from "@mui/system";
import MenuItem from "./MenuItem";
import { Styles } from "../../types/types";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Button,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useUser } from "../../contexts/UserContext";
import AuthDialog from "../auth/AuthDialog";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const styles: Styles = {
  root: {
    color: "text.primary",
    position: "sticky",
    top: 0,
    borderRight: "1px solid",
    borderColor: "primary.light",
    width: 240,
    minWidth: 200,
    height: "100vh",
    p: 2,
  },
};

const SideBar = ({ open, setOpen }: Props) => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, logout } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  console.log(router);

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
          <MenuItem icon={<PersonIcon />} href="/profile">
            Profile
          </MenuItem>
          <MenuItem icon={<SettingsIcon />} href="/settings">
            Settings
          </MenuItem>
        </>
      )}
      <Button
        color="inherit"
        onClick={user ? logout : () => setShowLogin(!showLogin)}
        sx={{ textTransform: "initial", mt: 2 }}
        variant={user ? "text" : "outlined"}
        fullWidth={Boolean(!user)}
      >
        <Typography variant="h6">{user ? "Sign out" : "Sign up"}</Typography>
      </Button>
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