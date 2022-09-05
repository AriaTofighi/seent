import { useTheme } from "@mui/system";
import React, { ReactNode } from "react";
import { Styles } from "../../types/types";
import MenuIcon from "@mui/icons-material/Menu";
import { useNav } from "../../contexts/NavContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const TopAppBar = ({ children, title }: Props) => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));
  const { open, setOpen } = useNav();

  return (
    <AppBar sx={styles.root}>
      <Toolbar>
        {mobileMode && (
          <IconButton
            size="medium"
            edge="start"
            sx={styles.menuBtn}
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
  menuBtn: {
    mr: 1.5,
  },
};

type Props = {
  children?: ReactNode;
  title?: string;
};
