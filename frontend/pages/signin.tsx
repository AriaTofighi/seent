import { ReactElement, useState } from "react";
import AuthDialog from "../components/auth/AuthDialog";
import { NextPageWithLayout } from "../types/types";

const SignIn: NextPageWithLayout = () => {
  return <AuthDialog open />;
};

SignIn.getLayout = (page: ReactElement) => <div>{page}</div>;

export default SignIn;
