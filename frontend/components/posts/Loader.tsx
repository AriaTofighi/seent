import { Button, LinearProgress } from "@mui/material";
import React from "react";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  onClick: () => void;
};

const Loader = ({ onClick, loading, disabled, text = "Load more" }: Props) => {
  return (
    <>
      <Button disabled={disabled} sx={{ my: 1 }} fullWidth onClick={onClick}>
        {!disabled && text}
      </Button>
      {loading && <LinearProgress sx={{ my: 1 }} />}
    </>
  );
};

export default Loader;
