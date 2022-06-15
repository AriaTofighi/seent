import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/UserContext";
import { signIn } from "../../services/api/authAxios";
import TextInput from "../controls/TextInput";
import { MODES as AUTH_DIALOG_MODES } from "./AuthDialog";

const defaultValues = {
  email: "",
  password: "",
};

type Props = {
  setMode: (mode: string) => void;
  onClose: () => void;
};

const LoginForm = ({ setMode, onClose }: Props) => {
  const { setUser, user } = useUser();
  const { control, reset, handleSubmit } = useForm({ defaultValues });

  const handleSignIn = async (formData: any) => {
    const { email, password } = formData;
    const res = await signIn(email, password);
    setUser(res.access_token);
    onClose();
  };

  return (
    <>
      <Typography variant="h4" mb={3}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextInput
            name="email"
            label="Email"
            control={control}
            placeholder="Email"
            rules={{ required: true, isEmail: true }}
            type="email"
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Email"
            control={control}
            type="password"
            rules={{ required: true }}
          />
          <Button type="submit" variant="outlined">
            Sign in
          </Button>
          <Button
            sx={{ width: "fit-content", textTransform: "initial" }}
            variant="text"
            onClick={() => setMode(AUTH_DIALOG_MODES.SIGN_UP)}
          >
            <Typography variant="body2">
              Don't have an account? Sign up
            </Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
