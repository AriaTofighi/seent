import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Styles } from "../../types/types";
import TextInput from "../controls/TextInput";
import { signUp } from "../../services/api/authAxios";
import { convertDateForPicker } from "../../utils/helpers";
import { useUser } from "../../contexts/UserContext";
import { MODES as AUTH_DIALOG_MODES } from "./AuthDialog";
import { toast } from "react-toastify";

const defaultValues = {
  name: "",
  email: "",
  birthday: convertDateForPicker(new Date()),
  password: "",
  confirmPassword: "",
};

type Props = {
  onClose: () => void;
};

const RegisterForm = ({ onClose }: Props) => {
  const { control, reset, handleSubmit } = useForm({ defaultValues });
  const { setUser } = useUser();

  const handleSignUp = async (formData: any) => {
    const { name, email, birthday, password, confirmPassword } = formData;
    const res = await signUp(name, email, password, birthday);
    if (!res) {
      toast.error("Not authorized");
    } else {
      setUser(res.accessToken);
      onClose();
      toast.success("Signed up successfully");
    }
  };

  return (
    <>
      <Typography variant="h4" mb={3}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextInput
            name="name"
            label="Name"
            control={control}
            placeholder="Name"
            rules={{ required: true }}
            type="text"
          />
          <TextInput
            name="email"
            label="Email"
            control={control}
            placeholder="Email"
            rules={{ required: true, isEmail: true }}
          />
          <TextInput
            name="birthday"
            label="Birth date (yyyy-mm-dd)"
            control={control}
            placeholder="Birth date"
            rules={{ required: true }}
            type="date"
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            control={control}
            type="password"
            rules={{ required: true }}
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            control={control}
            type="password"
            rules={{ required: true }}
          />
          <Button type="submit" variant="outlined">
            <Typography variant="body2" color="secondary.light">
              Sign up
            </Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
