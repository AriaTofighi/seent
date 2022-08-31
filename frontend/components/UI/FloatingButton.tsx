import { Stack, Fab } from "@mui/material";
import React from "react";
import { Styles } from "../../types/types";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  onClick: () => void;
};

const styles: Styles = {
  root: {
    position: "sticky",
    top: 0,
    mr: 2.5,
  },
};

const FloatingButton = ({ onClick }: Props) => {
  return (
    <Stack
      width="100%"
      height={50}
      justifyContent="flex-end"
      flexDirection="row"
      sx={{ position: "sticky", bottom: 16, mt: 1 }}
    >
      <Fab size="medium" color="secondary" sx={styles.root} onClick={onClick}>
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default FloatingButton;
