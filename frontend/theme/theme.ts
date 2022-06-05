import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const getTheme = (mode: PaletteMode) => {
  return createTheme({
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#BC00D4",
            },
            secondary: {
              main: "#ff4081",
            },
            background: {
              default: "#fff",
            },
          }
        : {
            primary: {
              main: "#9EB0AC",
              light: "#889793",
              dark: "#848B90",
            },
            secondary: {
              main: "#93A3A1",
              light: "#F9F8F8",
            },
            background: {
              default: "#1C3F4E",
            },
          }),
    },
  });
};

export default getTheme;
