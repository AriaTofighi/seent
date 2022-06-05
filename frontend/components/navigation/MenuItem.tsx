import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Styles } from "../../types/types";
import { Typography } from "@mui/material";
import { Url } from "url";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  href: string;
};

const styles: Styles = {
  root: {
    height: 50,
    p: 2,
    ":hover": {
      background: "rgba(255, 255, 255, 0.1)",
      transition: "background 0.2s ease-in-out",
      borderRadius: 1,
    },
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
};

const MenuItem = ({ children, icon, href }: Props) => {
  return (
    <Link href={href}>
      <a>
        <Box sx={styles.root}>
          {icon}
          <Typography variant="h6">{children}</Typography>
        </Box>
      </a>
    </Link>
  );
};

export default MenuItem;
