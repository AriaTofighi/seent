import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";
import { signIn } from "../../services/api/authAxios";
import TextInput from "../controls/TextInput";

const defaultValues = {
  email: "",
  password: "",
};

type Props = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: Props) => {
  const { setUser } = useUser();
  const { control, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();

  const handleSignIn = async (formData: any) => {
    const { email, password } = formData;
    const res = await signIn(email, password);
    if (!res) return;
    setUser(res.accessToken);
    onClose();
    router.push("/feed");
    toast.success("Signed in successfully");
  };

  return (
    <>
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
          <Button type="submit" variant="contained">
            <Typography variant="body2">Sign in</Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
