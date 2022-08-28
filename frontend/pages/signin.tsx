import { ReactElement, useState } from "react";
import AuthDialog from "../components/auth/AuthDialog";
import { NextPageWithLayout } from "../types/types";

const SignIn: NextPageWithLayout = () => {
  const [open, setOpen] = useState(true);
  return <AuthDialog open onClose={() => setOpen(false)} />;
};

SignIn.getLayout = (page: ReactElement) => <div>{page}</div>;

export default SignIn;
