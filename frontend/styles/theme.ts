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
    main: "#666666",
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
  const colors = lightMode ? lmColours : dmColours;

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
            backgroundColor: colors.background.default,
            color: colors.text.primary,
            scrollbarColor: `${colors.text.secondary} ${colors.primary.dark}`,
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              borderRadius: 8,
              backgroundColor: colors.primary.dark,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: colors.text.secondary,
              minHeight: 24,
              border: `3px solid ${colors.primary.dark}`,
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: colors.text.primary,
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: colors.text.primary,
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: colors.text.primary,
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: colors.primary.dark,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.default,
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: colors.text.primary,
          },
        },
      },
    },
    palette: {
      mode,
      error: {
        main: "#f75f62",
      },
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
      },
      secondary: {
        main: colors.secondary.main,
        light: colors.secondary.light,
      },
      background: {
        default: colors.background.default,
      },
      text: {
        primary: colors.text.primary,
      },
    },
  });
};

export default getTheme;
