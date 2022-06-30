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
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("sm"));

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
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopAppBar;
