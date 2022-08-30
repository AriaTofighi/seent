import { useState, useEffect, ReactNode, CSSProperties } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../contexts/UserContext";
import { Box, useTheme } from "@mui/system";
import GridLoader from "react-spinners/GridLoader";

export { RouteGuard };

type Props = {
  children: ReactNode;
};

const override: CSSProperties = {
  margin: 0,
};

function RouteGuard({ children }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const [authorized, setAuthorized] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    // router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [user, loading]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    if (loading) return;
    // TODO: Figure out way to use wildcards with public paths, maybe regex
    // const publicPaths = ["/feed", "/posts/*"];
    // const path = url.split("?")[0];
    // if (!user && !publicPaths.includes(path)) {
    //   setAuthorized(false);
    //   router.push({
    //     pathname: "/feed",
    //   });
    // } else {
    //   setAuthorized(true);
    // }
    setAuthorized(true);
  }

  return (
    <>
      {authorized
        ? children
        : // <Box
          //   sx={{
          //     width: "100vw",
          //     height: "100vh",
          //     display: "flex",
          //     alignItems: "center",
          //     justifyContent: "center",
          //   }}
          // >
          //   <GridLoader
          //     color={theme.palette.primary.main}
          //     loading={loading}
          //     size={50}
          //     cssOverride={override}
          //   />
          // </Box>
          null}
    </>
  );
}
