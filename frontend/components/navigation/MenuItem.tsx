import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Styles } from "../../types/types";
import { Typography } from "@mui/material";
import { Url } from "url";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
};

const fadeTransitionTime = "0.3";

const styles: Styles = {
  root: {
    height: 50,
    transition: "background " + fadeTransitionTime + "s ease-in-out",
    p: 2,
    ":hover": {
      background: "rgba(255, 255, 255, 0.1)",
      transition: "background " + fadeTransitionTime + "s ease-in-out",
    },
    borderRadius: 1.5,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
};

const MenuItem = ({ children, icon, href }: Props) => {
  const { route } = useRouter();
  const defaultContent = (
    <Box sx={{ ...styles.root }}>
      {icon}
      <Typography variant="h6">{children}</Typography>
    </Box>
  );

  const content = href ? (
    <Link href={href}>
      <a>{defaultContent}</a>
    </Link>
  ) : (
    defaultContent
  );

  return <>{content}</>;
};

export default MenuItem;
