import { NextPageWithLayout } from "../types";
import { getMainLayout } from "../components/layouts/MainLayout";
import Title from "../components/UI/Title";
import TopAppBar from "../components/navigation/TopAppBar";
import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useUser } from "../contexts/UserContext";

const Settings: NextPageWithLayout = () => {
  const { paletteMode, setPaletteMode } = useUser();
  const darkMode = paletteMode === "dark";

  return (
    <>
      <Title title="Settings" />
      <TopAppBar title="Settings" />
      <Stack
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Theme</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onClick={() => setPaletteMode(darkMode ? "light" : "dark")}
            />
          }
          label={darkMode ? "Dark" : "Light"}
        />
      </Stack>
    </>
  );
};

Settings.getLayout = getMainLayout;

export default Settings;
