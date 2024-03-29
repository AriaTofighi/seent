import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { CSSProperties } from "react";
import { HashLoader } from "react-spinners";

const LoadAppSpinner = ({ loading = true }: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HashLoader
        color={theme.palette.primary.main}
        loading={loading}
        size={50}
        cssOverride={override}
      />
    </Box>
  );
};

type Props = {
  loading?: boolean;
};

const override: CSSProperties = {
  margin: 0,
};

export default LoadAppSpinner;
