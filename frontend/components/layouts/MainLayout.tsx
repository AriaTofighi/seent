import { Box } from "@mui/material";
import { ReactElement } from "react";
import { Styles } from "../../types";
import SearchSideBar from "../navigation/SearchSideBar";
import SideBar from "../navigation/SideBar";

const styles: Styles = {
  container: {
    display: "flex",
    margin: "auto",
    justifyContent: "center",
  },
  mainContent: {
    borderRight: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    minHeight: "100vh",
    minWidth: 0,
  },
  general: {
    width: {
      xs: "100%",
      md: 600,
    },
  },
  rooms: {
    width: 900,
    maxWidth: "100%",
  },
};

const MainLayout = ({ children }: any) => {
  const getSize = () => {
    if (window.location.pathname.startsWith("/messages")) {
      return styles.rooms;
    } else {
      return styles.general;
    }
  };

  return (
    <Box sx={styles.container}>
      <SideBar />
      <Box sx={{ ...styles.mainContent, ...getSize() } as object}>
        {children}
      </Box>
      <SearchSideBar />
    </Box>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
