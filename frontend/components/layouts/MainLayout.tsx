import { Box } from "@mui/material";
import { ReactElement } from "react";
import { Styles } from "../../types";
import SearchSideBar from "../navigation/SearchSideBar";
import SideBar from "../navigation/SideBar";
import { SystemStyleObject } from "@mui/system";

const styles: Styles = {
  container: {
    display: "flex",
    // maxWidth: 1600,
    margin: "auto",
    justifyContent: "center",
  },
  mainContent: {
    width: 600,
    borderRight: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    minHeight: "100vh",
  },
  small: {
    width: 600,
  },
  medium: {
    width: 840,
  },
};

const MainLayout = ({ children }: any) => {
  const getSize = () => {
    if (window.location.pathname.startsWith("/rooms")) {
      return styles.medium;
    } else {
      return styles.small;
    }
  };

  return (
    <Box sx={styles.container}>
      <SideBar />
      <Box sx={{ ...styles.mainContent, ...getSize() }}>{children}</Box>
      <SearchSideBar />
    </Box>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
