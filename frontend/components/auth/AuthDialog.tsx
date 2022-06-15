import { Dialog, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Styles } from "../../types/types";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const styles: Styles = {
  root: {
    boxShadow: "",
    borderRadius: 4,
  },
};

export const MODES = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
};

const AuthDialog = ({ open, onClose }: any) => {
  const [mode, setMode] = useState(MODES.SIGN_IN);

  const localOnClose = () => {
    onClose();
    setMode(MODES.SIGN_IN);
  };

  return (
    <Dialog open={open} onClose={localOnClose} fullWidth maxWidth={"xs"}>
      <DialogContent>
        <Box sx={styles.root}>
          {mode === MODES.SIGN_IN ? (
            <LoginForm setMode={setMode} onClose={onClose} />
          ) : (
            <RegisterForm setMode={setMode} onClose={onClose} />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
