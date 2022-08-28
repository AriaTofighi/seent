import { Box, Card, Typography } from "@mui/material";
import TopAppBar from "../navigation/TopAppBar";
import SideBar from "../navigation/SideBar";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Styles } from "../../types/types";
import { ReactElement, useState } from "react";

const styles: Styles = {
  container: {
    display: "flex",
    maxWidth: 1400,
    margin: "auto",
    justifyContent: "center",
  },
  mainContent: {
    maxWidth: 600,
    width: 600,
    borderRight: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
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
        <Box>{children}</Box>
      </Box>
      {/* <Card
        component="aside"
        sx={{
          p: 2,
          width: 300,
          bgcolor: "background.default",
          borderRadius: 0,
          borderRight: "none",
        }}
        variant="outlined"
      >
        <Typography variant="h6">People to Follow</Typography>
      </Card> */}
    </Box>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
