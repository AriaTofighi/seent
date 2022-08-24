import { AppBar, IconButton, Toolbar, SxProps } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  toggleSidebar: () => void;
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  top: 0,
  height: 56,
  marginBottom: theme.spacing(-2),
}));

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
