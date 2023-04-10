import { createTheme } from "@mui/material/styles";
import { PaletteMode, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

const lmColours = {
  primary: {
    main: "#E5E5E5",
    light: "#F5F5F5",
    dark: "#B1B1B1",
  },
  secondary: {
    main: "#F5F5F5",
    light: "#FFFFFF",
  },
  background: {
    default: "#FFFFFF",
  },
  text: {
    primary: "#000000",
    secondary: "#757575",
  },
};

const dmColours = {
  primary: {
    main: "#333333",
    light: "#4D4D4D",
    dark: "#1A1A1A",
  },
  secondary: {
    main: "#4D4D4D",
    light: "#F9F8F8",
  },
  background: {
    default: "#111111",
  },
  text: {
    primary: "#F9F8F8",
    secondary: "#BFBFBF",
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
      fontFamily: "Roboto, sans-serif",
      fontSize: 14,
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
            color: lightMode ? lmColours.text.primary : dmColours.text.primary,
          },
        },
      },
    },
    palette: {
      mode,
      error: {
        main: "#f75f62",
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
