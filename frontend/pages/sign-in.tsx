import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import AuthDialog, { MODES } from "../components/auth/AuthDialog";
import LoadAppSpinner from "../components/UI/LoadAppSpinner";
import { useUser } from "../contexts/UserContext";
import { NextPageWithLayout } from "../types";

const SignIn: NextPageWithLayout = () => {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState(MODES.SIGN_IN);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/feed");
    }
  }, [user]);

  if (user) {
    return <LoadAppSpinner />;
  }

  return (
    <>
      <AuthDialog
        open={open}
        onClose={() => setOpen(false)}
        mode={mode}
        setMode={setMode}
      />
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => <div>{page}</div>;

export default SignIn;
