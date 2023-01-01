import { ButtonBase, Typography } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./MenuItem.styles";

export type Props = {
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
  ...otherProps
}: Props & BoxProps) => {
  const defaultContent = (
    <Box sx={styles.root}>
      {icon}
      <Typography variant="h6">{children}</Typography>
    </Box>
  );

  return (
    <Box sx={{ height: 50 }} {...otherProps}>
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
