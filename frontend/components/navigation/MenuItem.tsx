import { ButtonBase, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { ReactNode } from "react";
import { Styles } from "../../types";

const MenuItem = ({ children, icon, href, onClick }: Props) => {
  const defaultContent = (
    <Box sx={{ ...styles.root }}>
      {icon}
      <Typography variant="h6">{children}</Typography>
    </Box>
  );

  return (
    <>
      {href ? (
        <Link href={href}>
          <a>{defaultContent}</a>
        </Link>
      ) : (
        <ButtonBase sx={{ width: "100%" }} onClick={onClick}>
          {defaultContent}
        </ButtonBase>
      )}
    </>
  );
};

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
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

export default MenuItem;
