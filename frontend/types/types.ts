import { ReactElement } from "react";
import { ReactNode } from "react";
import { NextPage } from "next";
import { SxProps } from "@mui/material";

export interface Styles {
  [key: string]: SxProps;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
