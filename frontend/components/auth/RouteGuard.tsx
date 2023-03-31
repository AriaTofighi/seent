import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../contexts/UserContext";
import LoadAppSpinner from "../UI/LoadAppSpinner";

type Props = {
  children: ReactNode;
};

function RouteGuard({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);

    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [user, loading]);

  function authCheck(url: string) {
    if (!loading) setAuthorized(true);
  }

  return <>{authorized ? children : <LoadAppSpinner />}</>;
}

export { RouteGuard };
