import { Box } from "@mui/material";
import { ReactElement } from "react";
import { Styles } from "../../types";
import SearchSideBar from "../navigation/SearchSideBar";
import SideBar from "../navigation/SideBar";

const styles: Styles = {
  container: {
    display: "flex",
    maxWidth: 1400,
    margin: "auto",
    justifyContent: "center",
  },
  mainContent: {
    width: {
      xs: 600,
      sm: 600,
    },
    borderRight: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    minHeight: "100vh",
  },
};

const MainLayout = ({ children }: any) => {
  return (
    <Box sx={styles.container}>
      <SideBar />
      <Box sx={styles.mainContent}>{children}</Box>
      <SearchSideBar />
    </Box>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
