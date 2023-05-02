import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/system";
import { ReactNode } from "react";
import { useNav } from "../../contexts/NavContext";
import styles from "./TopAppBar.styles";

type Props = {
  children?: ReactNode;
  title?: string;
};

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
        <Typography variant="h5" sx={{ width: "100%" }}>
          {title ?? ""}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
