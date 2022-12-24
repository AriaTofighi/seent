import { Box } from "@mui/system";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Header = ({ children }: Props) => {
  return <Box sx={styles.root}>{children}</Box>;
};

const styles = {
  root: {
    p: 2,
    borderBottom: "1px solid",
    width: "100%",
    borderColor: "divider",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
};
export default Header;
