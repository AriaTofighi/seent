import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { CssBaseline, PaletteMode, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import getTheme from "../theme/theme";
import { SWRConfig } from "swr";
import swrConfig from "../config/swrConfig";
import { UserProvider } from "../contexts/UserContext";
import { NextPageWithLayout } from "../types/types";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const getLayout = Component.getLayout ?? ((page) => page);

  const ComponentWithLayout = () => (
    <> {getLayout(<Component {...pageProps} />)}</>
  );

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <SWRConfig value={swrConfig}>
          <UserProvider>
            <ComponentWithLayout />
          </UserProvider>
        </SWRConfig>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default MyApp;
