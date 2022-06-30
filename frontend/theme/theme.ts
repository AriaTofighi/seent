import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const getTheme = (mode: PaletteMode) => {
  const lightMode = mode === "light";

  return createTheme({
    typography: {
      fontFamily: ["Ubuntu", "sans-serif"].join(","),
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: lightMode ? "#e0e0e0" : "black",
            },
          },
        },
      },
    },
    palette: {
      mode,
      ...(lightMode
        ? {
            primary: {
              main: "#9EB0AC",
              light: "#889793",
              dark: "#848B90",
            },
            secondary: {
              main: "#848B90",
              light: "#848B90",
            },
            background: {
              default: "#F9F8F8",
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
            text: {
              primary: "#F9F8F8",
            },
          }),
    },
  });
};

export default getTheme;
