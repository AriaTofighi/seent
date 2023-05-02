import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useState } from "react";
import { useNav } from "../../contexts/NavContext";
import { useUser } from "../../contexts/UserContext";
import AuthDialog, { MODES } from "../auth/AuthDialog";
import MenuItem from "./MenuItem";
import SearchBar from "./SearchBar";
import styles from "./SideBar.styles";
import ChatIcon from "@mui/icons-material/Chat";
import UserAvatar from "../users/UserAvatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAPI } from "../../hooks/useAPI";
import useSocketEvent from "../../hooks/useSocketEvent";
import TagIcon from "@mui/icons-material/Tag";

const SideBar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));
  const tabletMode = useMediaQuery(theme.breakpoints.down("xl"));
  const { user, logout, mutate: mutateUser } = useUser();
  const { open, setOpen } = useNav();
  const [mode, setMode] = useState(MODES.SIGN_IN);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const { data: messageNotifications, mutate: mutateMessageNotifications } =
    useAPI<any[]>(
      `notifications?recipientId=${user?.userId}&type=MESSAGE&read=false`
    );

  const onSignUp = () => {
    setMode(MODES.SIGN_UP);
    setAuthDialogOpen(true);
  };

  const onSignIn = () => {
    setMode(MODES.SIGN_IN);
    setAuthDialogOpen(true);
  };

  useSocketEvent("newPostEngagement", () => {
    mutateUser();
  });

  useSocketEvent("newMessage", () => {
    mutateMessageNotifications();
  });

  useSocketEvent("newFriendRequest", () => {
    mutateUser();
  });

  useSocketEvent("newFriendAccept", () => {
    mutateUser();
  });

  const content = (
    <Box sx={styles.root}>
      <Link href="/">
        <a>
          <Typography variant="h6" my={2} fontWeight="bold">
            Seent
          </Typography>
        </a>
      </Link>
      {user && (
        <Box p={1}>
          <UserAvatar
            userId={user.userId}
            username={user.username}
            avatarUrl={user.images?.[0]?.url}
            AvatarProps={{ sx: styles.avatar }}
          />
        </Box>
      )}
      {tabletMode && <SearchBar />}
      <MenuItem icon={<HomeIcon width="16" />} href="/feed">
        Feed
      </MenuItem>
      {user && (
        <>
          <MenuItem icon={<TagIcon />} href={`/tags`}>
            Tags
          </MenuItem>
          <MenuItem
            icon={
              <Badge
                sx={{ overflow: "inherit" }}
                badgeContent={user._count?.notifications}
                color="primary"
              >
                <NotificationsIcon />
              </Badge>
            }
            href="/notifications"
          >
            Notifications
          </MenuItem>
          <MenuItem
            icon={
              <Badge
                sx={{ overflow: "inherit" }}
                badgeContent={messageNotifications?.length}
                color="primary"
              >
                <ChatIcon />
              </Badge>
            }
            href="/messages"
          >
            Messages
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
        <>
          <Button
            color="inherit"
            onClick={onSignIn}
            sx={styles.signUpBtn}
            variant="outlined"
            fullWidth
          >
            <Typography variant="h6">{"Sign in"}</Typography>
          </Button>
          <Button
            color="inherit"
            onClick={onSignUp}
            sx={styles.signUpBtn}
            variant="outlined"
            fullWidth
          >
            <Typography variant="h6">{"Sign up"}</Typography>
          </Button>
        </>
      )}
      <AuthDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        mode={mode}
        setMode={setMode}
      />
    </Box>
  );

  return mobileMode ? (
    <SwipeableDrawer
      PaperProps={{
        sx: styles.drawerPaper,
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
