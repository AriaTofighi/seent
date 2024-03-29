import { BoxProps, Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Header = ({ children, sx, ...rest }: Props & BoxProps) => {
  return (
    <Box sx={{ ...styles.root, ...sx } as SxProps<Theme>} {...rest}>
      {children}
    </Box>
  );
};

const styles = {
  root: {
    p: 1.5,
    borderBottom: "1px solid",
    width: "100%",
    borderColor: "divider",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    height: (theme: any) => theme.mixins.toolbar.minHeight + 10,
  },
};
export default Header;
