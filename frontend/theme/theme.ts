import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const lmColours = {
  primary: { main: "#9EB0AC", light: "#889793", dark: "#848B90" },
  secondary: { main: "#848B90", light: "#848B90" },
  background: { default: "#F9F8F8" },
};

const dmColours = {
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
};

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
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: lightMode
              ? lmColours.background.default
              : dmColours.background.default,
          },
        },
      },
    },
    palette: {
      mode,
      error: {
        main: "#e31b23",
      },
      ...(lightMode
        ? {
            primary: {
              main: lmColours.primary.main,
              light: lmColours.primary.light,
              dark: lmColours.primary.dark,
            },
            secondary: {
              main: lmColours.secondary.main,
              light: lmColours.secondary.light,
            },
            background: {
              default: lmColours.background.default,
            },
          }
        : {
            primary: {
              main: dmColours.primary.main,
              light: dmColours.primary.light,
              dark: dmColours.primary.dark,
            },
            secondary: {
              main: dmColours.secondary.main,
              light: dmColours.secondary.light,
            },
            background: {
              default: dmColours.background.default,
            },
            text: {
              primary: dmColours.text.primary,
            },
          }),
    },
  });
};

export default getTheme;
