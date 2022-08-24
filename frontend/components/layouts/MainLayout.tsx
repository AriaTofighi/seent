import { Box } from "@mui/material";
import TopAppBar from "../navigation/TopAppBar";
import SideBar from "../navigation/SideBar";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Styles } from "../../types/types";
import { ReactElement, useState } from "react";

const styles: Styles = {
  container: {
    display: "flex",
    maxWidth: 900,
    margin: "auto",
    justifyContent: "center",
  },
  mainContent: {
    maxWidth: 600,
    width: 600,
    borderRight: "1px solid",
    borderLeft: "1px solid",
    borderColor: "secondary.dark",
    minHeight: "100vh",
  },
};

const MainLayout = ({ children }: any) => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Box sx={styles.container}>
      <SideBar open={openSidebar} setOpen={setOpenSidebar} />
      <Box sx={styles.mainContent}>
        {mobileMode && <TopAppBar toggleSidebar={toggleSidebar} />}
        <Box p={2}>{children}</Box>
      </Box>
    </Box>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
