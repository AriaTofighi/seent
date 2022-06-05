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

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <SWRConfig value={swrConfig}>
          <ComponentWithLayout />
        </SWRConfig>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
