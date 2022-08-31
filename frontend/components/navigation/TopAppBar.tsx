import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Styles } from "../../types/types";
import { useNav } from "../../contexts/NavContext";

type Props = {
  children?: ReactNode;
  title?: string;
};

const TopAppBar = ({ children, title }: Props) => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));
  const { open, setOpen } = useNav();

  return (
    <AppBar position="sticky" sx={styles.root}>
      <Toolbar>
        {mobileMode && (
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h5">{title ?? ""}</Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;

const styles: Styles = {
  root: {
    borderBottom: "1px solid",
    width: "100%",
    borderColor: "divider",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    bgcolor: "background.default",
    backgroundImage: "none",
    boxShadow: "none",
  },
};
