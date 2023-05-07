import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { SWRConfig } from "swr";
import swrConfig from "../config/swrConfig";
import { UserProvider } from "../contexts/UserContext";
import { NextPageWithLayout } from "../types";
import { ToastContainer } from "react-toastify";
import { RouteGuard } from "../components/auth/RouteGuard";
import { NavProvider } from "../contexts/NavContext";
import { SocketProvider } from "../contexts/SocketContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Analytics } from "@vercel/analytics/react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const componentWithLayout = getLayout(<Component {...pageProps} />);

  return (
    <SWRConfig value={swrConfig}>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <UserProvider>
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <SocketProvider>
              <NavProvider>
                <RouteGuard>{componentWithLayout}</RouteGuard>
                <ToastContainer autoClose={2000} />
                <Analytics />
              </NavProvider>
            </SocketProvider>
          </StyledEngineProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
