import { Box } from "@mui/material";
import { ReactElement } from "react";
import { Styles } from "../../types";
import SideBar from "../navigation/SideBar";

const styles: Styles = {
  container: {
    display: "flex",
    maxWidth: 1400,
    margin: "auto",
    justifyContent: "center",
  },
  mainContent: {
    // maxWidth: 600,
    // width: (theme: Theme) => {
    //   console.log(theme);
    //   console.log(theme.breakpoints.down("sm"));
    //   return theme.breakpoints.down("sm") ? 800 : 400;
    // },
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
      <Box sx={styles.mainContent}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
