import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
  top: 0,
  zIndex: "10",
  color: "primary.light",
});

const TopAppBar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledAppBar position="sticky" color="transparent" enableColorOnDark>
      <Toolbar>
        {mobileMode && (
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Feed
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopAppBar;
