import { Stack, Fab } from "@mui/material";
import React from "react";
import { Styles } from "../../types";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  onClick: () => void;
};

const styles: Styles = {
  fab: {
    position: "sticky",
    top: 0,
    mr: 2.5,
  },
  root: {
    position: "sticky",
    bottom: 16,
    mt: 1,
  },
};

const FloatingButton = ({ onClick }: Props) => {
  return (
    <Stack
      width="100%"
      height={50}
      justifyContent="flex-end"
      flexDirection="row"
      sx={styles.root}
    >
      <Fab size="medium" color="secondary" sx={styles.root} onClick={onClick}>
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default FloatingButton;
