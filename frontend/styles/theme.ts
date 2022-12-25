import { createTheme } from "@mui/material/styles";
import { PaletteMode, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 850,
        lg: 1100,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: "Rajdhani",
      fontSize: 15,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              borderRadius: 8,
              backgroundColor: "#2b2b2b",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              minHeight: 24,
              border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: lightMode
              ? lmColours.background.default
              : dmColours.background.default,
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // textTransform: "none",
            // color: lightMode ? lmColours.primary.main : dmColours.text.primary,
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
            text: {
              primary: grey[800],
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
