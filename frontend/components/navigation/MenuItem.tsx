import { BoxProps, ButtonBase, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./MenuItem.styles";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
};

const MenuItem = ({
  children,
  icon,
  href,
  onClick,
  ...props
}: Props & BoxProps) => {
  const defaultContent = (
    <Box sx={styles.root}>
      {icon}
      <Typography variant="h6">{children}</Typography>
    </Box>
  );

  return (
    <Box {...props}>
      {href ? (
        <Link href={href}>
          <a>{defaultContent}</a>
        </Link>
      ) : (
        <ButtonBase sx={{ width: "100%" }} onClick={onClick}>
          {defaultContent}
        </ButtonBase>
      )}
    </Box>
  );
};

export default MenuItem;
