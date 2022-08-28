import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  [rest: string]: any;
};

const Header = ({ children, ...rest }: Props) => {
  return (
    <Typography
      variant="h5"
      sx={{
        p: 2,
        borderBottom: "1px solid",
        width: "100%",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "background.default",
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Header;
