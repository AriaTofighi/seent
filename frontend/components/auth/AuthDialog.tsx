import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../../contexts/UserContext";
import { signInGoogle } from "../../services/api/authAxios";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const MODES = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
};

type Mode = typeof MODES[keyof typeof MODES];

type Props = {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const AuthDialog = ({ open, onClose, mode, setMode }: Props) => {
  const signInMode = mode === MODES.SIGN_IN;
  const { setUser } = useUser();

  const onGoogleLoginSuccess = async (response: any) => {
    const res = await signInGoogle(response.credential);
    if (!res) return;
    setUser(res.accessToken);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
      <DialogContent>
        <Box
          sx={{
            boxShadow: "",
            borderRadius: 4,
            color: "secondary.light",
          }}
        >
          <Typography variant="h4" mb={3} color="text.primary">
            {signInMode ? "Sign in" : "Sign up"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <GoogleLogin
              width="240px"
              useOneTap
              onSuccess={onGoogleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ flexGrow: 1, height: 2, bgcolor: "divider" }} />
            <Box sx={{ mx: 2 }} color="text.primary">
              or
            </Box>
            <Box sx={{ flexGrow: 1, height: 2, bgcolor: "divider" }} />
          </Box>
          {signInMode ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}
          <Button
            sx={{
              width: "fit-content",
              textTransform: "initial",
              mt: 1,
            }}
            variant="text"
            onClick={() => setMode(signInMode ? MODES.SIGN_UP : MODES.SIGN_IN)}
          >
            <Typography variant="body2" color="text.secondary">
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
