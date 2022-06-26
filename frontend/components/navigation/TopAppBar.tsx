import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  SxProps,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import AuthDialog from "../auth/AuthDialog";
import { useUser } from "../../contexts/UserContext";

type Props = {
  toggleSidebar: () => void;
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
  top: 0,
  height: 56,
});

const dialogStyles: SxProps = {
  paper: {
    p: 4,
    backgroundColor: "primary.dark",
    color: "secondary.light",
    width: 700,
    height: 600,
    boxShadow: "",
    borderRadius: 4,
  },
};

const TopAppBar = ({ toggleSidebar }: Props) => {
  const [showLogin, setShowLogin] = useState(false);
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, logout } = useUser();

  return (
    <StyledAppBar position="relative" color="transparent" enableColorOnDark>
      <Toolbar>
        {mobileMode && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hi, {user?.name}
        </Typography>
        <Button
          color="inherit"
          onClick={user ? logout : () => setShowLogin(!showLogin)}
          sx={{ textTransform: "initial" }}
        >
          <Typography>{user ? "Sign out" : "Sign in"}</Typography>
        </Button>
      </Toolbar>
      <AuthDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </StyledAppBar>
  );
};

export default TopAppBar;
