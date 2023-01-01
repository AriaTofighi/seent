import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";
import { Styles } from "../../types";

const fadeTransitionTime = "0.3";

const styles: Styles = {
  root: {
    height: "100%",
    transition: "background " + fadeTransitionTime + "s ease-in-out",
    p: 2,
    ":hover": {
      background: ((theme: Theme) => theme.palette.divider) as any,
      transition: "background " + fadeTransitionTime + "s ease-in-out",
    },
    borderRadius: 1.5,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 2,
    "& > *": {
      maxWidth: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
};

export default styles;
