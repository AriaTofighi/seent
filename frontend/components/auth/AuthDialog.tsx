import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Styles } from "../../types/types";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const styles: Styles = {
  root: {
    boxShadow: "",
    borderRadius: 4,
    color: "secondary.light",
  },
  modeBtn: {
    width: "fit-content",
    textTransform: "initial",
    mt: 1,
  },
};

export const MODES = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const AuthDialog = ({ open, onClose }: Props) => {
  const [mode, setMode] = useState(MODES.SIGN_UP);

  const signInMode = mode === MODES.SIGN_IN;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
      <DialogContent>
        <Box sx={styles.root}>
          {signInMode ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}
          <Button
            sx={styles.modeBtn}
            variant="text"
            onClick={() => setMode(signInMode ? MODES.SIGN_UP : MODES.SIGN_IN)}
          >
            <Typography variant="body2">
              {signInMode
                ? "Don't have an account? Sign up"
                : "Have an account? Sign in"}
            </Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
